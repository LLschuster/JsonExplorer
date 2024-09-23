import {getFormattedJson} from '../src/parseJson'
import jsonInput0 from '../examples/e0.json'

test('Should get correct json field properties based on json string input', () => {
const propertyHtml = () => {
  return (prefix: string, prop: string) => {
    const shtml = `
      <span id="${prefix}.${prop}" class="jsonField" style="color:blue; cursor:pointer">${prop}</span>:`
      .replace("\n", "")
    
    return shtml
  }
}

    const [formattedJson, _parsedJson] = getFormattedJson(JSON.stringify(jsonInput0), propertyHtml())

    console.log(jsonInput0)
    const expectedResult = '{<br />&nbsp;&nbsp;      <span id="res.date" class="jsonField" style="color:blue; cursor:pointer">date</span>:&nbsp;"2021-10-27T07:49:14.896Z",<br />&nbsp;&nbsp;      <span id="res.hasError" class="jsonField" style="color:blue; cursor:pointer">hasError</span>:&nbsp;false,<br />&nbsp;&nbsp;      <span id="res.fields" class="jsonField" style="color:blue; cursor:pointer">fields</span>:&nbsp;[<br />&nbsp;&nbsp;&nbsp;&nbsp;{<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      <span id="res.fields.[0].id" class="jsonField" style="color:blue; cursor:pointer">id</span>:&nbsp;"4c212130",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      <span id="res.fields.[0].prop" class="jsonField" style="color:blue; cursor:pointer">prop</span>:&nbsp;"iban",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      <span id="res.fields.[0].value" class="jsonField" style="color:blue; cursor:pointer">value</span>:&nbsp;"DE81200505501265402568",<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      <span id="res.fields.[0].hasError" class="jsonField" style="color:blue; cursor:pointer">hasError</span>:&nbsp;false<br />&nbsp;&nbsp;&nbsp;&nbsp;}<br />&nbsp;&nbsp;]<br />}'
    expect(formattedJson).toBe(expectedResult)
});