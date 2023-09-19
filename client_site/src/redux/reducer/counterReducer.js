import * as actions from '../action/actionType'

const initialCounterState = { count: 0 };
const counterReducer = (state = initialCounterState, action) =>{
    switch (action.type) {
        case actions.INCREMENT:
            return {
                ...state,
                count:state.count + 1
            }
        case  actions.DECREMENT:
            return {
                ...state,
                count:state.count - 1
            }
        case actions.RESET:
            return {
                ...state,
                count: 0
            }
        case actions.INCREMENTBYVALUE:
            return {
                ...state,
                count: state.count + action.payload
            }
        default:
            return state;
    }
}
export default counterReducer;