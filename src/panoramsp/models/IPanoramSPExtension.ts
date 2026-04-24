import { ICustomLayout } from "./ICustomLayout";
import { ICustomView } from "./ICustomView";

/**
 * Represents an extension for PanoramSP
 */
export interface IPanoramSPExtension {

  /**
   * This uniquely identifies this extension
   */
  extensionId: string;

  /**
   * Returns the views that this extension exposes
   */
  getViews(): ICustomView[];

  /**
   * Returns the layouts that this extension exposes
   */
  getLayouts(): ICustomLayout[];
}