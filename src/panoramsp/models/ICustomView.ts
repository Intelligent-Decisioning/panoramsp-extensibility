import React from "react";
import { IBaseViewProps } from "./IBaseViewProps";
import { Mode } from "./modes";
import { ILayoutSetting } from "./ILayoutSetting";
import { ICustomTemplateMapping } from "./ICustomTemplateMapping";

export interface ICustomView {
  key: string;
  displayName: string;
  viewComponent: React.ReactElement | React.FunctionComponent<IBaseViewProps>;
  validModes: Mode[];
  settings?: ILayoutSetting[];
  mappings: ICustomTemplateMapping[];
}