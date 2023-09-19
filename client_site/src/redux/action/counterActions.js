import * as actions from './actionType'

export const  incrementCounter = () =>{
    return {
        type: actions.INCREMENT,
    }
}

export const  decrementCounter = () => {
    return {
        type: actions.DECREMENT,
    }
}

export const  resetCounter = () => {
    return {
        type: actions.RESET,
    }
}
export const incrementCounterByValue = (value) =>{
    return {
        type: actions.INCREMENTBYVALUE,
        payload: value
    }
}