import { ADD_NSTATE, REMOVE_NSTATE } from "./types"

export const addNstate = () => {
    return {
        type: ADD_NSTATE
    }
}
export const removeNstate = () => {
    return {
        type: REMOVE_NSTATE
    }
}