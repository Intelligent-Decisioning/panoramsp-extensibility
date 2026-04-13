import { IPropertyPaneField } from "@microsoft/sp-property-pane";
import { ICustomLayout } from "./ICustomLayout";
import { ICustomView } from "./ICustomView";

/**
 * Represents an extension for PanoramSP
 */
export interface IPanoramSPExtension {

  /**
   * Returns the views that this extension exposes
   */
  getViews(): ICustomView[];

  /**
   * Returns the layouts that this extension exposes
   */
  getLayouts(): ICustomLayout[];

  /**
   * Renders property pane fields from the given custom layout key
   */
  renderPropertyPaneControls(key: string): IPropertyPaneField<unknown>[];
}