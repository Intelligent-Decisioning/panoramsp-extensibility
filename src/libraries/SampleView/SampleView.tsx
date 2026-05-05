import React from "react";
import { IBaseViewProps } from "../../panoramsp/models/IBaseViewProps";
import { SampleCard } from "./SampleCard";
import { BigTileTest } from "./BigTileTest";

export interface ISampleViewProps extends IBaseViewProps {
  MyCustomProperty?: string;
  disableShare?: boolean;
  someTextField?: string;
}

export const SampleView: React.FC<ISampleViewProps> = (props) => {
  return (
    <div>
      <h2>Sample View 😀 🫡</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0px, 1fr))',
      }}>
        {/* {
          props.data.map((item, index) => (
            <SampleCard key={index} dataRow={item} />
          ))
        } */}

        {
          props.data.map((item, index) => (
            <BigTileTest
              key={index}
              title={item.Title || ''}
              author={item.Author || ''}
              //tags={item.Tags ? (item.Tags as string).split(',') : []}
              tags={[]}
              imageUrl={item.PictureThumbnailURL || 'https://via.placeholder.com/300x200'}
              path={item.Path || ''}
            />
          ))
        }
      </div>

    </div>
  );
};