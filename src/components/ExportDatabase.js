/**
 * @flow
 */
import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import type { ColumnType, RelationType, TableType, UiType } from '../utils/flowtypes';

const exportTooltip = (
    <Tooltip id='export-tooltip'><strong>Generate Database Migrations</strong></Tooltip>
);

const exportJsonTooltip = (
    <Tooltip id='export-tooltip'><strong>Save All Table</strong></Tooltip>
);

type Props = {
    data: {
        database: {
            name: string
        },
        ui: UiType,
        tables: Array<TableType>,
        columns: {
            [tableId: string]: Array<ColumnType>
        },
        relations: Array<RelationType>
    }
};
const baseUpload = '/display/upload';
class ExportDatabase extends Component<Props> {
    // Flow type for refs
    download: any
    form: any

    handleSubmit = () => {
        if (typeof window.schema === 'object' &&
            window.schema.packageMode) {
            this.form.submit();
        } else {
            const { data } = this.props;
            const jsonData = JSON.stringify(data, null, 4);
            const rootname = data.database.name;
            if (data.tables.filter((e) => (e.name === rootname)).length === 0) {
                alert('Please Set Database Name As your RootTable Name');
                return;
            }

            fetch(
                baseUpload + window.location.search
                , {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                }
            ).then((res) => res.json())
                .catch((error) => console.error('Error:', error))
                .then((res) => { alert(res.msg); window.parent.location.reload(); });
            const url = `data:application/json;charset=utf8,${ encodeURIComponent(jsonData) }`;

            this.download.setAttribute('href', url);
            this.download.setAttribute('download', 'schema.txt');
            this.download.click();
        }
    }

    render() {
        console.log('ExportDatabase rendering'); // eslint-disable-line no-console
        const { data } = this.props;
        const packageMode = typeof window.schema === 'object' && window.schema.packageMode;
        const node = document.querySelector('meta[name="csrf-token"]');
        let csrfToken = '';

        if (node) {
            csrfToken = node.getAttribute('content');
        }

        return (
            <li>
                <form
                    className='form-inline'
                    method='POST'
                    action=''
                    ref={ (form) => {
                        this.form = form;
                    } }
                >
                    <input type='hidden' name='schema' value={ JSON.stringify(data) } />
                    <input type='hidden' name='_token' value={ csrfToken } />
                </form>
                <OverlayTrigger
                    placement='bottom'
                    overlay={ packageMode ? exportTooltip : exportJsonTooltip }
                    delayShow={ 300 }
                    rootClose
                >
                    <button
                        className='fa fa-save'
                        onClick={ this.handleSubmit }
                        disabled={ !data.tables.length }
                    >
                    </button>
                </OverlayTrigger>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    className='hidden'
                    ref={ (download) => {
                        this.download = download;
                    } }
                >
                    Save
                </a>
            </li>
        );
    }
}

export default ExportDatabase;
