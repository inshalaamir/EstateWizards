import authreducer from "./userauth.js";
import {combineReducers} from "redux";

const allreducers=combineReducers({
    authreducer:authreducer
})

export default allreducers;

