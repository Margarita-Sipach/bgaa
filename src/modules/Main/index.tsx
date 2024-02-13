import { Input, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getCell, getColumn } from "./lib/fn";
import { TeacherSelect } from "./lib/ui";
import { CellI } from "./lib/type";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

export enum ColumnTypes{
  TEACHER = 'TEACHER',
  GROUP = 'GROUP'
}


  
export const Main = ({data, teachers}: any) => {
 const [columnType, setColumnType] = useState(ColumnTypes.TEACHER)

const dataSource = [
  getCell('lectureTeacher', 'Лекции', data?.lecturesHours, teachers),
  getCell('laboratoryTeacher', 'Лабораторные работы', data?.laboratoryHours, teachers),
  getCell('practiceTeacher', 'Практические', data?.practicHours, teachers),
  getCell('seminarTeacher', 'Суминарские', data?.seminarHours, teachers),
];

  data?.offset && dataSource.push(getCell('offsetTeacher', 'Зачет', data?.offset, teachers))
  data?.exam && dataSource.push(getCell('examTeacher', 'Экзамен', data?.exam, teachers))
  dataSource.push(getCell('countStudents', 'Количество человек', '', data?.studentsNumber / (columnType === ColumnTypes.TEACHER ? 1 : 2)))
  dataSource.push(getCell('additionalInfo', 'Примечание (для составления расписания)', '', ''))

  const initColumns = [
    getColumn('lesson', 'Занятие'),
    getColumn('hours', 'Часы')
  ];

      const getTeacherCell = (_: any, {teachers, hours}: CellI, i: number) => {
        if(!teachers) return <TextArea/>
        if(typeof teachers === 'number') return <Input defaultValue={teachers}/>
        return <TeacherSelect teachers={teachers} hours={hours} rowNumber={i} />
      }

      const changeColumnType = () => setColumnType(columnType === ColumnTypes.TEACHER ? ColumnTypes.GROUP : ColumnTypes.TEACHER)

      const groupColumns = [
        getColumn('group1', 'Подгруппа 1', () => {}, getTeacherCell), 
        getColumn('group2', <>Подгруппа 2 <DeleteFilled /></>, changeColumnType, getTeacherCell)
      ]

      const teacherColumn = getColumn('teachers', <>Преподаватель <PlusOutlined /></>, changeColumnType, getTeacherCell)
  
      useEffect(() => {
        setColumns([...initColumns, ...(columnType === ColumnTypes.TEACHER ? [teacherColumn] : groupColumns)])

      }, [columnType])

      const [columns, setColumns] = useState<any>([...initColumns, teacherColumn])

    return <Table dataSource={dataSource} columns={columns} scroll={{ x: 'fit-content' }} pagination={false} />;
}