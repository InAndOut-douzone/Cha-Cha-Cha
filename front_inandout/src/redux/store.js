import { createStore } from 'redux'
import nstateReducer from './Nstate/reducer'
const store = createStore(nstateReducer);

export default store;