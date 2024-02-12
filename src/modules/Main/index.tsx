import { Table } from "antd";
import { getInfo } from "../../lib/axios";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { getCell, getColumn } from "./lib/fn";
import { TeacherSelect } from "./lib/ui";
import { CellI } from "./lib/type";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";

const {data, teachers} = getInfo()
const {lecturesHours, laboratoryHours, practicHours, seminarHours, offset, exam} = data[0]

const dataSource = [
  getCell('lecturesHours', 'Лекции', lecturesHours, teachers),
  getCell('laboratoryHours', 'Лабораторные работы', laboratoryHours, teachers),
  getCell('practicHours', 'Практические', practicHours, teachers),
  getCell('seminarHours', 'Суминарские', seminarHours, teachers),
];

  offset && dataSource.push(getCell('offset', 'Зачет', offset, teachers))
  exam && dataSource.push(getCell('exam', 'Экзамен', exam, teachers))
  dataSource.push(getCell('info', 'Примечание (для составления расписания)', '', teachers))

  const initColumns = [
    getColumn('lesson', 'Занятие'),
    getColumn('hours', 'Часы')
  ];
  
export const Main = () => {

      const getTeacherCell = (_: any, {teachers, hours}: CellI, i: number) => {
        if(i === dataSource.length - 1) return <TextArea/>
        return <TeacherSelect teachers={teachers} hours={hours} rowNumber={i} />
      }

      const groupColumns = [
        getColumn('group1', 'Подгруппа 1', () => {}, getTeacherCell), 
        getColumn('group2', <>Подгруппа 2 <DeleteFilled /></>, () => setColumns([...initColumns, teacherColumn]), getTeacherCell)
      ]

      const teacherColumn = getColumn('teachers', <>Преподаватель <PlusOutlined /></>, () => setColumns([...initColumns, ...groupColumns]), getTeacherCell)

  const [columns, setColumns] = useState([...initColumns, teacherColumn])


    return <Table dataSource={dataSource} columns={columns} scroll={{ x: 'fit-content' }}/>;

}