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

const Language = ({language}) => {
  return (
    <form method="post">
      <div className='card'>
        <p>{ language }</p>
      </div>
    </form>
  )
}


const App = () => {
  return (
    <div>
      <i><h4 id='NorthStar'> NorthStar</h4></i>
      <div className="heading">
        <div className='buttons'><img src="../../alan-frontend-src/left.svg"></img></div>
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
