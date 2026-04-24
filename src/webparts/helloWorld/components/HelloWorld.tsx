import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';
import { ISampleViewProps } from '../../../libraries/SampleView/SampleView';

export const HelloWorld: React.FC<IHelloWorldProps> = (props) => {

  const getViewComponent = (): React.ReactElement<ISampleViewProps> | null => {
    if (props.view) {
      const ViewComponent = props.view.viewComponent as React.ElementType;

      if (props.viewProps) {
        const propsOb: Record<string, any> = {}
        for (const prop in props.viewProps) {
          if (!prop) continue;
          // By convention, the name of the prop is in the format "some-setting", but 
          // we need to convert it to "someSetting" to pass it to the view component
          const propName = prop.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
          propsOb[propName] = props.viewProps[prop];
        }

        return <ViewComponent {...propsOb} MyCustomProperty="Some value" />;
      }
    }
    return null;
  }

  return (
    <div className={styles.helloWorld}>

      {
        getViewComponent()
      }
    </div>
  );
};