import { NSTATE } from "./types"

const initialState = {
    openKeys:['1']
}
const nstateReducer = (state=initialState, action) => {
    switch(action.type){
        case NSTATE:
            return {
                ...state,
                openKeys:['1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6']
            }
        default: return state
    }
}

export default nstateReducer