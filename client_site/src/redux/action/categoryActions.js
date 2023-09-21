import * as actions from './actionType'
import axios from 'axios';
export const getCategory = () =>{
    return (dispatch) => {
        axios
            .get('http://localhost/api/category')
            .then((response) => {
                const categories = response.data;
                dispatch({type: actions.GET_CATEGORY, payload: categories});
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    };
};
export const addCategory = (category) => ({
    type: actions.ADD_CATEGORY,
    payload:  category ,
});
export const updateCategory = (updatedCategory) => ({
    type: actions.UPDATE_CATEGORY,
    payload: updatedCategory,
});
export const removeCategory = (id) => ({
    type: actions.REMOVE_CATEGORY,
    payload: { id },
});