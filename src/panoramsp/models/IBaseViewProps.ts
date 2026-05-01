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
  data: IViewData;
  context?: BaseComponentContext;
}