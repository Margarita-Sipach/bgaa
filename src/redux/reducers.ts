import { ActionI, ActionTypes, StateI } from "./types";

const initState: StateI = {
    info: '',
    error: '',
    isLoading: false
}

export const infoReducer = (state = initState, action: ActionI): StateI => {
    switch (action.type){
        case ActionTypes.ADD_INFO: 
            return {info: [], error: '', isLoading: true};        
        case ActionTypes.ADD_INFO_ERROR: 
            return {info: [], error: action.payload, isLoading: false};
        case ActionTypes.ADD_INFO_SUCCESS: 
            return {info: action.payload, error: '', isLoading: false};
        case ActionTypes.GET_INFO: 
            return {info: [], error: '', isLoading: true};
        case ActionTypes.GET_INFO_ERROR: 
            return {info: [], error: action.payload, isLoading: false};
        case ActionTypes.GET_INFO_SUCCESS: 
            return {info: action.payload, error: '', isLoading: false};
        default: return state
    }
}
