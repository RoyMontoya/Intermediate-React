export default function breedReducer(state = 'streeter', action){
    if(action.type === 'SET_BREED'){
        return action.payload
    } else if(action.type === 'SET_ANIMAL'){
        return ""
    } else {
        return  state
    }
}
