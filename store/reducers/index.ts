import { combineReducers } from "redux";
import portfolioSlideReducer from "./portfolio";

const reducers = combineReducers({
    portfolioStore: portfolioSlideReducer
})

export default reducers;