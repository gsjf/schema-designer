import { combineReducers } from 'redux';
import databaseReducer from './databaseReducer';
import uiReducer from './uiReducer';
import tableReducer from './tableReducer';
import columnReducer from './columnReducer';
import relationReducer from './relationReducer';
import originReducer from './originReducer';
import primaryReducer from './primaryReducer'

export default combineReducers({
    database: databaseReducer,
    ui: uiReducer,
    tables: tableReducer,
    columns: columnReducer,
    relations: relationReducer,
    origins: originReducer,
    primary: primaryReducer
});
