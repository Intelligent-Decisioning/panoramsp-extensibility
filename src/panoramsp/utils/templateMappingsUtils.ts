import { ITemplateMapping } from "../models/ITemplateMappings";

/** Apply the value from the search result to the mapping value.
 * 
 * @param mapping - The template mapping to apply the value to
 * @param item - The search result item containing the value to apply to the mapping
 * 
 * @return The updated template mapping with the value applied from the search result item
  */
export const getMappingData = (mapping: ITemplateMapping | undefined, item: any): ITemplateMapping => {
  if (!mapping || !item) return {} as ITemplateMapping;

  return {
    ...mapping,
    value: item[mapping.property.key]
  };
};