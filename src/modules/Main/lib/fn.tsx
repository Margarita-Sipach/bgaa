import { ReactElement } from "react"
import { TeacherI } from "../../../redux/types"
import { CellI } from "./type"

export const getCell = (
    key: string, 
    lesson: string, 
    hours: string, 
    teachers: TeacherI[] | number | string
) => {
    return {
        key,
        lesson,
        hours,
        teachers
    }
}

export const getColumn = (
    key: string, 
    title: ReactElement, 
    onClick?: () => void, 
    render?: (_: any, {teachers, hours}: CellI, i: number) => void
) => {
    return {
        key,
        title,
        onHeaderCell: () => ({ onClick }),
        render,
        dataIndex: key,
    }
}