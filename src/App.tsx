import 'react'
import { useEffect, useState } from 'react'
import { useJsonExplorer } from './UseJsonExplorer'
import "./main.css"


export const JsonExplorer = () => {
    const [selectedProp, setSelectedProp] = useState("")
    const {formattedJson, getPropertyValue, setJsonData, jsonData, valueOfSelectedProp} = useJsonExplorer()

    useEffect(() => {
        const elements = document.getElementsByClassName("jsonField")
        for (const ele of elements){
            ele.addEventListener("click", () => {
                console.log("click property")
                setSelectedProp(ele.id)
                getPropertyValue(ele.id)
            })
        }
    }, [formattedJson])

    return (
        <>        
            <header>
        <h1>JsonExplorer</h1>
    </header>
    
    
    <main>
        <section id="container">
            <div className='input-container'>
            <label htmlFor="property">Property</label>
            <input name='property' type='text' value={selectedProp} onChange={(e) => {
                setSelectedProp(e.target.value)
                getPropertyValue(e.target.value)
            }} />
            <p>{valueOfSelectedProp}</p>
            </div>
            <div contentEditable id="jsonInput" dangerouslySetInnerHTML={{__html: formattedJson}} onInput={(e) => {
                setJsonData(e.currentTarget.textContent ?? "")
            }}></div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 JsonExplorer.</p>
    </footer>
        </>
    )
}

