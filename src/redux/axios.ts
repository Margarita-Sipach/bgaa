import axios from "axios";
import { Dispatch } from "redux";
import { ActionI, ActionTypes } from "./types";

const URL = 'https://bgaa.by/test'

export const getInfo = () => async(dispatch: Dispatch<ActionI>) => {
    try{
        dispatch({type: ActionTypes.GET_INFO, payload: ''})
        const {data} = await axios.get(URL)
        dispatch({type: ActionTypes.GET_INFO_SUCCESS, payload: data})
        console.log(data)

    }catch(e){
        dispatch({type: ActionTypes.GET_INFO_ERROR, payload: 'Ошибка'})
    }
}

export const addInfo = () => async(dispatch: Dispatch<ActionI>) => {
    try{
        dispatch({type: ActionTypes.ADD_INFO, payload: ''})
        // const rows = document.querySelectorAll('.ant-table-row');
        // rows.forEach((i) => {
        //     console.log((i as any)?.dataset?.rowKey)
        // })
        // const {data} = await axios.post(URL, '')
        dispatch({type: ActionTypes.ADD_INFO_SUCCESS, payload: null as any})
    }catch(e){
        dispatch({type: ActionTypes.ADD_INFO_ERROR, payload: 'Ошибка'})
    }
}