export interface ISelectionContext {
  /**Currently selected items */
  selectedItems: SelectableEntity[];
  /** Called when an item is selected */
  onSelectItem: (item: SelectableEntity) => void;
  /** Called when an item is deselected */
  onDeSelectItem: (item: SelectableEntity) => void;
  /** Clears the current selection */
  clearSelection: () => void;

  /** Used to hide the multi select download controls when only downloading single item */
  singleSelect: boolean;
  singleSelectItem: (item: SelectableEntity) => void;

  /** Downloading in progress */
  downloading?: boolean;
  /** Used to display the image size modal when downloading images  */
  imageSizeModalOpen?: boolean;
  /** Used to open or close the image size modal */
  openImageSizeModal: (open: boolean) => void;

  /** Used to indicate to the user that the copy operation was successful */
  copyModalOpen?: boolean;

  /** Called when downloading images */
  downloadImages: (imgWidth?: number, imgHeight?: number) => Promise<any>;
  /** Called when downloading non-image files */
  downloadItems: (items?: SelectableEntity[]) => Promise<any>;
  /** Called when downloading event files */
  downloadEvents: (items?: SelectableEntity[]) => Promise<void>;
  /** Called when opening the copy modal */
  openCopyModal: () => void;

  /**
 * Future unknown values
 */
  [key: string]: unknown;
}

export interface ISelectableItem {
  id: string | number;
  link: string;
  title: string;
  size: string;
}

export type SelectableEntity = any;