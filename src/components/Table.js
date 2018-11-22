/**
 * @flow
 */
import noop from 'lodash/noop';
import React, { PureComponent } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Columns from '../containers/Columns';
import type { TableType } from '../utils/flowtypes';

type Props = {
    data: TableType,
    position: {
        x: number,
        y: number
    },
    onEditTable: (data: TableType) => void,
    onRemoveTable: (id: string) => void,
    onToggleColumnModal: (id: string) => void
};

type State = {
    showConfirm: boolean
};

class Table extends PureComponent<Props, State> {
    state = {
        showConfirm: false
    };

    editTable = () => {
        const { data, onEditTable } = this.props;
        onEditTable(data);
    };

    removeTable = () => {
        const { data, onRemoveTable } = this.props;
        onRemoveTable(data.id);
    };

    toggleColumnModal = () => {
        const { data, onToggleColumnModal } = this.props;
        onToggleColumnModal(data.id);
    };

    toggleConfirm = () => {
        const { showConfirm } = this.state;
        this.setState({ showConfirm: !showConfirm });
    };

    render() {
        console.log('Table rendering'); // eslint-disable-line no-console
        const { data, position } = this.props;
        const { showConfirm } = this.state;
        return (
            <div
                className='db-table draggable no-select'
                id={ data.id }
                style={ { left: position.x, top: position.y } }
            >
                <div className={ `table-header clearfix ${ data.color }` }>
                    <h4 className='pull-left' title={ data.name }>{ data.name }</h4>
                    <div className='pull-right'>
                        <span
                            className='fa fa-plus'
                            onClick={ this.toggleColumnModal }
                            onKeyPress={ noop }
                        >
                        </span>
                        <span
                            className='fa fa-pencil'
                            onClick={ this.editTable }
                            onKeyPress={ noop }
                        >
                        </span>

                        <span
                            className='fa fa-remove'
                            onClick={ this.toggleConfirm }
                            onKeyPress={ noop }
                        >
                        </span>

                        <Modal
                            show={ showConfirm }
                            onHide={ this.toggleConfirm }
                            dialogClassName='modal-sm'
                        >
                            <Modal.Header>
                                <button type='button' className='close' onClick={ this.toggleConfirm }>
                                    <span>&times;</span>
                                </button>
                                <Modal.Title>
                                    Delete Confirm
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <h5 className='modal-body'>
                                    Are you sure?
                                </h5>
                            </Modal.Body>

                            <Modal.Footer className='modal-footer text-right'>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={ this.removeTable }
                                    onKeyPress={ noop }
                                > Delete
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-primary'
                                    onClick={ this.toggleConfirm }
                                >Cancel
                                </button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>

                <Columns table={ data } />
            </div>
        );
    }
}

export default Table;
