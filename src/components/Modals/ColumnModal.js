/**
 * @flow
 */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import classnames from 'classnames';
import findIndex from 'lodash/findIndex';
import ForeignKeyForm from './ForeignKeyForm';
import OriginKeyForm from './OriginKeyForm';
import type { ColumnType, TableType, OriginTable } from '../../utils/flowtypes';
import { isFractionType } from '../../utils/helpers';

type Props = {
    showColumnModal: boolean,
    editMode: boolean,
    editData: ColumnType,
    tableId: string,
    tables: Array<TableType>,
    columns: {
        [tableId: string]: Array<ColumnType>
    },
    origins: Array<OriginTable>,
    primary: string,
    toggleColumnModal: () => void,
    saveColumn: (data: ColumnType, tableId: string, hideModal?: boolean) => void,
    updateColumn: (data: ColumnType, tableId: string) => void
};

type State = {
    columnType: string,
    duplicateName: boolean,
    foreignKeyEnabled: boolean,
    isUnsigned: boolean
};

class ColumnModal extends Component<Props, State> {
    // Flow type for refs
    name: any
    type: any
    length: any
    defValue: any
    comment: any
    autoInc: any
    nullable: any
    unique: any
    index: any
    unsigned: any
    foreignKey: any
    form: any

    constructor(props: Props) {
        super(props);
        const { editData } = props;
        this.state = {
            columnType: '',
            duplicateName: false,
            foreignKeyEnabled: false,
            isUnsigned: false,
            isAlias: editData.alias
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        // For edit action
        this.setState({
            columnType: nextProps.editData.type,
            duplicateName: false,
            foreignKeyEnabled: !!nextProps.editData.foreignKey.on.id,
            isUnsigned: nextProps.editData.unsigned
        });
    }

    getFormData = () => {
        let name;
        const origin = this.origin.getData();
        if (this.state.isAlias) {
            name = this.name.value.trim();
        } else {
            name = origin.currentOriginColumnName;
            if (!name) {
                this.setState({ duplicateName: true });
                return false;
            }
        }
        const data = {
            name,
            type: this.type.value,
            length: this.length.value.trim(),
            defValue: this.defValue.value.trim(),
            comment: this.comment.value.trim(),
            autoInc: this.autoInc.checked,
            nullable: this.nullable.checked,
            unique: this.unique.checked,
            index: this.index.checked,
            unsigned: this.unsigned.checked,
            originTable: origin.currentOriginTableName,
            originColumn: origin.currentOriginColumnName,
            foreignKey: {
                references: {
                    id: '',
                    name: ''
                },
                on: {
                    id: '',
                    name: ''
                }
            }
        };

        if (this.foreignKey) {
            data.foreignKey = this.foreignKey.getData();
        }

        if (!data.name) {
            return false;
        }

        const { tableId, columns, editData } = this.props;

        const duplicate = findIndex(columns[tableId], (column) => column.name === data.name);

        if (duplicate !== -1 && data.name !== editData.name) {
            // Duplicate column name
            this.setState({ duplicateName: true });
            return false;
        }
        data.alias = data.name !== data.originColumn;

        // Reset all state variables
        this.setState({
            columnType: '',
            duplicateName: false,
            foreignKeyEnabled: false,
            isUnsigned: false
        });

        return data;
    }

    handleSubmit = (event: Event) => {
        event.preventDefault();
    }

    saveColumnAndContinue = () => {
        const data = this.getFormData();

        if (!data) {
            return;
        }

        const { saveColumn, tableId } = this.props;
        const hideModal = false;

        saveColumn({
            id: Math.random().toString(36).substring(7),
            ...data
        }, tableId, hideModal);

        this.form.reset();
    }

    saveColumnAndExit = () => {
        const data = this.getFormData();

        if (!data) {
            return;
        }

        const { saveColumn, updateColumn, editMode, editData, tableId } = this.props;

        if (editMode) {
            updateColumn({
                id: editData.id,
                ...data
            }, tableId);
        } else {
            saveColumn({
                id: Math.random().toString(36).substring(7),
                ...data
            }, tableId);
        }
    }

    updateColumnType = (event: { target: { value: string } }) => {
        this.setState({ columnType: event.target.value });
    }

    updateUnsignedValue = (event: { target: { checked: boolean } }) => {
        this.setState({
            isUnsigned: event.target.checked,
            foreignKeyEnabled: false
        });
    }

    updateForeignKeyValue = (event: { target: { checked: boolean } }) => {
        this.setState({ foreignKeyEnabled: event.target.checked });
    }

    updateName = () => {
        this.setState({ isAlias: !this.state.isAlias });
    }


    render() {
        console.log('ColumnModal rendering'); // eslint-disable-line no-console
        const {
            columns,
            editData,
            editMode,
            showColumnModal,
            tables,
            toggleColumnModal,
            origins,
            primary,
            tableId
        } = this.props;
        const { columnType, duplicateName, foreignKeyEnabled, isUnsigned } = this.state;
        return (
            <Modal
                show={ showColumnModal }
                onHide={ toggleColumnModal }
            >
                <Modal.Header>
                    <button type='button' className='close' onClick={ toggleColumnModal }>
                        <span>&times;</span>
                    </button>
                    <Modal.Title>
                        { editMode ? 'Update Column' : 'Add Column' }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form
                        className='form-horizontal'
                        ref={ (form) => { this.form = form; } }
                        onSubmit={ this.handleSubmit }
                    >

                        <OriginKeyForm
                            ref={ (origin) => { this.origin = origin; } }
                            columns={ columns }
                            tables={ tables }
                            primary={ primary }
                            tableId={ tableId }
                            origins={ origins }
                            column={ editData }
                        />


                        <div className={ classnames('form-group', { 'has-error': duplicateName }) }>
                            <label className='col-xs-3 control-label' htmlFor='name'><input
                                type='checkbox'
                                id='name'
                                onChange={ this.updateName }
                                checked={ this.state.isAlias }
                            /> Rename:
                            </label>
                            { this.state.isAlias &&
                                <div className='col-xs-9'>
                                    <input
                                        type='text'
                                        id='name'
                                        ref={ (name) => { this.name = name; } }
                                        className='form-control'
                                        defaultValue={ editData.name }
                                    />
                                </div>

                            }

                            { duplicateName &&
                                <span className='col-xs-offset-3 col-xs-9 help-block'>
                                    Duplicate column name
                                </span>
                            }
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='type'>Type:</label>
                            <div className='col-xs-9'>
                                <select
                                    className='form-control'
                                    id='type'
                                    ref={ (type) => { this.type = type; } }
                                    defaultValue={ columnType }
                                    onChange={ this.updateColumnType }
                                >
                                    <option value='Integer'>Integer</option>
                                    <option value='VARCHAR'>VARCHAR</option>
                                    <option value='Text'>Text</option>
                                    <option value='DateTime'>DateTime</option>
                                    <optgroup label='Numeric'>
                                        <option value='SMALLINT'>SMALLINT</option>
                                        <option value='BigInteger'>BigInteger</option>
                                        <option value='Boolean'>Boolean</option>
                                        <option disabled='disabled'>-</option>
                                        <option value='DECIMAL'>DECIMAL</option>
                                        <option value='FLOAT'>FLOAT</option>
                                    </optgroup>
                                    <optgroup label='Date and time'>
                                        <option value='Date'>Date</option>
                                        <option value='TIMESTAMP'>TIMESTAMP</option>
                                        <option value='TIME'>TIME</option>
                                    </optgroup>
                                    <optgroup label='String'>
                                        <option value='CHAR'>CHAR</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='length'>Length:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='length'
                                    ref={ (length) => { this.length = length; } }
                                    className='form-control'
                                    defaultValue={ editData.length }
                                    placeholder={ !isFractionType(columnType) ? '' :
                                        'Use comma separated value for decimal, double or float'
                                    }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='defVal'>
                                Default Value:
                            </label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='defVal'
                                    ref={ (defValue) => { this.defValue = defValue; } }
                                    className='form-control'
                                    defaultValue={ editData.defValue }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='col-xs-3 control-label' htmlFor='comment'>Comment:</label>
                            <div className='col-xs-9'>
                                <input
                                    type='text'
                                    id='comment'
                                    ref={ (comment) => { this.comment = comment; } }
                                    className='form-control'
                                    defaultValue={ editData.comment }
                                />
                            </div>
                        </div>
                        <div className='form-group'>
                            <strong className='col-xs-3 control-label'>Misc:</strong>
                            <div className='col-xs-9'>
                                <label className='checkbox-inline' htmlFor='autoInc'>
                                    <input
                                        type='checkbox'
                                        id='autoInc'
                                        ref={ (autoInc) => { this.autoInc = autoInc; } }
                                        defaultChecked={ editData.autoInc }
                                    /> A.I.
                                </label>
                                <label className='checkbox-inline' htmlFor='nullable'>
                                    <input
                                        type='checkbox'
                                        id='nullable'
                                        ref={ (nullable) => { this.nullable = nullable; } }
                                        defaultChecked={ editData.nullable }
                                    /> Nullable
                                </label>
                                <label className='checkbox-inline' htmlFor='unique'>
                                    <input
                                        type='checkbox'
                                        id='unique'
                                        ref={ (unique) => { this.unique = unique; } }
                                        defaultChecked={ editData.unique }
                                    /> Unique
                                </label>
                                <label className='checkbox-inline' htmlFor='index'>
                                    <input
                                        type='checkbox'
                                        id='index'
                                        ref={ (index) => { this.index = index; } }
                                        defaultChecked={ editData.index }
                                    /> Index
                                </label>
                                <label className='checkbox-inline' htmlFor='unsigned'>
                                    <input
                                        type='checkbox'
                                        id='unsigned'
                                        ref={ (unsigned) => { this.unsigned = unsigned; } }
                                        checked={ isUnsigned }
                                        onChange={ this.updateUnsignedValue }
                                    /> Unsigned
                                </label>
                            </div>
                            <div className='col-xs-9 col-xs-offset-3'>
                                <label
                                    className={ classnames('checkbox-inline', { disabled: !isUnsigned }) }
                                    htmlFor='foreign'
                                >
                                    <input
                                        type='checkbox'
                                        id='foreign'
                                        checked={ foreignKeyEnabled }
                                        disabled={ !isUnsigned }
                                        onChange={ this.updateForeignKeyValue }
                                    /> Foreign Key
                                </label>
                            </div>
                        </div>

                        { foreignKeyEnabled &&
                            <ForeignKeyForm
                                ref={ (foreignKey) => { this.foreignKey = foreignKey; } }
                                columns={ columns }
                                tables={ tables }
                                data={ editData.foreignKey }
                                primary={ primary }
                                tableId={ tableId }
                                origins={ origins }
                            />
                        }
                    </form>
                </Modal.Body>

                <Modal.Footer className='modal-footer text-right'>
                    { !editMode &&
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={ this.saveColumnAndContinue }
                        >Save &amp; Continue
                        </button>
                    }

                    <button type='button' className='btn btn-primary' onClick={ this.saveColumnAndExit }>
                        { editMode ? 'Update Column' : 'Save & Exit' }
                    </button>
                    <button
                        type='button'
                        className='btn btn-default'
                        onClick={ toggleColumnModal }
                    >Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ColumnModal;
