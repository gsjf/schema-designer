/**
 * @flow
 */
import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import ExportDatabase from '../containers/ExportDatabase';
import ImportDatabase from './ImportDatabase';

const tableTooltip = (
    <Tooltip id='table-tooltip'><strong>Create New Table</strong></Tooltip>
);

const trashTooltip = (
    <Tooltip id='trash-tooltip'><strong>Clear Current Schema</strong></Tooltip>
);

const forkTooltip = (
    <Tooltip id='fork-tooltip'><strong>Fork me on Github</strong></Tooltip>
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
                if (isDebug) {
                    const fake = {
                        database: {
                            name: 'mysql'
                        },
                        ui: {
                            database: {
                                showModal: false,
                                edit: false
                            },
                            table: {
                                showModal: false,
                                edit: false,
                                editData: {
                                    id: '',
                                    name: '',
                                    softDelete: false,
                                    timeStamp: true,
                                    initAll: true
                                }
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
                                    nullable: false,
                                    unique: false,
                                    index: false,
                                    unsigned: false,
                                    originTable: '',
                                    originColumn: '',
                                    isAlias: false,
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
                                },
                                tableId: ''
                            },
                            positions: {
                                gfms4: {
                                    x: 918,
                                    y: 119
                                },
                                x00uni: {
                                    x: 365,
                                    y: 119
                                }
                            }
                        },
                        tables: [
                            {
                                id: 'gfms4',
                                name: 'dd',
                                color: 'table-header-red',
                                softDelete: false,
                                timeStamp: true
                            },
                            {
                                id: 'x00uni',
                                name: 'ddd2',
                                color: 'table-header-red',
                                softDelete: false,
                                timeStamp: true
                            }
                        ],
                        columns: {
                            gfms4: [
                                {
                                    id: 'toxm9',
                                    name: 'd',
                                    type: 'tinyInteger',
                                    length: '1',
                                    defValue: '1',
                                    comment: '11',
                                    autoInc: false,
                                    nullable: false,
                                    unique: false,
                                    index: false,
                                    unsigned: false,
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
                                },
                                {
                                    id: 'x6rlz',
                                    name: 'f',
                                    type: 'integer',
                                    length: '',
                                    defValue: '',
                                    comment: '',
                                    autoInc: false,
                                    nullable: false,
                                    unique: false,
                                    index: true,
                                    unsigned: true,
                                    foreignKey: {
                                        references: {
                                            id: 'x6rlz',
                                            name: 'f'
                                        },
                                        on: {
                                            id: 'gfms4',
                                            name: 'dd'
                                        }
                                    }
                                },
                                {
                                    id: 'w2qy2a',
                                    name: 'asdf',
                                    type: 'VARCHAR',
                                    length: '16',
                                    defValue: '1252',
                                    comment: '',
                                    autoInc: false,
                                    nullable: false,
                                    unique: false,
                                    index: false,
                                    unsigned: false,
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
                                }
                            ],
                            x00uni: [
                                {
                                    id: 'mjhso',
                                    name: 'id',
                                    type: 'integer',
                                    length: '',
                                    defValue: '',
                                    comment: '',
                                    autoInc: true,
                                    nullable: false,
                                    unique: false,
                                    index: false,
                                    unsigned: false,
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
                                },
                                {
                                    id: 'p08smp',
                                    name: 'aaa',
                                    type: 'integer',
                                    length: '10',
                                    defValue: '',
                                    comment: 'adfds',
                                    autoInc: false,
                                    nullable: false,
                                    unique: false,
                                    index: false,
                                    unsigned: true,
                                    foreignKey: {
                                        references: {
                                            id: 'x6rlz',
                                            name: 'f'
                                        },
                                        on: {
                                            id: 'gfms4',
                                            name: 'dd'
                                        }
                                    }
                                }
                            ]
                        },
                        relations: [
                            {
                                source: {
                                    columnId: 'p08smp',
                                    tableId: 'x00uni'
                                },
                                target: {
                                    columnId: 'x6rlz',
                                    tableId: 'gfms4'
                                }
                            },
                            {
                                source: {
                                    columnId: 'x6rlz',
                                    tableId: 'gfms4'
                                },
                                target: {
                                    columnId: 'x6rlz',
                                    tableId: 'gfms4'
                                }
                            }
                        ],
                        origins: [
                            {
                                columns: [
                                    {
                                        id: '8469oe',
                                        name: 'id',
                                        type: 'integer',
                                        length: '',
                                        defValue: '',
                                        comment: '',
                                        autoInc: true,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    },
                                    {
                                        id: 'wg94c3',
                                        name: 'root_name',
                                        type: 'char',
                                        length: '10',
                                        defValue: '',
                                        comment: '',
                                        autoInc: false,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    },
                                    {
                                        id: 't6ge48',
                                        name: 'brother_id',
                                        type: 'integer',
                                        length: '',
                                        defValue: '',
                                        comment: '',
                                        autoInc: false,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: true,
                                        foreignKey: {
                                            references: {
                                                id: 'p6e1b',
                                                name: 'id'
                                            },
                                            on: {
                                                id: 'umbt3w',
                                                name: 'brother'
                                            }
                                        }
                                    }
                                ],
                                fathers: [],
                                sons: ['son'],
                                brothers: ['brother'],
                                name: 'root'
                            },
                            {
                                columns: [
                                    {
                                        id: 'p9xytc',
                                        name: 'id',
                                        type: 'integer',
                                        length: '',
                                        defValue: '',
                                        comment: '',
                                        autoInc: true,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    },
                                    {
                                        id: '6cteap',
                                        name: 'son_name',
                                        type: 'char',
                                        length: '10',
                                        defValue: '',
                                        comment: '',
                                        autoInc: false,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    },
                                    {
                                        id: 'jafhq',
                                        name: 'root_id',
                                        type: 'integer',
                                        length: '',
                                        defValue: '',
                                        comment: '',
                                        autoInc: false,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: true,
                                        foreignKey: {
                                            references: {
                                                id: '8469oe',
                                                name: 'id'
                                            },
                                            on: {
                                                id: 'ja01uu',
                                                name: 'root'
                                            }
                                        }
                                    }
                                ],
                                fathers: ['root'],
                                brothers: [],
                                sons: [],
                                name: 'son'
                            }, {
                                columns: [
                                    {
                                        id: '2hhh89',
                                        name: 'brother_name',
                                        type: 'char',
                                        length: '10',
                                        defValue: '',
                                        comment: '',
                                        autoInc: false,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    },
                                    {
                                        id: 'p6e1b',
                                        name: 'id',
                                        type: 'integer',
                                        length: '',
                                        defValue: '',
                                        comment: '',
                                        autoInc: true,
                                        nullable: false,
                                        unique: false,
                                        index: false,
                                        unsigned: false,
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
                                    }
                                ],
                                fathers: [],
                                brothers: ['root'],
                                sons: [],
                                name: 'brother'
                            }
                        ],
                        primary: 'id'
                    };
                    window.localStorage.setItem('schema', JSON.stringify(fake));
                    // Reload the page
                    window.location.reload();
                }
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
                            <strong>Schema Builder</strong>
                        </div>
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

                                <ImportDatabase />

                                <li>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={ forkTooltip }
                                        delayShow={ 300 }
                                        rootClose
                                    >
                                        <a href='https://github.com/Agontuk/schema-designer'>
                                            <i className='fa fa-github fa-lg' />
                                        </a>
                                    </OverlayTrigger>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
