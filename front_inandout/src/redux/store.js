import { createStore } from 'redux'
import reducer from './Nstate/reducer'
const store = createStore(reducer);

export default store;