import * as actions from '../action/actionType'

const initialState = {
    category: [],

};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        case actions.ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload],
            };
        case actions.UPDATE_CATEGORY:
            const updatedCategory = state.category.map((categorys) => {
                if (categorys.id === action.payload.id) {
                    return {
                        ...categorys,
                        title: action.payload.title,

                    };
                }
                return categorys;
            });
            return {
                ...state,
                category: updatedCategory,
            };
        case actions.REMOVE_CATEGORY:
            return {
                ...state,
                category: state.category.filter((categorys) => categorys.id !== action.payload.id),
            };
        // Define similar cases for updating and fetching categorys
        default:
            return state;
    }
};

export default categoryReducer;