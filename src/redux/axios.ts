import axios from "axios";
import { Dispatch } from "redux";
import { ActionI, ActionTypes, TeacherI } from "./types";

const URL = 'https://bgaa.by/test'
const URL_POST = 'https://bgaa.by/test_result'


export const getInfo = () => async(dispatch: Dispatch<ActionI>) => {
    try{
        dispatch({type: ActionTypes.GET_INFO, payload: undefined})
        const {data} = await axios.get(URL)
        dispatch({type: ActionTypes.GET_INFO_SUCCESS, payload: data})

    }catch(e){
        dispatch({type: ActionTypes.GET_INFO_ERROR, payload: 'Ошибка'})
    }
}

export const addInfo = (_: any, info: any) => async(dispatch: Dispatch<ActionI>) => {
    try{
        dispatch({type: ActionTypes.ADD_INFO, payload: undefined})
        const {data, teachers} = info

        const getTeacherIdByName = (teacher: string) => teachers.find(({name}: TeacherI) => teacher === name)?.id || ''

        const cards = document.querySelectorAll(".ant-table-tbody")

        cards.forEach((card: any, cardI: number) => {
            data[cardI].podgroups = []
            card.querySelectorAll('.ant-table-row').forEach((row: any) => {
                const cells = [...row.querySelectorAll('.ant-table-cell')].slice(2);
                data[cardI].countPodgroups = cells.length
                const {rowKey} = row.dataset
                
                cells.forEach((cell: any, i: any) => {
                    if(rowKey === 'additionalInfo') data[cardI][rowKey] = cell.querySelector('textarea')?.value
                    else data[cardI].podgroups[i] = {
                        ...data[cardI].podgroups[i], 
                        [rowKey]: cell.querySelector('.ant-input')?.value || getTeacherIdByName(cell.querySelector('.ant-select-selection-item').textContent)
                    }
                })
            })
        })

        console.log(data)
        axios.post(URL_POST, {data, teachers})
        
        dispatch({type: ActionTypes.ADD_INFO_SUCCESS, payload: {data, teachers} as any})
    }catch(e){
        dispatch({type: ActionTypes.ADD_INFO_ERROR, payload: 'Ошибка'})
    }
}