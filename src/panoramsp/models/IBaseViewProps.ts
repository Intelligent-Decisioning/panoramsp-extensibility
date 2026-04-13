import type { BaseComponentContext } from "@microsoft/sp-component-base";
import type { ISearchResult } from "@pnp/sp/search";

export type IViewData = ISearchResult;

export interface IBaseViewProps {
  data: IViewData;
  context: BaseComponentContext;
}