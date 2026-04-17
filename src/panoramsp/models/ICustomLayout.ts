import { ICustomTemplateMapping } from "./ICustomTemplateMapping";
import { ILayoutSetting } from "./ILayoutSetting";

export interface IBaseLayoutProps {

}

export interface ICustomLayout {
  key: string;
  displayName: string;
  settings?: ILayoutSetting[];
  mappings: ICustomTemplateMapping[];
  layoutComponent: React.ReactElement | React.FunctionComponent<IBaseLayoutProps>;
}