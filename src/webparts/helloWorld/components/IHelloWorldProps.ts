import { ICustomView } from "../../../panoramsp";

export interface IHelloWorldProps {
  view?: ICustomView;
  viewProps?: Record<string,unknown>;
}
