import * as actions from '../action/actionType'

const initialState = {
    todos: [
        {id:1,title:"Love Bangladesh"},
        {id:2,title:"bangladesh"}
    ],

};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_TODO:
            return {
                ...state,
                todo: [...state.todos]
            };
        case actions.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case actions.UPDATE_TODO:
            const updatedTodos = state.todos.map((todo) => {
                if (todo.id === action.payload.id) {
                    // Update the properties of the TODO item
                    return {
                        ...todo,
                        title: action.payload.title,
                        // Add other properties to update as needed
                    };
                }
                return todo;
            });
            return {
                ...state,
                todos: updatedTodos,
            };
        case actions.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id),
            };
        // Define similar cases for updating and fetching todos
        default:
            return state;
    }
};

export default todoReducer;