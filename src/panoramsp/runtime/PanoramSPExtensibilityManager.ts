import { IPanoramSPExtension } from "../models";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";

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
        return prop && (
          extenPrototype.getViews || extenPrototype.getLayouts
        );
      });

      for (const key of exportedKeys) {
        this.extensions.push(component[key]);
      }
    }

    return this.extensions;
  }
}