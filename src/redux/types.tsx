export enum ActionTypes{
    GET_INFO = 'GET_INFO',
    GET_INFO_SUCCESS = 'GET_INFO_SUCCESS',
    GET_INFO_ERROR = 'GET_INFO_ERROR',
    ADD_INFO = 'ADD_INFO',
    ADD_INFO_SUCCESS = 'ADD_INFO_SUCCESS',
    ADD_INFO_ERROR = 'ADD_INFO_ERROR',
}

interface DataI{
    subjectName: string,
    course: number,
    semestr: number,
    studentsNumber: number,
    groupName: string,
    lecturesHours: number,
    laboratoryHours: number,
    practicHours: number,
    seminarHours: number,
    exam: boolean,
    offset: boolean,
    additionalInfo: string,
    countPodgroups: number,
    uniqueId: string,
}

export interface TeacherI{
    id: string,
    name: string
}

interface InfoI{
    data: DataI[],
    teachers: TeacherI[]
}

export interface StateI{
    info: any,
    error: string,
    isLoading: boolean
}

interface ActionLoaingI{
    payload: '',
    type: ActionTypes.ADD_INFO | ActionTypes.GET_INFO
}

interface ActionErrorI{
    payload: string,
    type: ActionTypes.ADD_INFO_ERROR | ActionTypes.GET_INFO_ERROR
}

interface ActionSucecessI{
    payload: StateI,
    type: ActionTypes.ADD_INFO_SUCCESS | ActionTypes.GET_INFO_SUCCESS
}

export type ActionI = ActionLoaingI | ActionErrorI | ActionSucecessI