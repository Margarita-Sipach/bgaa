import { CellI, TeacherI } from "./type"

export const getCell = (
    key: string, 
    lesson: string, 
    hours: string, 
    teachers: TeacherI[] | number
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
    title: string | Element, 
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