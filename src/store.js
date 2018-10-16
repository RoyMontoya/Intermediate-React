import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    typeof window === "object" &&
    typeof window.devToolsExtention !== "undefined" ? window.devToolsExtention() : f => f
))

export default store; 
