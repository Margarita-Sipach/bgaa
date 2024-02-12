import { Button, Select } from "antd";
import cls from '../style.module.scss'
import { DownSquareOutlined } from "@ant-design/icons";
import { TeacherI } from "./type";

interface TeacherSelectProps{
    teachers: TeacherI[], 
    hours: number, 
    rowNumber: number
}

export const TeacherSelect = ({teachers, hours, rowNumber}: TeacherSelectProps) => (
    <div className={cls.teacher}>
        <Select className={cls.select} 
                defaultValue={'Вакансия'} 
                options={teachers.map(({name}: TeacherI) => ({value: name, label: name}))} 
                disabled={hours == 0}
        />
        {!rowNumber && <FillButton/>}
    </div>
)

export const FillButton = () => <Button icon={<DownSquareOutlined />} type="primary"/>