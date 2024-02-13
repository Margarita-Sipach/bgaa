import { Input, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getCell, getColumn } from "./lib/fn";
import { Group1, Group2, Teacher, TeacherSelect } from "./lib/ui";
import { CellI } from "./lib/type";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

export enum ColumnTypes{
  TEACHER = 'TEACHER',
  GROUP = 'GROUP'
}
  
export const Main = ({data, teachers}: any) => {
 const [columnType, setColumnType] = useState(ColumnTypes.TEACHER)

 const {lecturesHours, laboratoryHours, practicHours, seminarHours, offset, exam, studentsNumber} = data

const dataSource = [
  getCell('lectureTeacher', 'Лекции', lecturesHours, teachers),
  getCell('laboratoryTeacher', 'Лабораторные работы', laboratoryHours, teachers),
  getCell('practiceTeacher', 'Практические', practicHours, teachers),
  getCell('seminarTeacher', 'Суминарские', seminarHours, teachers),
];

console.log(data)

  data?.offset && dataSource.push(getCell('offsetTeacher', 'Зачет', offset, teachers))
  data?.exam && dataSource.push(getCell('examTeacher', 'Экзамен', exam, teachers))
  dataSource.push(getCell('countStudents', 'Количество человек', '', studentsNumber / (columnType === ColumnTypes.TEACHER ? 1 : 2)))
  dataSource.push(getCell('additionalInfo', 'Примечание (для составления расписания)', '', ''))

  const initColumns = [
    getColumn('lesson', <>Занятие</>),
    getColumn('hours', <>Часы</>)
  ];

      const getTeacherCell = (colSpan = 1) => (_: any, {teachers, hours}: any, i: number) => {
        if(!teachers) return {
          children: <TextArea/>,
          props: { colSpan }
        }
        if(typeof teachers === 'number') return <Input defaultValue={teachers}/>
        if(teachers) return <TeacherSelect teachers={teachers as any} hours={hours} rowNumber={i} />
      }

      const changeColumnType = () => setColumnType(columnType === ColumnTypes.TEACHER ? ColumnTypes.GROUP : ColumnTypes.TEACHER)

      const groupColumns = [
        getColumn('group1', <Group1/>, () => {}, getTeacherCell(2)), 
        getColumn('group2', <Group2/>, changeColumnType, getTeacherCell(0))
      ]

      const teacherColumn = getColumn('teachers', <Teacher/>, changeColumnType, getTeacherCell())
  
      useEffect(() => {
        setColumns([...initColumns, ...(columnType === ColumnTypes.TEACHER ? [teacherColumn] : groupColumns)])

      }, [columnType])

      const [columns, setColumns] = useState<any>([...initColumns, teacherColumn])

    return <Table dataSource={dataSource} columns={columns} scroll={{ x: 'fit-content' }} pagination={false} />;
}