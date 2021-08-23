import React from 'react';
import { connect } from 'react-redux'
import { addNstate } from '../redux/Nstate/action';

const Nstate = (count, addNstate) => {
    return (
        <div className="items">
            <p>구독자 수: {count}</p>
            <button onClick={() => addNstate()}>구독하기!</button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addNstate: () => dispatch(addNstate())
//     }
// }
const mapDispatchToProps = {
    addNstate
}

export default connect(mapStateToProps, mapDispatchToProps)(Nstate);