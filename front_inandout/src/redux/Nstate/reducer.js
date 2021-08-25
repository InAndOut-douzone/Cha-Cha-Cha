import { NSTATE } from "./types"

const initialState = {
    openKeys:['1']
}
const nstateReducer = (state=initialState, action) => {
    switch(action.type){
        case NSTATE:
            return {
                ...state,
                openKeys: state.count + 1
            }
        default: return state
    }
}

export default nstateReducer