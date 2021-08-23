import { ADD_NSTATE, REMOVE_NSTATE } from "./types"

const initialState = {
    count: 370
}
const nstateReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_NSTATE:
            return {
                ...state,
                count: state.count + 1
            }
        case REMOVE_NSTATE:
            return {
                ...state,
                count: state.count - 1
            }
        default: return state
    }
}

export default nstateReducer