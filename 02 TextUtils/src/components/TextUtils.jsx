import React, { useState } from 'react'

export default function TextUtils(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!!","success");
        setTimeout(() => {
            props.showAlert(null)
        }, 1500)
    }
    const handleLoClick = () => {
        let newText1 = text.toLowerCase();
        setText(newText1)
        props.showAlert("Converted to lowercase!!","success");
        setTimeout(() => {
            props.showAlert(null)
        }, 1500)
    }
    const handleCaClick = () => {
        setText((prevText) => {
            // Capitalize the first letter of each word
            return prevText.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        });
        props.showAlert("Converted to capitalize!!","success");
        setTimeout(() => {
            props.showAlert(null)
        }, 1500)
    }
    const handleChange = (e) => {
        setText(e.target.value)
    }
    let [text, setText] = useState('');
  return (
    <>
        <div className="my-5">
            <h1>Text Case Converter</h1>
            <textarea className="form-control mb-3" placeholder='Exnter your text here...' value={text} onChange={handleChange} id="exampleFormControlTextarea1" rows="8"></textarea>
            <button disabled={text.length===0}className='btn btn-primary me-2 mb-2' onClick={handleUpClick}>Convert to uppercase</button>
            <button disabled={text.length===0}className="btn btn-secondary me-2 mb-2" onClick={handleLoClick}>Convert to lowercase</button>
            <button disabled={text.length===0}className="btn btn-success me-2 mb-2" onClick={handleCaClick}>Convert to capitalize</button>
        </div>
        <h2>Text Summary</h2>
        <p>{text.split(' ').filter((element)=>{ return  element.length!==0}).length} words and {text.length} characters</p>
    </>
  )
}
