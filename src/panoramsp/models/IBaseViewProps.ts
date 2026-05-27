import type { BaseComponentContext, IReadonlyTheme } from "@microsoft/sp-component-base";
import type { ISearchResult, SortDirection } from "@pnp/sp/search";
import { IModeContext } from "./IModeContext";
import { QueryTransformMode } from "./QueryTransformMode";
import { ISelectionContext } from "./ISelectionContext";

/**
 * Data that is passed to the view to render. This is usually a collection of items.
 */
export type IViewData = ISearchResult[];

/**
 * The base view props that are passed to all views.
 * This can be extended by individual views to include additional properties as needed.
 */
export interface IBaseViewProps {
  /**
   * The page of data to render
   */
  data: IViewData;

  /**
   * The web part context of PanoramSP
   */
  context?: BaseComponentContext;

  /**
   * Disable sharing of items
   */
  disableShare?: boolean;

  /**
   * Disable ability to copy an item URL to clipboard
   */
  disableCopyUrl?: boolean;

  /**
   * The theme of the web part
   */
  theme?: IReadonlyTheme;

  /**
   * Callback function to handle sorting of items.
   * This callback is passed back into PanoramSP to handle sorting of all items, and the view is responsible for 
   * calling this callback with the appropriate property and direction when a sort action is triggered by the user.
   * @param property The property to sort by
   * @param direction The direction to sort (ascending or descending)
   * @returns void
   */
  onSort?: (property: string, direction: SortDirection) => void;

  /**
   * Callback function to handle query transformations.
   * This callback is passed back into PanoramSP to handle transformations of the query before it is executed.
   * @param query The query string to transform
   * @param transformMode The mode of transformation to apply
   * @param searchString The search string to use in the transformation
   * @returns void
   */
  onQueryTransform?: (query: string, transformMode?: QueryTransformMode, searchString?: string) => void;

  /**
   * The full context of the selected mode for this display
   */
  mode?: IModeContext;

  /**
   * The context of the current selection, including selected items and actions to perform on those items
   */
  selectionContext?: ISelectionContext;

  /** Copies the url of the item to the clipboard.
   * 
   * The PanoramSP webpart is responsible for rendering the copied modal.
    */
  copyUrlToClipboard?: (item: any) => void;

  /** Sets the item to be shared.
   * 
   * The PanoramSP webpart is responsible for rendering the share modal.
   */
  setShareItem?: (item: any) => void;
}