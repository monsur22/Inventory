// import { configureStore,createStore } from "@reduxjs/toolkit";
// import counterReducer from "../reducer/counterReducer";
//
// const store = createStore(counterReducer);
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducer/counterReducer";
import todoReducer from "../reducer/todoReducer";
import productReducer from "../reducer/productReducer";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
        product: productReducer,

    },
});

export default store;