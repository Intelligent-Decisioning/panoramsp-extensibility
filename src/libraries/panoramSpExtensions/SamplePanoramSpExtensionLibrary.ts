import { SampleView } from "../SampleView/SampleView";
import { ICustomView } from "../../panoramsp/models";
import { IPanoramSPExtension } from "../../panoramsp/models/IPanoramSPExtension";
import { ICustomLayout } from "../../panoramsp/models/ICustomLayout";
import React from "react";
export class SamplePanoramSpExtensionLibrary implements IPanoramSPExtension {

  extensionId: string = "SamplePanoramSpExtensionLibrary";

  private customViews: ICustomView[] = [
    {
      key: 'sample-view',
      displayName: 'Sample View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      mappings: [],
      settings: [
        {
          key: 'disable-share',
          label: 'Disable Share',
          type: 'checkbox'
        }
      ]
    },
    {
      key: 'another-view',
      displayName: 'Another View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      mappings: [],
      settings: [
        {
          key: 'some-text-field',
          label: 'Some Text Field',
          type: 'text'
        }
      ]
    }
  ];

  getViews(): ICustomView[] {
    return this.customViews;
  }

  private customLayouts: ICustomLayout[] = [
    {
      key: 'sample-layout',
      displayName: 'Sample Layout',
      layoutComponent: () => React.createElement('div'),
      settings: [
        {
          key: 'disable-share',
          label: 'Disable Share',
          type: 'checkbox'
        }
      ],
      mappings: []
    }
  ];

  getLayouts(): ICustomLayout[] {
    return this.customLayouts;
  }
}
