import React from "react";
import { Mode } from "./modes";
import { ILayoutSetting } from "./ILayoutSetting";
import { ICustomTemplateMapping } from "./ICustomTemplateMapping";
import { IBaseViewProps } from "./IBaseViewProps";

export interface ICustomView {
  key: string;
  displayName: string;
  viewComponent: React.ElementType<IBaseViewProps>;
  validModes: Mode[];
  settings?: ILayoutSetting[];
  mappings: ICustomTemplateMapping[];
}