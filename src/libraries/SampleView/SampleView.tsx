import React from "react";
import { IBaseViewProps } from "../../panoramsp/models/IBaseViewProps";

export interface ISampleViewProps extends IBaseViewProps {
  MyCustomProperty?: string;
  disableShare?: boolean;
  someTextField?: string;
}

export const SampleView: React.FC<ISampleViewProps> = (props) => {
  return (
    <div>
      <h2>Sample View</h2>
      <p>My Custom Property: {props.MyCustomProperty}</p>
      <p>Disable Share: {props.disableShare ? "Yes" : "No"}</p>
      <p>Some Text Field: {props.someTextField}</p>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};