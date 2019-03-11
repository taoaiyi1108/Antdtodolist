import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INTI_LIST_ACTION, GET_INIT_LIST } from './actionTypes';

export const getInputChangeAction = (value) => ({
    type: CHANGE_INPUT_VALUE,
    value
})

export const getAddItemAction = () => ({
    type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
    type: DELETE_TODO_ITEM,
    index
})

export const initListAction = (data) => ({
    type: INTI_LIST_ACTION,
    data
})

/* Redux-thunk */
/* export const getTodoList = () => {
    return (dispatch) => {
        axios.get('/todolist.json').then(res => {
            const data = res.data;
            const action = initListAction(data);
            dispatch(action);
        }).catch((res) => {
            console.log(res)
        });
    }
} */

export const getInitList = () => ({
    type: GET_INIT_LIST
})