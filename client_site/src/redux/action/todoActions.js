import * as actions from './actionType'

export const getTodo = () => ({
    type: actions.GET_TODO,
});
export const addTodo = (todo) => ({
    type: actions.ADD_TO_CART,
    payload:  todo ,
});
export const updateTodo = (updatedTodo) => ({
    type: actions.UPDATE_TODO,
    payload: updatedTodo,
});
export const removeTodo = (id) => ({
    type: actions.REMOVE_TODO,
    payload: { id },
});