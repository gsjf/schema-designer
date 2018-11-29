/**
 * @flow
 */
import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ExportDatabase from '../containers/ExportDatabase';

const tableTooltip = (
    <Tooltip id='table-tooltip'><strong>Create New Table</strong></Tooltip>
);

const databaseTooltip = (
    <Tooltip id='table-tooltip'><strong>Please set as your root table</strong></Tooltip>
);

const trashTooltip = (
    <Tooltip id='trash-tooltip'><strong>Clear Current Schema</strong></Tooltip>
);


type State = {
    isRequest: boolean
};
type Props = {
    dbName: string,
    dbModal: boolean,
    toggleDbModal: (editMode?: boolean) => void,
    toggleTableModal: () => void
};

class Header extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        if (!props.dbName && !props.dbModal) {
            props.toggleDbModal();
        }
    }

    componentDidMount(): void {
        if (!this.props.dbName) {
            this.initData();
        }
    }

    initData = () => {
        const isDebug = true;
        const baseUrl = '/display/schema';
        if (window.location.search.length === 0) return;
        fetch(baseUrl + window.location.search)
            .then((res) => {
                if (res.status !== 200) {
                    return Promise.reject(new Error(res.statusText));
                }
                return res.json();
            })
            .then((data) => {
                // Get Data
                // const data = JSON.parse(response.data);
                window.localStorage.setItem('schema', JSON.stringify(data));
                // Reload the page
                window.location.reload();
            }).catch((error) => {
                alert(`Data Fetch Error${ error }`);
                if (!isDebug) {
                    return;
                }
                const fake = {
                    database: { name: 'brapi' },
                    ui: {
                        database: { showModal: false, edit: false },
                        table: {
                            showModal: false,
                            edit: false,
                            editData: { id: '', name: '', softDelete: false, timeStamp: true, initAll: true }
                        },
                        column: {
                            showModal: false,
                            edit: false,
                            editData: {
                                id: '',
                                name: '',
                                type: 'integer',
                                length: '',
                                defValue: '',
                                origin: null,
                                comment: '',
                                autoInc: false,
                                Noneable: false,
                                unique: false,
                                index: false,
                                unsigned: false,
                                originTable: '',
                                originColumn: '',
                                isAlias: false,
                                foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                            },
                            tableId: ''
                        },
                        positions: { tYrg: { x: 150, y: 0 }, pbQtXvV: { x: 450, y: 0 }, DZKHqcw: { x: 750, y: 0 } }
                    },
                    tables: [{
                        id: 'tYrg',
                        name: 'brapi',
                        origin: 'brapi',
                        color: 'table-header-red',
                        initAll: true,
                        timeStamp: false
                    }, {
                        id: 'pbQtXvV',
                        name: 'data',
                        origin: 'data',
                        color: 'table-header-red',
                        initAll: true,
                        timeStamp: false
                    }, {
                        id: 'DZKHqcw',
                        name: 'detail',
                        origin: 'detail',
                        color: 'table-header-red',
                        initAll: true,
                        timeStamp: false
                    }],
                    columns: {
                        DZKHqcw: [{
                            id: 'lJnmsp',
                            name: 'id',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'uATdtE',
                            name: 'value',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'value',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: STR0002532',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'vSysCL',
                            name: 'key',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'key',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: rs_strategy_id',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'heCg',
                            name: 'dataid',
                            alias: false,
                            originTable: '',
                            originColumn: '',
                            type: 'Integer',
                            comment: 'Auto Generate FK ID',
                            autoInc: false,
                            unique: false,
                            index: false,
                            unsigned: true,
                            nullable: false,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: 'jfvA', name: 'id' }, on: { id: 'pbQtXvV', name: 'data' } }
                        }],
                        pbQtXvV: [{
                            id: 'jfvA',
                            name: 'id',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'pmuTS',
                            name: 'code',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'code',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 00',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'mZWDjNC',
                            name: 'swift_number',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'swift_number',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 3002973_20181115133917_0625',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }],
                        tYrg: [{
                            id: 'vbsoRQ',
                            name: 'id',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'FYXAjs',
                            name: 'phone',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'phone',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 18434814774',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'sSCa',
                            name: 'idCard',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'idCard',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 371424197808120099',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'BdekOo',
                            name: 'name',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'name',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: \u6768\u5c0f\u9f99',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'VvvNxrj',
                            name: 'dataid',
                            alias: false,
                            originTable: '',
                            originColumn: '',
                            type: 'Integer',
                            comment: 'Auto Generate FK ID',
                            autoInc: false,
                            unique: false,
                            index: false,
                            unsigned: true,
                            nullable: false,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: 'jfvA', name: 'id' }, on: { id: 'pbQtXvV', name: 'data' } }
                        }]
                    },
                    relations: [{
                        source: { columnId: 'VvvNxrj', tableId: 'tYrg' },
                        target: { columnId: 'jfvA', tableId: 'pbQtXvV' }
                    }, { source: { columnId: 'heCg', tableId: 'DZKHqcw' }, target: { columnId: 'jfvA', tableId: 'pbQtXvV' } }],
                    origins: [{
                        columns: [{
                            id: 'vbsoRQ',
                            name: 'id',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'FYXAjs',
                            name: 'phone',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'phone',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 18434814774',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'sSCa',
                            name: 'idCard',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'idCard',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 371424197808120099',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'BdekOo',
                            name: 'name',
                            alias: false,
                            originTable: 'brapi',
                            originColumn: 'name',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: \u6768\u5c0f\u9f99',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'VvvNxrj',
                            name: 'dataid',
                            alias: false,
                            originTable: '',
                            originColumn: '',
                            type: 'Integer',
                            comment: 'Auto Generate FK ID',
                            autoInc: false,
                            unique: false,
                            index: false,
                            unsigned: true,
                            nullable: false,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: 'jfvA', name: 'id' }, on: { id: 'pbQtXvV', name: 'data' } }
                        }],
                        name: 'brapi',
                        fathers: [],
                        sons: [],
                        brothers: ['data']
                    }, {
                        columns: [{
                            id: 'jfvA',
                            name: 'id',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'pmuTS',
                            name: 'code',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'code',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 00',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'mZWDjNC',
                            name: 'swift_number',
                            alias: false,
                            originTable: 'data',
                            originColumn: 'swift_number',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: 3002973_20181115133917_0625',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }],
                        name: 'data',
                        fathers: ['brapi'],
                        sons: ['detail'],
                        brothers: []
                    }, {
                        columns: [{
                            id: 'lJnmsp',
                            name: 'id',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'id',
                            type: 'Integer',
                            comment: 'Auto Generate PK ID',
                            autoInc: true,
                            unique: true,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'uATdtE',
                            name: 'value',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'value',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: STR0002532',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'vSysCL',
                            name: 'key',
                            alias: false,
                            originTable: 'detail',
                            originColumn: 'key',
                            type: 'MEDIUMTEXT',
                            comment: 'eg: rs_strategy_id',
                            autoInc: false,
                            unique: null,
                            index: false,
                            unsigned: false,
                            nullable: true,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: '', name: '' }, on: { id: '', name: '' } }
                        }, {
                            id: 'heCg',
                            name: 'dataid',
                            alias: false,
                            originTable: '',
                            originColumn: '',
                            type: 'Integer',
                            comment: 'Auto Generate FK ID',
                            autoInc: false,
                            unique: false,
                            index: false,
                            unsigned: true,
                            nullable: false,
                            length: '',
                            defValue: '',
                            foreignKey: { references: { id: 'jfvA', name: 'id' }, on: { id: 'pbQtXvV', name: 'data' } }
                        }],
                        name: 'detail',
                        fathers: ['brapi', 'data'],
                        sons: [],
                        brothers: []
                    }]
                };
                window.localStorage.setItem('schema', JSON.stringify(fake));
                window.location.reload();
            });
    }

    shouldComponentUpdate(nextProps: Props) {
        // Update only if database name changes
        return this.props.dbName !== nextProps.dbName;
    }

    clearSchemaData = () => {
        this.props.toggleDbModal();
        window.localStorage.removeItem('schema');
        window.location.reload();
    }

    toggleDbModal = () => {
        const editMode = true;
        this.props.toggleDbModal(editMode);
    }

    render() {
        console.log('Header rendering'); // eslint-disable-line no-console
        const { dbName, toggleTableModal } = this.props;

        return (
            <header>
                <div className='container'>
                    <div className='row'>
                        <div className='title col-xs-5 col-sm-4 text-left'>
                            <strong>JSON2DB</strong>
                        </div>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={ databaseTooltip }
                            delayShow={ 300 }
                            rootClose
                        >
                            <div className='db-name col-xs-5 col-sm-4 text-center'>

                                <span><i className='fa fa-database'></i> {dbName}</span>
                                {!!dbName &&

                                <sup>
                                    <button
                                        className='fa fa-edit'
                                        onClick={ this.toggleDbModal }
                                    >
                                    </button>
                                </sup>
                                }

                            </div>
                        </OverlayTrigger>
                        <div className='menu col-xs-2 col-sm-4 text-right'>
                            <ul className='list-inline'>
                                <li>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={ tableTooltip }
                                        delayShow={ 300 }
                                        rootClose
                                    >
                                        <button
                                            className='fa fa-plus'
                                            onClick={ toggleTableModal }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={ trashTooltip }
                                        delayShow={ 300 }
                                        rootClose
                                    >
                                        <button
                                            className='fa fa-trash-o'
                                            onClick={ this.clearSchemaData }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>

                                <ExportDatabase />


                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
