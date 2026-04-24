import React from "react";
import { Mode } from "./modes";
import { ILayoutSetting } from "./ILayoutSetting";
import { ICustomTemplateMapping } from "./ICustomTemplateMapping";

export interface ICustomView {
  key: string;
  displayName: string;
  viewComponent: React.ElementType;
  validModes: Mode[];
  settings?: ILayoutSetting[];
  mappings: ICustomTemplateMapping[];
}