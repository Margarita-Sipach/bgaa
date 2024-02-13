import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
import * as actionCreators from './axios'
import { RootState } from "../main"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector