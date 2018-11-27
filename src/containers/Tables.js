/**
 * @flow
 */
import { connect } from 'react-redux';
import Tables from '../components/Tables';
import {
    removeTable,
    enableTableEdit,
    toggleTableModal,
    toggleColumnModal,
    storeTablePosition
} from '../actions/ActionCreators';

const mapStateToProps = (state) => ({
    tables: state.tables,
    origins: state.origins
});

const mapDispatchToProps = (dispatch) => ({
    removeTable: (id) => {
        dispatch(removeTable(id));
    },
    editTable: (data) => {
        dispatch(enableTableEdit(data));
        dispatch(toggleTableModal());
    },
    toggleColumnModal: (tableId, origin) => {
        dispatch(toggleColumnModal(tableId, origin));
    },
    storeTablePosition: (newPos) => {
        dispatch(storeTablePosition(newPos));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
