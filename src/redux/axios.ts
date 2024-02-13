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