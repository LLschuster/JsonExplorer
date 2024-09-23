type PropertyNames = {
  [key: string]: string[];
};

const handleArray = (arrayValue: any[], propertyNames = {}, prefix = "res") => {
  for (let [index, ele] of arrayValue.entries()) {
    const newPrefix = `${prefix}.[${index}]`;
    if (typeof ele == "object") {
      if (Array.isArray(ele)) {
        handleArray(ele, propertyNames, newPrefix);
      } else {
        parseJsonProperties(ele, propertyNames, newPrefix);
      }
    }
  }
};

const parseJsonProperties = (
  jsonInput: any,
  propertyNames: PropertyNames = {},
  prefix = "res"
) => {
  const keys = Object.keys(jsonInput);
  propertyNames[prefix] = keys;

  for (const key of keys) {
    let value = jsonInput[key];
    if (typeof value == "object") {
      if (Array.isArray(value)) {
        handleArray(value, propertyNames, `${prefix}.${key}`);
      } else {
        parseJsonProperties(value, propertyNames, `${prefix}.${key}`);
      }
    }
  }

  return propertyNames;
};

/**
 * 
 * @param jsonInput 
 * @param htmlReplacement: function that returns custom html component to replace for the json property names.
 * @returns [formatted json string, parsed json as javascript object]
 */
export const getFormattedJson = (
  jsonInput: string,
  htmlReplacement: (prefix: string, prop: string) => string
): [string | null, any | null] => {
  try {
    if (!jsonInput) {
      return [null, null];
    }
    const object = JSON.parse(jsonInput);
    let resultJson = JSON.stringify(object, null, 2);
    const propertyNames = parseJsonProperties(object);

    resultJson = resultJson.replace(/( )(?=\s*(["\D\{\]}]))/g, "&nbsp;"); // add identation to final html
    resultJson = resultJson.replaceAll("\n", "<br />"); // add new lines to final html

    for (let [prefix, property] of Object.entries(propertyNames)) {
      for (const prop of property) {
        const regex = new RegExp(`"${prop}"( )*:`);
        const htmlEle = htmlReplacement(prefix, prop);
        resultJson = resultJson.replace(regex, htmlEle);
      }
    }

    return [resultJson, object];
  } catch (error) {
    return [null, null];
  }
};
