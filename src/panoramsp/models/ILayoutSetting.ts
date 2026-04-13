export interface ILayoutSetting {
  key: string;
  label: string;
  type: 'text' | 'checkbox' | 'dropdown';

  dropdownValues?: {
    key: string;
    label: string;
  }
}
