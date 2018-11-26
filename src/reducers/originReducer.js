const initialState = [
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
        brothers: [],
        sons: [],
        name: 'brother'
    }
];

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
