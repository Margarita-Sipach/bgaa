import { ReactElement } from "react"
import { TeacherI } from "../../../redux/types"
import { CellI } from "./type"

export const getCell = (
    key: string, 
    lesson: string, 
    hours: string, 
    teachers: TeacherI[] | number | string,
    groups?: [any, any]
) => {
    return {
        key,
        lesson,
        hours,
        teachers,
        group1: groups?.[0],
        group2: groups?.[1]
    }
}

export const getColumn = (
    key: string, 
    title: ReactElement, 
    onClick?: () => void, 
    render?: (_: any, {teachers, hours}: CellI, i: number, key?: string) => void
) => {
    return {
        key,
        title,
        onHeaderCell: () => ({ onClick }),
        render,
        dataIndex: key,
    }
}