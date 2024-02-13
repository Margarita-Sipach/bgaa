import { Table } from "antd";
import { getInfo } from "../../lib/axios";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { getCell, getColumn } from "./lib/fn";
import { TeacherSelect } from "./lib/ui";
import { CellI } from "./lib/type";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useTypedSelector } from "../../redux/hooks";

export enum ColumnTypes{
  TEACHER = 'TEACHER',
  GROUP = 'GROUP'
}


  
export const Main = () => {
 const {info, isLoading, error} = useTypedSelector(state => state.info)
 const [columnType, setColumnType] = useState(ColumnTypes.TEACHER)

 const {data, teachers} = info

const dataSource = [
  getCell('lecturesHours', 'Лекции', data?.[0].lecturesHours, teachers),
  getCell('laboratoryHours', 'Лабораторные работы', data?.[0].laboratoryHours, teachers),
  getCell('practicHours', 'Практические', data?.[0].practicHours, teachers),
  getCell('seminarHours', 'Суминарские', data?.[0].seminarHours, teachers),
];

  data?.[0].offset && dataSource.push(getCell('offset', 'Зачет', data?.[0].offset, teachers))
  data?.[0].exam && dataSource.push(getCell('exam', 'Экзамен', data?.[0].exam, teachers))
  dataSource.push(getCell('amount', 'Количество человек', '', data?.[0].studentsNumber / (columnType === ColumnTypes.TEACHER ? 1 : 2)))
  dataSource.push(getCell('info', 'Примечание (для составления расписания)', '', 0))

  const initColumns = [
    getColumn('lesson', 'Занятие'),
    getColumn('hours', 'Часы')
  ];

      const getTeacherCell = (_: any, {teachers, hours}: CellI, i: number) => {
        if(!teachers) return <TextArea/>
        if(typeof teachers === 'number') return teachers
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
      if(isLoading || !data) return <>Loading</>

    return <Table dataSource={dataSource} columns={columns} scroll={{ x: 'fit-content' }} pagination={false}  onChange={(x) => console.log(x)}/>;
}