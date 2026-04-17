import type { BaseComponentContext } from "@microsoft/sp-component-base";
import type { ISearchResult } from "@pnp/sp/search";
import { ICustomTemplateMapping } from "./ICustomTemplateMapping";

export type IViewData = ISearchResult;

export interface IBaseViewProps {
  data: IViewData;
  templateMappings: ICustomTemplateMapping[];
  context: BaseComponentContext;
}