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
    }
  ];

  getViews(): ICustomView[] {
    return this.customViews;
  }
}
