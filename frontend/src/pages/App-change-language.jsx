// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import '../App.css'

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

import leftIcon from "/Users/lenov/OneDrive/Documents/GitHub/northstar-hama-techseries-2025/frontend/src/assets/change-language-translation-assets/left.svg";

// the page is meant to be viewed in 1440 x 1080 aspect ratio.

const Language = ({language}) => {
  return (
    <form method="post" action="index.html">
      <button className='card'>
        <p>{ language }</p>
      </button>
    </form>
  )
}


const App = () => {
  return (
    <div>
      <i><h4 id='NorthStar'> NorthStar</h4></i>
      <div className="heading">
        <form action="index.html" method="post"><button className='buttons'><img src={leftIcon}></img></button></form>
        <h1>Change Language</h1>
      </div>
      <div className='languages'>
        <Language language="English"/>
        <Language language="Bahasa Indonesia"/>
        <Language language="Tagalog"/>
        <Language language="Melayu"/>
        <Language language="Hindi"/>
        <Language language="Bangla"/>
      </div>
    </div>
  )
}


export default App
