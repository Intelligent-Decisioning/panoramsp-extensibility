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

  /**
   * Loads the extensions that are exposed in the given components.
   * @param componentIds
   * @returns 
   */
  public async loadExtensions(componentIds: string[]): Promise<IPanoramSPExtension[]> {
    this.extensions = [];

    for (const componentId of componentIds) {
      try {
        const component = await SPComponentLoader.loadComponentById(componentId) as any;

        // Check the component, look at what's exported, and if we find an exported module that matches the prototype methods of 
        // IPanoramSPExtension, then we have a match, and we can pop that into the array to return

        const exportedKeys = Object.keys(component).filter(prop => {

          const extenPrototype: IPanoramSPExtension = component[prop].prototype;
          if (extenPrototype && Object.hasOwn(extenPrototype, "getViews")) {
            return true;
          }
        });

        if (exportedKeys.length === 0) {
          console.warn(`PanoramSP: The provided extensionId: '${componentId}' does not appear to export any instances of IPanoramSPExtension`);
        }

        for (const key of exportedKeys) {
          const extension = new component[key]();
          this.extensions.push(extension);
        }
      }
      catch (err: any) {
        console.error(`PanoramSP: Error attempting to load extension by Id: '${componentId}' - ${err.message}`);
      }
    }

    if (this.extensions.length === 0) {
      console.warn(`PanoramSP: None of the provided extension IDs appear to export any instances of IPanoramSPExtension.`);
    }

    return this.extensions;
  }

  /**
   * 
   * @param layout Render the custom controls for the custom view
   * @param webPartProperties The web part properties, used to set the current value for each control
   * @param editedTabId The currently edited tab
   * @returns The property pane fields for the custom view
   */
  public renderPropertyPaneControls(layout: ICustomView, webPartProperties: Record<string, unknown>, editedTabId?: string): IPropertyPaneField<unknown>[] {
    if (!layout || !layout.settings) {
      return [];
    }

    const fields: IPropertyPaneField<unknown>[] = [];

    for (const setting of layout.settings) {
      let settingKey = `${layout.key}_${setting.key}`;
      let currentValue = webPartProperties[settingKey];

      if (editedTabId) {
        settingKey = `${editedTabId}|${settingKey}`;

        // Grab the existing value from the tab
        for (const tab of webPartProperties.tabs as Record<string, unknown>[]) {
          if (tab.uniqueId === editedTabId) {
            currentValue = tab[`${layout.key}_${setting.key}`];
            break;
          }
        }
      }

      switch (setting.type) {
        case 'checkbox': {
          fields.push(PropertyPaneCheckbox(settingKey, {
            text: setting.label,
            checked: !!currentValue
          }));
          break;
        }

        case 'text': {
          fields.push(PropertyPaneTextField(settingKey, {
            label: setting.label,
            value: currentValue ? String(currentValue) : ''
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
            }),
            selectedKey: currentValue ? String(currentValue) : undefined
          }));
          break;
        }

        default:
          console.warn(`PanoramSP: Unknown Setting Type: '${setting.type}' for setting '${setting.key}'`);
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

    console.warn(`PanoramSP: View with id '${viewId}' was not found in the loaded extensions`);
  }
}