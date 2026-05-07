import React from "react";
import type { ISearchResult } from "@pnp/sp/search";

export interface ISampleViewProps {
 dataRow: ISearchResult;
}

export const SampleCard: React.FC<ISampleViewProps> = (props) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      <h3>{props.dataRow.Title}</h3>
    </div>
  );
};