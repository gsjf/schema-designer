/**
 * @flow
 */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import type { TableType, OriginTable } from '../../utils/flowtypes';
import shallowEqual from '../../utils/shallowEqual';

type Props = {
    showTableModal: boolean,
    editMode: boolean,
    editData: TableType,
    tables: Array<TableType>,
    origins: Array<OriginTable>,
    toggleTableModal: () => void,
    saveTable: (data: TableType) => void,
    updateTable: (data: TableType) => void
};

type State = {
    duplicateName: boolean
};

class TableModal extends Component<Props, State> {
    state = {
        duplicateName: false,
        notSetFather: false,
        alias: false
    }

    // Flow type for refs
    origin: any
    name: any
    color: any
    initAll: any
    timestamp: any

    focusInput = () => {
        if (this.name) {
            this.name.focus();
        }
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();

        const { saveTable, updateTable, editMode, editData, tables, origins } = this.props;
        if (!this.origin) {
            this.setState({ notSetFather: true });
            return;
        }
        let name = this.origin;
        console.log(`this.name${ this.name }`);
        if (this.name !== undefined && this.name.value) {
            name = this.name.value.trim();
        }
        const data = {
            id: editMode ? editData.id : Math.random().toString(36).substring(7),
            name,
            color: name === this.origin ? 'table-header-red' : 'table-header-green',
            softDelete: this.initAll.checked,
            initAll: this.initAll.checked,
            origin: this.origin,
            columns: []
        };

        if (!data.name) {
            return;
        }

        const duplicate = findIndex(tables, (table) => table.name === data.name);
        console.log(tables);
        if (duplicate !== -1 && data.name !== editData.name) {
            // Duplicate table name
            this.setState({ duplicateName: true });
            return;
        }

        if (editMode) {
            // Only update if data is changed
            if (!shallowEqual(data, editData)) {
                updateTable(data);
            }

            this.toggleTableModal();
        } else {
            if (data.initAll) {
                origins.filter((ele) => ele.name === this.origin).forEach((ele) =>
                    (ele.columns.forEach((e) => data.columns.push({ ...e,
                        id: Math.random().toString(36).substring(7),
                        originTable: data.origin,
                        originColumn: e.name,
                        alias: false,
                        name: e.name }))));
            }
            saveTable(data);
        }

        // Reset state
        this.setState({ duplicateName: false, notSetFather: false });
        console.log(data);
    }

    toggleTableModal = () => {
        // Reset state
        this.setState({ duplicateName: false });

        this.props.toggleTableModal();
    }

    updateName = () => {
        this.setState({ alias: !this.state.alias });
    }

    setCurrentOrigin = (event: { target: { value: string } }) => {
        this.origin = event.target.value;
    }

    render() {
        console.log('TableModal rendering'); // eslint-disable-line no-console
        const { showTableModal, editData, editMode, origins } = this.props;
        const { duplicateName, notSetFather } = this.state;

        return (
            <Modal
                show={ showTableModal }
                onEntered={ this.focusInput }
                onHide={ this.toggleTableModal }
                dialogClassName='modal-sm'
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ this.toggleTableModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>
                        {editMode ? 'Update Table' : 'Create Table'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>

                        <div className={ classnames('form-group', { 'has-error': notSetFather }) }>
                            <label className='col-xs-2 control-label' htmlFor='name'> Origin: </label>
                            <div className='col-xs-10'>

                                <select
                                    className='form-control'
                                    onChange={ this.setCurrentOrigin }
                                    defaultValue={ this.origin }
                                >

                                    <option key='None' value='' >
                                        None
                                    </option>

                                    { origins.map((table) => (
                                        <option key={ table.name } value={ table.name }>
                                            { table.name }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {notSetFather &&
                            <span className='col-xs-offset-2 col-xs-10 help-block'>
                           Please choose one Origin Table
                            </span>
                            }
                        </div>


                        <div className={ classnames('form-group', { 'has-error': duplicateName }) }>
                            <label className='col-xs-2 control-label' htmlFor='name'><input
                                type='checkbox'
                                id='name'
                                onChange={ this.updateName }
                                checked={ this.state.alias }
                            /> Rename:
                            </label>
                            { this.state.alias &&
                            <div className='col-xs-10'>
                                <input
                                    type='text'
                                    id='name'
                                    ref={ (name) => { this.name = name; } }
                                    className='form-control'
                                    defaultValue={ editData.name }
                                />
                            </div>

                            }

                            {duplicateName &&
                            <span className='col-xs-offset-2 col-xs-10 help-block'>
                                Duplicate table name
                            </span>
                            }
                        </div>


                        <div className='checkbox'>
                            <label htmlFor='softdelete'>
                                <input
                                    type='checkbox'
                                    id='softdelete'
                                    ref={ (initAll) => {
                                        this.initAll = initAll;
                                    } }
                                    defaultChecked={ editData.initAll }
                                /> Init From Origin Table
                            </label>
                        </div>
                        <div className='checkbox'>
                            <label htmlFor='timestamp'>
                                <input
                                    type='checkbox'
                                    id='timestamp'
                                    ref={ (timestamp) => {
                                        this.timestamp = timestamp;
                                    } }
                                    defaultChecked={ editData.timeStamp }
                                /> Timestamp
                            </label>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.handleSubmit }
                    >{editMode ? 'Update' : 'Save'}
                    </button>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.toggleTableModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default TableModal;
