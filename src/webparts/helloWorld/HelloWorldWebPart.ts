import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'HelloWorldWebPartStrings';
import { HelloWorld } from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { IPanoramSPExtension, PanoramSPExtensibilityManager } from '../../panoramsp';
import { sortBy } from '@microsoft/sp-lodash-subset/lib/index';

export interface IHelloWorldWebPartProps {
  description: string;
  extensions: IPanoramSPExtensionRegistration[];
  selectedViewId: string;
}

interface IPanoramSPExtensionRegistration {
  name: string;
  componentId: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  private extensionManager!: PanoramSPExtensibilityManager;
  private extensions: IPanoramSPExtension[] = [];

  public render(): void {

    const view = this.extensionManager.getViewById(this.properties.selectedViewId);
    const viewSettings = this.getCustomTemplateSettings();

    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        view: view,
        viewProps: viewSettings
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private getCustomTemplateSettings(): Record<string, unknown> {
    const templateSettings: Record<string, unknown> = {};
    if (this.properties.selectedViewId) {
      const view = this.extensionManager.getViewById(this.properties.selectedViewId);
      if (view?.settings) {
        const propertiesRecord: { [key: string]: any } = this.properties;

        for (const setting of view.settings) {
          const propertyKey = `${this.properties.selectedViewId}_${setting.key}`;
          if (propertiesRecord[propertyKey]) {
            templateSettings[setting.key] = propertiesRecord[propertyKey];
          }
        }
      }
    }

    return templateSettings;
  }

  private async loadExtensions(): Promise<void> {
    if (this.properties.extensions && this.properties.extensions.length > 0) {
      const componentIds = this.properties.extensions.map(e => e.componentId);
      this.extensions = await this.extensionManager.loadExtensions(componentIds);

      console.log(`${this.extensions.length} loaded extensions`);
    } else {
      this.extensions = [];
      this.properties.selectedViewId = '';
    }
  }

  private readonly renderExtensionOptions = (): IPropertyPaneField<unknown>[] => {
    const fields: IPropertyPaneField<unknown>[] = [];

    if (this.properties.extensions?.length > 0) {
      const templateOptions: IPropertyPaneDropdownOption[] = [];

      for (const loadedExtension of this.extensions) {
        try {
          const views = loadedExtension.getViews();
          for (const view of views) {
            templateOptions.push({
              key: view.key,
              text: view.displayName
            });
          }
        } catch (error: any) {
          console.warn(`Unable to load custom view: ${error}`);
        }
      }

      const sortedOptions = sortBy(templateOptions, 'key');

      fields.push(
        PropertyPaneDropdown('selectedViewId', {
          label: 'Choose Template',
          options: sortedOptions
        })
      );
    }

    if (this.properties.selectedViewId) {
      // get the options available for this template (if any)
      const view = this.extensionManager.getViewById(this.properties.selectedViewId);
      if (view) {
        const viewSettings = this.extensionManager.renderPropertyPaneControls(view);
        for (const setting of viewSettings) {
          fields.push(setting);
        }
      }
    }

    return fields;
  }

  protected async onInit(): Promise<void> {
    this.extensionManager = this.context.serviceScope.consume(PanoramSPExtensibilityManager.ServiceKey);
    await this.loadExtensions();
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'extensions') {
      this.loadExtensions().then(() => {
        // re-render so we get the templates dropdown populated
        this.context.propertyPane.refresh();
      }).catch(console.warn);
    }

    if (propertyPath === 'selectedViewId') {
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCollectionData('extensions', {
                  key: 'extensions',
                  label: 'Custom Templates',
                  value: this.properties.extensions,
                  manageBtnLabel: 'Manage Extensions',
                  panelHeader: 'Manage Extensions',
                  fields: [
                    {
                      id: 'name',
                      title: 'Name',
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: 'componentId',
                      title: 'ComponentId',
                      type: CustomCollectionFieldType.string
                    }
                  ]
                }),
                ...this.renderExtensionOptions()
              ]
            }
          ]
        }
      ]
    };
  }
}
