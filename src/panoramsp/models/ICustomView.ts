import React from "react";
import { Mode } from "./modes";
import { ILayoutSetting } from "./ILayoutSetting";
import { ICustomTemplateMapping } from "./ICustomTemplateMapping";
import { IBaseViewProps } from "./IBaseViewProps";

/**
 * Represents a registered custom view in the PanoramSP extensibility framework.
 * Custom views are defined by extensions and can be rendered in specific modes (e.g., news, documents).
 * Each view has a unique key, a display name, a React component for rendering, and optional settings and template mappings.
 */
export interface ICustomView {
  /**
   * A unique identifier for the view. This is used to reference the view when rendering and configuring it.
   * This is used as the identifier for this view in the PanoramSP web part
   */
  key: string;

  /**
   * A display name for the view. This is shown to users when they are selecting a view to render.
   */
  displayName: string;

  /**
   * The component that is rendered by PanoramSP when this view is selected. This should be a React component that accepts IBaseViewProps as props.
   */
  viewComponent: React.ElementType<IBaseViewProps>;

  /**
   * The modes in which this view is valid. PanoramSP will only show this view as an option if the current mode matches one of the modes specified here.
   */
  validModes: Mode[];

  /**
   * Optional settings that can be configured for this view. These settings will be shown in the property pane when this view is selected, and their values will be passed to the view component as props.
   */
  settings?: ILayoutSetting[];
  
  /**
   * The template mappings for this view. These mappings define how data is transformed and displayed in the view.
   */
  mappings: ICustomTemplateMapping[];
}