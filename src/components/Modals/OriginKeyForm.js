/**
 * @flow
 */
import React, { PureComponent } from 'react';
import type { ColumnType, TableType, OriginTable } from '../../utils/flowtypes';

type Props = {
    tables: Array<TableType>,
    column: ColumnType,
    tableId: string,
    origins: Array<OriginTable>,
    primary: string,
    columns: {
        [tableId: string]: Array<ColumnType>
    }
};

type State = {
    currentOriginTableName: string,
    currentOriginColumnName: string
};

class OriginKeyForm extends PureComponent<Props, State> {
    props: Props

    state: State

    constructor(props: Props) {
        super(props);
        const { column } = this.props;
        this.state = {
            currentOriginTableName: column.originTable,
            currentOriginColumnName: column.originColumn
        };
    }
    getData = () => ({ ...this.state })

    setCurrentOriginTable = (event: { target: { value: string } }) => {
        const selected = event.target.value;

        this.setState({
            currentOriginTableName: selected,
            currentOriginColumnName: null
        });
    }

    setCurrentOriginColumn = (event: { target: { value: string } }) => {
        const selected = event.target.value;


        this.setState({
            currentOriginColumnName: selected
        });
    }

    getBrother = () => {
        const { tables, tableId, origins } = this.props;

        const thisTable = tables.filter((e) => (e.id === tableId))[0];
        if (thisTable === undefined) return [];

        const origin = origins.filter((e) => (e.name === thisTable.origin))[0];

        if (origin === undefined) return [];
        return origin.brothers;
    }

    getColumns = (name) => {
        const { origins, primary } = this.props;
        const thisTable = this.getCurrentTable();
        if (thisTable === undefined) return [];
        const origin = origins.filter((e) => (e.name === name))[0];
        if (origin === undefined) return [];
        return origin.columns.filter((column) => !column.foreignKey.on.id && column.name !== primary);
    }

    getFather = () => {
        const { tables, tableId, origins } = this.props;

        const thisTable = tables.filter((e) => (e.id === tableId))[0];
        if (thisTable === undefined) return [];
        const origin = origins.filter((e) => (e.name === thisTable.origin))[0];
        if (origin === undefined) return [];
        return origin.fathers;
    }

    getCurrentTable = () => {
        const { tables, tableId } = this.props;

        const thisTable = tables.filter((e) => (e.id === tableId))[0];
        return thisTable;
    }


    render() {
        console.log('ForeignKeyForm rendering'); // eslint-disable-line no-console
        const { column } = this.props;

        const { currentOriginTableName } = this.state;

        return (
            <div className='form-group'>
                <strong className='col-xs-3 control-label'>
                    OriginField
                </strong>
                <span className='col-xs-2 control-label'>Field</span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        onChange={ this.setCurrentOriginColumn }
                        defaultValue={ column.originColumn }
                    >
                        <option value=''>null</option>

                        {
                            this.getColumns(currentOriginTableName)
                                .map((c) => (

                                    <option key={ c.name } value={ c.name }>
                                        {c.name}
                                    </option>
                                ))
                        }


                    </select>
                </div>
                <span className='col-xs-1 control-label'> On: </span>
                <div className='col-xs-3'>
                    <select
                        className='form-control'
                        onChange={ this.setCurrentOriginTable }
                        defaultValue={ column.originTable }
                    >

                        <option value=''>null</option>
                        <option value={ column.originTable }>{column.originTable}</option>

                        <optgroup label='Father'>
                            {this.getFather().map((name) => (
                                <option key={ name } value={ name }>
                                    {name}
                                </option>
                            ))}

                        </optgroup>

                        <optgroup label='Brother'>
                            {this.getBrother().map((name) => (
                                <option key={ name } value={ name }>
                                    {name}
                                </option>
                            ))}


                        </optgroup>
                    </select>
                </div>
            </div>
        );
    }
}

export default OriginKeyForm;
