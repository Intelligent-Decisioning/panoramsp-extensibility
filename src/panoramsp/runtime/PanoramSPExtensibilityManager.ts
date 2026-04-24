import { ICustomView, IPanoramSPExtension } from "../models";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { IPropertyPaneField, PropertyPaneCheckbox, PropertyPaneDropdown, PropertyPaneTextField } from "@microsoft/sp-property-pane";

export const PanoramSPExtensibility_ServiceKey = "IDPanoramSPExtn_SK";

export class PanoramSPExtensibilityManager {
  private extensions: IPanoramSPExtension[] = [];

  public static ServiceKey: ServiceKey<PanoramSPExtensibilityManager> = ServiceKey.create(PanoramSPExtensibility_ServiceKey, PanoramSPExtensibilityManager);


  constructor(private serviceScope: ServiceScope) {

  }

  public async loadExtensions(componentIds: string[]): Promise<IPanoramSPExtension[]> {
    this.extensions = [];

    for (const componentId of componentIds) {

      const component = await SPComponentLoader.loadComponentById(componentId) as any;

      // Check the component, look at what's exported, and if we find an exported module that matches the prototype methods of 
      // IPanoramSPExtension, then we have a match, and we can pop that into the array to return

      const exportedKeys = Object.keys(component).filter(prop => {

        const extenPrototype: IPanoramSPExtension = component[prop].prototype;
        if (extenPrototype && Object.hasOwn(extenPrototype, "getViews")) {
          return true;
        }
      });

      for (const key of exportedKeys) {

        const extension = new component[key]();
        this.extensions.push(extension);
      }
    }

    return this.extensions;
  }

  public renderPropertyPaneControls(layout: ICustomView): IPropertyPaneField<unknown>[] {
    if (!layout || !layout.settings) {
      return [];
    }

    const fields: IPropertyPaneField<unknown>[] = [];

    for (const setting of layout.settings) {
      const settingKey = `${layout.key}_${setting.key}`;

      switch (setting.type) {
        case 'checkbox': {
          fields.push(PropertyPaneCheckbox(settingKey, {
            text: setting.label
          }));
          break;
        }

        case 'text': {
          fields.push(PropertyPaneTextField(settingKey, {
            label: setting.label
          }));
          break;
        }

        case 'dropdown': {
          fields.push(PropertyPaneDropdown(settingKey, {
            label: setting.label,
            options: setting.dropdownValues?.map(v => {
              return {
                key: v.key,
                text: v.label
              }
            })
          }));
          break;
        }
      }
    }

    return fields;
  }

  public getViewById(viewId: string): ICustomView | undefined {
    for (const extension of this.extensions) {
      const views = extension.getViews();
      for (const view of views) {
        if (view.key === viewId) {
          return view;
        }
      }
    }
  }
}