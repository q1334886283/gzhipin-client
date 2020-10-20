/*
    redux最核心的store对象模块
 */
import chunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import reducers from "./reducers";

export default createStore(reducers, composeWithDevTools(applyMiddleware((chunk))));