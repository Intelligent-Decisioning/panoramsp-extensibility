import { SampleView } from "../SampleView/SampleView";
import { ICustomView } from "../../panoramsp/models";
import { IPanoramSPExtension } from "../../panoramsp/models/IPanoramSPExtension";
import { ICustomLayout } from "../../panoramsp/models/ICustomLayout";
import React from "react";
import { IPropertyPaneField, PropertyPaneCheckbox } from "@microsoft/sp-property-pane";

export class SamplePanoramSpExtensionLibrary implements IPanoramSPExtension {
  private customViews: ICustomView[] = [
    {
      key: 'sample-view',
      displayName: 'Sample View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      mappings: []
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

  renderPropertyPaneControls(key: string): IPropertyPaneField<unknown>[] {
    const layout = this.customLayouts.find(l => l.key === key);
    if (!layout || !layout.settings) {
      return [];
    }

    const fields: IPropertyPaneField<unknown>[] = [];

    for(const setting of layout.settings) {
      switch (setting.type) {
        case 'checkbox': {
          fields.push(PropertyPaneCheckbox(`${layout.key}_${setting.key}`, {
            text: setting.label
          }));
        }
      }
    }

    return fields;
  }
}
