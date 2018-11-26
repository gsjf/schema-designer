import update from 'immutability-helper';
import * as types from '../actions/constants';

const initialState = [];

const updateTable = (parameters) => {
    const { state = initialState, data } = parameters;
    const c = Object.assign({}, data);
    delete c.columns;
    // console.log('table value');
    // console.log(c);
    return update(state, {
        $push: [c]
    });
};
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TABLE:
            return updateTable({ state, data: action.data });
        case types.REMOVE_TABLE:
            return state.filter((table) => table.id !== action.id);
        case types.UPDATE_TABLE:
            return state.map((table) => {
                if (table.id === action.data.id) {
                    return action.data;
                }

                return table;
            });
        default:
            return state;
    }
};
