import { useEffect, useState } from "react"
import { getFormattedJson } from "./parseJson"

const propertyHtml = () => {
  return (prefix: string, prop: string) => {
    const shtml = `
      <span id="${prefix}.${prop}" class="jsonField" style="color:blue; cursor:pointer">${prop}</span>:`
      .replaceAll("\n", "")
    
    return shtml
  }
}

type UseJsonExplorerReturn = {
formattedJson: string, 
getPropertyValue: (propertyPath: string) => any, 
setJsonData: React.Dispatch<React.SetStateAction<string>>,
jsonData: string
valueOfSelectedProp: string
}

/**
 * 
 * useJsonExplorer is a custom hook that handles the formatting and parsing of the json input
 * also the ability to interact with it.
 */
export const useJsonExplorer = (): UseJsonExplorerReturn => {
  const [jsonObject, setJsonObject] = useState<any>()
  const [jsonData, setJsonData] = useState<string>("")
  const [formattedJson, setFormattedJson] = useState<string>("")
  const [valueOfSelectedProp, setValueOfSelectedProp] = useState("")

  useEffect(() => {
    const htmlReplacement = propertyHtml()
    const [formattedJson, jsonObject] = getFormattedJson(jsonData, htmlReplacement)
    if (!formattedJson || !jsonObject) return

    setJsonObject(jsonObject)
    setFormattedJson(formattedJson)
    console.log({formattedJson})
  }, [jsonData])

  /**
   * 
   * @param propertyPath. string used to get value on parsed json.  
   * Example "res.fields.0.value" refers to json[fields][0][value]
   * @returns value of json property based on the property path provided
   */
  const getPropertyValue = (propertyPath: string) => {
    const parts = propertyPath.split('.').slice(1)
    let value: any = jsonObject

    for (const part of parts){
        if (!value || !part) continue
        if (part.startsWith("[") && part.endsWith("]")){
          value = value[part.slice(1, part.length - 1)]
          continue
        }
        value = value[part]
    }

    if (typeof value == "object"){
        if (Array.isArray(value)){
          
            value = `array of ${value.length} values: [${value[0].toString().substring(0, 10)}...]`
        } else {
            value = `json object with props: ${Object.keys(value)}`
        }
    } else if (typeof value == "boolean") {
        value = value.toString()
    }

    setValueOfSelectedProp(value)
    return value;
  }

  return {formattedJson, getPropertyValue, setJsonData, jsonData, valueOfSelectedProp}
}
