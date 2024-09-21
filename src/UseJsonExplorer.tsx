import { useEffect, useState } from "react"
import { renderToString } from 'react-dom/server'
import { getFormattedJson } from "./parseJson"

const propertyHtml = (getPropertyName: (p: string) => string) => {
  return (prefix: string, prop: string) => {
      const html = (
      <span style={{ color: 'blue' }} onClick={() => {
      console.log(prefix, prop)
      getPropertyName(prefix + '.' + prop)
      }}>{prop}</span>
    )

    const shtml = `
      <span id="${prefix}.${prop}" class="jsonField" style="color:blue; cursor:pointer">${prop}</span>:`
      .replaceAll("\n", "")
    
    console.log(shtml, '<<>> ', renderToString(html))

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
export const useJsonExplorer = (): UseJsonExplorerReturn => {
  const [jsonObject, setJsonObject] = useState<any>()
  const [jsonData, setJsonData] = useState<string>("")
  const [formattedJson, setFormattedJson] = useState<string>("")
  const [valueOfSelectedProp, setValueOfSelectedProp] = useState("")

  useEffect(() => {
    const htmlReplacement = propertyHtml(getPropertyValue)
    const [formattedJson, jsonObject] = getFormattedJson(jsonData, htmlReplacement)
    if (!formattedJson || !jsonObject) return

    setJsonObject(jsonObject)
    setFormattedJson(formattedJson)
  }, [jsonData])

  const getPropertyValue = (propertyPath: string) => {
    console.log("sjkdfsdjkfhsjkdh")
    const parts = propertyPath.split('.').slice(1)
    let value: any = jsonObject

    console.log("getPropertyValue ", parts, value)
    for (const part of parts){
        value = value[part]
    }

    if (typeof value == "object"){
        if (Array.isArray(value)){
            value = "array of values"
        } else {
            value = "json object"
        }
    } else if (typeof value == "boolean") {
        value = value.toString()
    }

    setValueOfSelectedProp(value)
    return value;
  }

  return {formattedJson, getPropertyValue, setJsonData, jsonData, valueOfSelectedProp}
}
