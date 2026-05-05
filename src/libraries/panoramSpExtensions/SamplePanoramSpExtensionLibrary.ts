import { SampleView } from "../SampleView/SampleView";
import { ICustomView } from "../../panoramsp/models";
import { IPanoramSPExtension } from "../../panoramsp/models/IPanoramSPExtension";
export class SamplePanoramSpExtensionLibrary implements IPanoramSPExtension {

  extensionId: string = "SamplePanoramSpExtensionLibrary";

  private customViews: ICustomView[] = [
    {
      key: 'sample-view',
      displayName: 'Sample View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      mappings: [
        {
          configType: 'system',
          disabled: false,
          property: { key: 'MercuryArticleDate', text: 'Date' },
          visible: true,
          name: 'article-date'
        }
      ],
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
}
