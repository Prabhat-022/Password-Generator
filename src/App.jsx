
import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'
import { } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //useRef hook
  const passwordRef = useRef(null);

  //this is responsible for optimise when anything changes
  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      //Get value in index number so convert in char... apply this

      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    // for select by blur color
    passwordRef.current?.select();

    //for select the certen value
    // passwordRef.current?.setSelectionRange(0, 5);

    //copy password to clipboard
    window.navigator.clipboard.writeText(password)
  }, [password])

  // Anythings changes in all of thems the run the program
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator]);


  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="input_field">
          <input
            value={password}
            type="text"
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button className="copy_btn" onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className="selector">
          <div className="">
            <input type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="">
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => { setNumAllowed((prev) => !prev) }} />
            <label >Number</label>
          </div>
          <div className="">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
