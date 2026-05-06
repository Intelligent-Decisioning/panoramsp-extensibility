import React from 'react';
import { IBaseViewProps } from '../..';
import { DetailsList } from '@fluentui/react';
import type { IColumn } from '@fluentui/react/lib/DetailsList';

export interface ICustomListViewProps extends IBaseViewProps {
  dcViewId?: 'info' | 'details' | 'comments';
}

export const CustomListView: React.FC<ICustomListViewProps> = (props) => {
  const columns: IColumn[] = [];

  switch (props.dcViewId) {
    case 'info':
      columns.push(
        { key: 'column1', name: 'Approver', fieldName: 'DCAPVLDOCUMENTOWNER', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Stage', fieldName: 'DCAPVLSTAGE', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Type', fieldName: 'DCAPVLTYPE', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Document ID', fieldName: 'DCAPVLDOCUMENTID', minWidth: 100, maxWidth: 200, isResizable: true },
      );
      break;

    case 'details':
      columns.push(
        { key: 'column1', name: 'Request Date', fieldName: 'DCAPVLREQUESTDATE', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Response Date', fieldName: 'DCAPVLRESPONSEDATE', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Outcome', fieldName: 'DCAPVLOUTCOME', minWidth: 100, maxWidth: 200, isResizable: true },
      );
      break;

    case 'comments':
      columns.push(
        { key: 'column1', name: 'Comments', fieldName: 'DCAPVLCOMMENTS', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Summary', fieldName: 'DCAPVLSUMMARY', minWidth: 100, maxWidth: 200, isResizable: true }
      );
      break;
  }

  return (
    <div>
      <h2>Custom List View</h2>
      <p>This is a custom list view that can be used in the lists mode.</p>


      <DetailsList
        items={props.data}
        columns={columns}
      />
    </div>
  );
}