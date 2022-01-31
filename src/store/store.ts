import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));
