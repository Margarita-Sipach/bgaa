import { Button, Select } from "antd";
import cls from '../style.module.scss'
import { DownSquareOutlined } from "@ant-design/icons";
import { TeacherI } from "../../../redux/types";

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

const handleClick = (e: any) => {
    const card = e.target.closest(".ant-table")
    const {cellIndex: startCellIndex} = e.target.closest(".ant-table-cell")
    const [startCell, ...cells] = [...card.querySelectorAll('.ant-table-tbody .ant-table-cell')].filter(({cellIndex}: any) => cellIndex === startCellIndex)
                               
    cells.forEach((cell: any) => {
        const input = cell.querySelector('input')
        const item = cell.querySelector('.ant-select-selection-item')
        if(input && !input.disabled) item.textContent = startCell.querySelector('.ant-select-selection-item')?.textContent
    })
}

export const FillButton = () => <Button icon={<DownSquareOutlined />} 
                                        type="primary" 
                                        onClick={handleClick}
/>