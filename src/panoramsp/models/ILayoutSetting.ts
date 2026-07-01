/**
 * Represents a custom setting for a layout in the PanoramSP extensibility framework. These settings are defined by extensions and can be configured by users in the property pane when a view is selected.
 */
export interface ILayoutSetting {
  /**
   * A unique identifier for the setting. This is used to reference the setting when configuring the view.
   */
  key: string;

  /**
   * A display name for the setting. This is shown to users in the property pane.
   */
  label: string;

  /**
   * The type of the setting. This determines how the setting is rendered in the property pane.
   */
  type: 'text' | 'checkbox' | 'dropdown' | 'range' | 'collectionField';

  /**
   * The values for a dropdown setting. This is only used if the type is 'dropdown'.
   */
  dropdownValues?: {
    key: string;
    label: string;
  }[];

  /**
   * When a range is used as the type, this is the minimum value for the range. This is only used if the type is 'range'.
   */
  rangeMin?: number;

  /**
   * When a range is used as the type, this is the maximum value for the range. This is only used if the type is 'range'.
   */
  rangeMax?: number;

  /** The fields for the custom collection control. Fields are always string values. */
  collectionFields?: {
    id: string;
    title: string;
    defaultValue: string;
  }[];

  /** The label for the button that opens the collection control panel. */
  collectionButtonLabel?: string;
}
