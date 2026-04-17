import type { IDropdownOption } from '@fluentui/react';

export interface ICustomTemplateMapping {
  /**The name of the mapping used in the template */
  name: string;
  /** The type of configuration for the property */
  configType: string;
  /** The property associated with the mapping */
  property: IDropdownOption;
  /** If the value is visible on the template */
  visible: boolean;
  /** If true the value is disabled as the property would never change */
  disabled: boolean;
  /** Display settings for the mapping */
  displaySettings?: ICustomDisplaySettings;
  /** The value of the mapping, converted from the data returned by search from the property */
  value?: string;

  /** The name of the column, used for detailsList template */
  columnName?: string; // Used for detailsList template
  /** If the column is sortable, used for detailsList template */
  sortable?: boolean; // Used for detailsList template
}

export interface ICustomDisplaySettings {
  fontSize?: string;
  fontWeight?: string;
  linesToShow?: number;

  backgroundColor?: string;

  tagsToShow?: number;
}