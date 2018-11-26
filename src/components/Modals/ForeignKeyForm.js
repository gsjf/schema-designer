/**
 * @flow
 */
import React, { PureComponent } from 'react';
import find from 'lodash/find';
import type { ColumnType, ForeignKeyType, TableType, OriginTable } from '../../utils/flowtypes';

type Props = {
    tables: Array<TableType>,
    tableId: string,
    origins: Array<OriginTable>,
    primary: string,
    columns: {
        [tableId: string]: Array<ColumnType>
    },
    data: ForeignKeyType
};

type State = {
    currentForeignTableId: string,
    currentForeignTableName: string,
    currentForeignColumnId: string,
    currentForeignColumnName: string
};

class ForeignKeyForm extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        const { data } = props;

        this.state = {
            currentForeignTableId: data.on.id,
            currentForeignTableName: data.on.name,
            currentForeignColumnId: data.references.id,
            currentForeignColumnName: data.references.name
        };
    }

    props: Props

    state: State

    getData = () => {
        const {
            currentForeignColumnId,
            currentForeignColumnName,
            currentForeignTableId,
            currentForeignTableName
        } = this.state;

        let invalidData = false;

        if (!currentForeignTableId || !currentForeignColumnId) {
            invalidData = true;
        }

        return {
            references: {
                id: invalidData ? '' : currentForeignColumnId,
                name: invalidData ? '' : currentForeignColumnName
            },
            on: {
                id: invalidData ? '' : currentForeignTableId,
                name: invalidData ? '' : currentForeignTableName
            }
        };
    }

    setCurrentForeignTable = (event: { target: { value: string } }) => {
        const { tables, columns, primary } = this.props;
        const selected = event.target.value;
        let name = '';

        if (selected) {
            // eslint-disable-next-line
            name = find(tables, { id: selected }).name;
        }
        const { id } = columns[selected]
            .filter((column) => !column.foreignKey.on.id && column.name === primary)[0];

        this.setState({
            currentForeignTableId: selected,
            currentForeignTableName: name,
            currentForeignColumnId: id,
            currentForeignColumnName: primary
        });
    }

    setCurrentForeignColumn = (event: { target: { value: string } }) => {
        const { columns } = this.props;
        const { currentForeignTableId } = this.state;

        const selected = event.target.value;
        let name = '';

        if (selected) {
            // eslint-disable-next-line
            name = find(columns[currentForeignTableId], { id: selected }).name;
        }

        this.setState({
            currentForeignColumnId: selected,
            currentForeignColumnName: name
        });
    }

    getBrother = () => {
        const { tables, tableId, origins } = this.props;

        const thisTable = tables.filter((e) => (e.id === tableId))[0];
        const origin = origins.filter((e) => (e.name === thisTable.origin))[0];
        const brothers = tables.filter((table) => origin.brothers.filter((e) => e === table.origin).length > 0);
        console.log('brothers');
        console.log(brothers);
        return brothers;
    }

    getFather = () => {
        const { tables, tableId, origins } = this.props;

        const thisTable = tables.filter((e) => (e.id === tableId))[0];
        const origin = origins.filter((e) => (e.name === thisTable.origin))[0];
        const sons = tables.filter((table) => origin.fathers.filter((e) => e === table.origin).length > 0);
        console.log('sons');
        console.log(sons);
        return sons;
    }

    render() {
        console.log('ForeignKeyForm rendering'); // eslint-disable-line no-console
        const { tables, data, columns, tableId, primary } = this.props;
        const { currentForeignTableId } = this.state;
        console.log(tables);
        console.log(tableId);

        return (
            <div className='form-group'>
                <strong className='col-xs-3 control-label'>Foreign Key:</strong>
                <span className='col-xs-2 control-label'>References:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        onChange={ this.setCurrentForeignColumn }
                    >
                        { columns[currentForeignTableId] !== undefined &&
                        columns[currentForeignTableId]
                            .filter((column) => !column.foreignKey.on.id && column.name === primary)
                            .map((column) => (

                                <option key={ column.id } value={ column.id } selected>
                                    { column.name }
                                </option>
                            ))
                        }
                        { columns[currentForeignTableId] !== undefined &&
                            columns[currentForeignTableId]
                                .filter((column) => !column.foreignKey.on.id && column.name !== primary)
                                .map((column) => (

                                    <option key={ column.id } value={ column.id } disabled>
                                        { column.name }
                                    </option>
                                ))
                        }


                    </select>
                </div>
                <span className='col-xs-1 control-label'>On:</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        onChange={ this.setCurrentForeignTable }
                        defaultValue={ data.on.id }
                    >
                        <option value=''>None</option>

                        <optgroup label='Father'>
                            { this.getFather().map((table) => (
                                <option key={ table.id } value={ table.id }>
                                    { table.name }
                                </option>
                            ))}

                        </optgroup>

                        <optgroup label='Brother'>
                            { this.getBrother().map((table) => (
                                <option key={ table.id } value={ table.id }>
                                    { table.name }
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </div>
            </div>
        );
    }
}

export default ForeignKeyForm;
