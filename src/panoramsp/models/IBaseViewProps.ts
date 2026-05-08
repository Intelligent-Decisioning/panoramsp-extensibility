import type { BaseComponentContext } from "@microsoft/sp-component-base";
import type { ISearchResult } from "@pnp/sp/search";

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
}