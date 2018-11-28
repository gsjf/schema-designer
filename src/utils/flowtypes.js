/**
 * @flow
 */

export type ForeignKeyType = {
    references: {
        id: string,
        name: string
    },
    on: {
        id: string,
        name: string
    }
};

export type ColumnType = {
    id: string,
    name: string,
    alias: boolean,
    originTable: string,
    originColumn: string,
    type: string,
    comment: string,
    autoInc: boolean,
    unique: boolean,
    index: boolean,
    unsigned: boolean,
    nullable: boolean,
    length: string,
    defValue: string,
    foreignKey: ForeignKeyType
};

export type TableType = {
    id: string,
    name: string,
    origin: string,
    color: string,
    initAll: boolean,
    timeStamp: boolean
};

export type RelationType = {
    source: {
        tableId: string,
        columnId: string
    },
    target: {
        tableId: string,
        columnId: string
    }
};

export type TablePositionType = {
    id: string,
    x: number,
    y: number
};

export type UiType = {
    database: {
        showModal: boolean,
        edit: boolean
    },
    table: {
        showModal: boolean,
        edit: false,
        editData: TableType
    },
    column: {
        showModal: boolean,
        edit: false,
        editData: ColumnType
    }
};

export type OriginTable = {
    columns: Array<ColumnType>,
    fathers: Array<string>,
    brothers: Array<string>,
    name: string

};
