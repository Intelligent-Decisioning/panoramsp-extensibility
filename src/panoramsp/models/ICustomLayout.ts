import { ILayoutSetting } from "./ILayoutSetting";

export interface IBaseLayoutProps {

}

export interface ICustomLayout {
  key: string;
  displayName: string;
  settings?: ILayoutSetting[];
  layoutComponent: React.ReactElement | React.FunctionComponent<IBaseLayoutProps>;
}