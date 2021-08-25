// import React from 'react';
// import { connect } from 'react-redux'
// import { nstate } from '../redux/Nstate/action';

// const Nstate = (count, nstate) => {
//     return (
//         <div className="items">
//             <p>구독자 수: {count}</p>
//             <button onClick={() => nstate()}>구독하기!</button>
//         </div>
//     );
// };

// const mapStateToProps = (state) => {
//     return {
//         count: state.count
//     }
// }
// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         addNstate: () => dispatch(addNstate())
// //     }
// // }
// const mapDispatchToProps = {
//     addNstate
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Nstate);