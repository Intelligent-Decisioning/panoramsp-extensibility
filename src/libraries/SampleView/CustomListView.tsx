import React from 'react';
import { formatUser, IBaseViewProps } from '../..';
import { DetailsList, Pivot, PivotItem } from '@fluentui/react';
import type { IColumn } from '@fluentui/react/lib/DetailsList';

export interface ICustomListViewProps extends IBaseViewProps {
}

type ViewType = 'info' | 'details' | 'comments';

export const CustomListView: React.FC<ICustomListViewProps> = (props) => {
  const [view, setView] = React.useState<ViewType>('info');

  const columns: IColumn[] = React.useMemo(() => {
    const cols: IColumn[] = [
      { key: 'column1', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true }
    ];

    switch (view) {
      case 'info':
        cols.push(
          { key: 'column1', name: 'Approver', fieldName: 'DCAPVLDOCUMENTOWNER', minWidth: 100, maxWidth: 200, isResizable: true, 
            onRender: (item) => <span>{formatUser(item.DCAPVLDOCUMENTOWNER)}</span> },
          { key: 'column2', name: 'Stage', fieldName: 'DCAPVLSTAGE', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'column3', name: 'Type', fieldName: 'DCAPVLTYPE', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'column4', name: 'Document ID', fieldName: 'DCAPVLDOCUMENTID', minWidth: 100, maxWidth: 200, isResizable: true },
        );
        break;

      case 'details':
        cols.push(
          { key: 'column1', name: 'Request Date', fieldName: 'DCAPVLREQUESTDATE', minWidth: 100, maxWidth: 200, isResizable: true, 
            onRender: (item) => <span>{new Date(item.DCAPVLREQUESTDATE).toLocaleString()}</span> },
          { key: 'column2', name: 'Response Date', fieldName: 'DCAPVLRESPONSEDATE', minWidth: 100, maxWidth: 200, isResizable: true, 
            onRender: (item) => <span>{new Date(item.DCAPVLRESPONSEDATE).toLocaleString()}</span> },
          { key: 'column3', name: 'Outcome', fieldName: 'DCAPVLOUTCOME', minWidth: 100, maxWidth: 200, isResizable: true },
        );
        break;

      case 'comments':
        cols.push(
          { key: 'column1', name: 'Comments', fieldName: 'DCAPVLCOMMENTS', minWidth: 100, maxWidth: 200, isResizable: true },
          { key: 'column2', name: 'Summary', fieldName: 'DCAPVLSUMMARY', minWidth: 100, maxWidth: 200, isResizable: true }
        );
        break;
    }

    return cols;
  }, [view]);

  return (
    <div>
      <h2>docCentrum Approvals</h2>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        <Pivot onLinkClick={(item) => setView(item?.props.itemKey as ViewType ?? 'info')}>
          <PivotItem headerText="Info" itemKey="info" onClick={() => setView('info')} />
          <PivotItem headerText="Details" itemKey="details" onClick={() => setView('details')} />
          <PivotItem headerText="Comments" itemKey="comments" onClick={() => setView('comments')} />
        </Pivot>
      </div>

      <DetailsList
        items={props.data}
        columns={columns}
      />
    </div>
  );
}