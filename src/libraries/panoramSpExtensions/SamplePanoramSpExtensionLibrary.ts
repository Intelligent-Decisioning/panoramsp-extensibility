import { SampleView } from "../SampleView/SampleView";
import { ICustomView } from "../../panoramsp/models";
import { IPanoramSPExtension } from "../../panoramsp/models/IPanoramSPExtension";
import { CustomListView } from "../SampleView/CustomListView";
export class SamplePanoramSpExtensionLibrary implements IPanoramSPExtension {

  extensionId: string = "SamplePanoramSpExtensionLibrary";

  private customViews: ICustomView[] = [
    {
      key: 'sample-view',
      displayName: 'Sample View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      selectProperties: ['Title', 'Author', 'PictureThumbnailURL', 'Path', 'BannerImageUrlOWSURLH'],
      settings: [
        {
          key: 'view-name',
          label: 'View Name',
          type: 'dropdown',
          dropdownValues: [
            { key: 'big-tile', label: 'Big Tile' },
            { key: 'sample-card', label: 'Sample Card' }
          ]
        }
      ]
    },
    {
      key: 'another-view',
      displayName: 'Another View',
      viewComponent: SampleView,
      validModes: ['news', 'documents'],
      selectProperties: ['Title', 'Author', 'PictureThumbnailURL', 'Path'],
      settings: [
        {
          key: 'some-text-field',
          label: 'Some Text Field',
          type: 'text'
        }
      ]
    },
    {
      key: 'custom-list-view',
      displayName: 'Custom List View',
      viewComponent: CustomListView,
      validModes: ['listItems'],
      selectProperties: ['DCAPVLDOCUMENTOWNER', 'DCAPVLSTAGE', 'DCAPVLTYPE', 'DCAPVLDOCUMENTID']
    },
    {
      key: 'dc-approvals-list-view',
      displayName: 'DC Approvals List View',
      viewComponent: CustomListView,
      validModes: ['listItems'],
      selectProperties: ['DCAPVLDOCUMENTOWNER', 'DCAPVLSTAGE', 'DCAPVLTYPE', 'DCAPVLDOCUMENTID', 'DCAPVLREQUESTDATE', 'DCAPVLRESPONSEDATE', 'DCAPVLOUTCOME', 'DCAPVLCOMMENTS', 'DCAPVLSUMMARY'],
      settings: [
        {
          key: 'dc-view-id',
          label: 'DC View',
          type: 'dropdown',
          dropdownValues: [
            { key: 'info', label: 'Info' },
            { key: 'details', label: 'Details' },
            { key: 'comments', label: 'Comments' },
          ]
        }
      ]
    }
  ];

  getViews(): ICustomView[] {
    return this.customViews;
  }
}
