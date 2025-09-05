// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// Class Components
// class ClassComponent extends React.Component {
//   render() {
//     return <h2>Class Component</h2>
//   }
// }

// function App() {} // to create components OR


// const Card = ({ title }) => { // in javascript instead of background-color for styles, u use backgroundColor
//   return (
//     <div className="card">
//     <h2>{ title }</h2>
//     </div>
//   )
// }

// const App = () => {
//   return (
//     <div className="card-container">
//     {/* <h2>Functional Arrow Component</h2> */}
//     <Card title="Star Wars" rating={5} isCool={true}/>
//     <Card title="Avatar" />
//     <Card title="The Lion King" />
//     </div>
//   )
// } // use arrow components
// props or properties are a way to pass data from one component to the other (arguments passed to a function)

import {useEffect, useState} from "react";
import searchIcon from "/Users/lenov/OneDrive/Documents/GitHub/northstar-hama-techseries-2025/frontend/src/assets/change-language-translation-assets/search.svg";
import leftIcon from "/Users/lenov/OneDrive/Documents/GitHub/northstar-hama-techseries-2025/frontend/src/assets/change-language-translation-assets/left.svg";
import expandIcon from "/Users/lenov/OneDrive/Documents/GitHub/northstar-hama-techseries-2025/frontend/src/assets/change-language-translation-assets/expand.svg";

// the page is meant to be viewed in 1440 x 1080 aspect ratio.

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  }
  const [translated, setTranslated] = useState("");

  const handleTranslate = async () => {
    try {
        const response = await fetch("http://localhost:8000/", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("Data from backend:", data);
        setTranslated(data.message);
      } catch (err) {
        console.error("Error fetching:", err);
        setTranslated("Error loading message");
      }
  }

  useEffect(() => {handleTranslate()}, [])

  return (
    <div>
      <i><h4 id='NorthStar'> NorthStar</h4></i>
      <div className="heading">
        <form method="post" action="index.html"><button className='buttons'><img src={leftIcon}></img></button></form>
        <h1>AI Document Translation & Analyzer Tool</h1>
      </div>
      <div id="boxes">
        <div className='textbox'>
            <div id='box-header'>
              <h1><div id='h1inbox'>Translated Text</div></h1>
              <div className='buttons' style={{width: "230px", height: "54.95px", marginRight: "10px"}}>
                <img id="expand"src={expandIcon}></img>
                <b><p>See original text</p></b>
              </div>
            </div>
            <div>
              <p id="pinbox">{translated}</p>
            </div>
          </div>
          <div id="greater-summary">
            <div className="textbox" id="summary">
              <div id='box-header'>
                <h1><div id='h1inbox'>Summary</div></h1>
              </div>
              <p className="chat-ai">{translated}</p> 
              {/* take a look on line 97, change translated into an appropriate form */}
              {messages.map((msg, idx) => (
                <p key={idx} className="chat-user">{msg}</p>
              ))}
            </div>
            <div className="chatbox">
              <form onSubmit={handleSend} method="post">
                <button type="Submit" style={{width: "150px", height: "54.95px", marginRight: "10px"}} className="buttons">
                    <img id="expand"src={searchIcon}></img>
                    <b><p>Search</p></b>
                </button>
                <textarea id="textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                style={{width: "350px", height: "50px", border:"0px", outline:"none", display:"flex", alignItems:"start", justifyContent:"start", backgroundColor:"#FAFFFC", margin:"0px", fontSize:"30px"}}
                />
              </form>
            </div>
          </div>
      </div>
    </div>
  )
}


export default App