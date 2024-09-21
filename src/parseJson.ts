const handleArray = (arrayValue: any[], propertyNames = {}, prefix="res") => {
  for (let [index, ele] of arrayValue.entries()) {
    const newPrefix = `${prefix}.${index}`
    if (typeof ele == "object") {
      if (Array.isArray(ele)) {
        handleArray(ele, propertyNames, newPrefix);
      } else {
        parseJson(ele, propertyNames, newPrefix)
      }
    }
  }
};

type PropertyNames = {
  [key: string]: string[]
}

const parseJson = (jsonInput: any, propertyNames: PropertyNames = {}, prefix="res") => {
  const keys = Object.keys(jsonInput);
  propertyNames[prefix] = keys
  
  for (const key of keys) {
    let value = jsonInput[key];
    if (typeof value == "object") {
      if (Array.isArray(value)) {
        handleArray(value, propertyNames, `${prefix}.${key}`);
      } else {
        parseJson(value, propertyNames, `${prefix}.${key}`);
      }
    }
  }

  return propertyNames;
};

export const getFormattedJson = (jsonInput: string, htmlReplacement: (prefix: string, prop: string) => string) => {
  try {
    if (!jsonInput){
      return [null, null]
    }
    const object = JSON.parse(jsonInput);
    let resultJson = JSON.stringify(object, null, 2)
    const propertyNames = parseJson(object)

    resultJson = resultJson.replace(/( )(?=\s*(["\D\{\]}]))/g , "&nbsp;")
    resultJson = resultJson.replaceAll('\n', "<br />")

    console.log({
      object,
      propertyNames
    })
    for (let [prefix, property] of Object.entries(propertyNames)){
      for (const prop of property){
        const regex = new RegExp(`"${prop}"( )*:`)
        const htmlEle = htmlReplacement(prefix, prop)
        resultJson = resultJson.replace(regex, htmlEle)
      }
    }

    // const regex = new RegExp(/([\}\]'"]),/g)
    // resultJson = resultJson.replace(regex, ",<br />")

    console.log({resultJson})

    return [resultJson, object]
  } catch (error) {
    // console.log("Can't parse the json ", error)
    return [null, null]
  }
  
}

