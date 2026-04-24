import React from "react";
import { IBaseViewProps } from "../../panoramsp/models/IBaseViewProps";

export interface ISampleViewProps extends IBaseViewProps {
  MyCustomProperty?: string;
}

export const SampleView: React.FC<ISampleViewProps> = (props) => {
  return (
    <div>
      <h2>Sample View</h2>
      <pre>{JSON.stringify(props.data, null, 2)}</pre>
    </div>
  );
};