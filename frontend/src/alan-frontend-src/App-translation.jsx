import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    <div className='card'>
      <p>{ language }</p>
    </div>
  )
}


const App = () => {
  return (
    <div>
      <i><h4 id='NorthStar'> NorthStar</h4></i>
      <div className="heading">
        <div className='buttons'><img src="src/assets/left.svg"></img></div>
        <h1>AI Document Translation & Analyzer Tool</h1>
      </div>
      <div id="boxes">
        <div className='textbox'>
            <div id='box-header'>
              <h1><div id='h1inbox'>Translated Text</div></h1>
              <div className='buttons' style={{width: "230px", height: "54.95px", marginRight: "10px"}}>
                <img id="expand"src="src/assets/expand.svg"></img>
                <b><p>See original text</p></b>
              </div>
            </div>
            <div>
              <p id="pinbox">Singapore Management University (SMU) adalah universitas ternama di Singapura yang dikenal dengan kurikulumnya bergaya Amerika, pendekatan interdisipliner yang kuat, serta relevansinya dengan dinamika kota global. 

    Pada Desember 2022, SMU memperluas jangkauannya ke kawasan regional dengan meluncurkan pusat luar negeri pertamanya di Jakarta, Indonesia — yaitu SMU Overseas Centre Jakarta (OCJ). 

    Pusat ini bertujuan untuk memperkuat kerja sama akademik dan profesional melalui pertukaran pengetahuan, riset kolaboratif, serta program pembelajaran sepanjang hayat, sekaligus menjalin hubungan yang lebih erat antara institusi, pembuat kebijakan, komunitas bisnis Indonesia, dan berbagai sekolah maupun institusi di SMU. Singapore Management University (SMU) adalah universitas ternama di Singapura yang dikenal dengan kurikulumnya bergaya Amerika, pendekatan interdisipliner yang kuat, serta relevansinya dengan dinamika kota global. Pada Desember 2022, SMU memperluas jangkauannya ke kawasan regional dengan meluncurkan pusat luar negeri pertamanya di Jakarta, Indonesia — yaitu SMU Overseas Centre Jakarta (OCJ). Pusat ini bertujuan untuk memperkuat kerja sama akademik dan profesional melalui pertukaran pengetahuan, riset kolaboratif, serta program pembelajaran sepanjang hayat, sekaligus menjalin hubungan yang lebih erat antara institusi, pembuat kebijakan, komunitas bisnis Indonesia, dan berbagai sekolah maupun institusi di SMU.Singapore Management University (SMU) adalah universitas ternama di Singapura yang dikenal dengan kurikulumnya bergaya Amerika, pendekatan interdisipliner yang kuat, serta relevansinya dengan dinamika kota global. 

    Pada Desember 2022, SMU memperluas jangkauannya ke kawasan regional dengan meluncurkan pusat luar negeri pertamanya di Jakarta, Indonesia — yaitu SMU Overseas Centre Jakarta (OCJ). 

    Pusat ini bertujuan untuk memperkuat kerja sama akademik dan profesional melalui pertukaran pengetahuan, riset kolaboratif, serta program pembelajaran sepanjang hayat, sekaligus menjalin hubungan yang lebih erat antara institusi, pembuat kebijakan, komunitas bisnis Indonesia, dan berbagai sekolah maupun institusi di SMU. Singapore Management University (SMU) adalah universitas ternama di Singapura yang dikenal dengan kurikulumnya bergaya Amerika, pendekatan interdisipliner yang kuat, serta relevansinya dengan dinamika kota global. Pada Desember 2022, SMU memperluas jangkauannya ke kawasan regional dengan meluncurkan pusat luar negeri pertamanya di Jakarta, Indonesia — yaitu SMU Overseas Centre Jakarta (OCJ). Pusat ini bertujuan untuk memperkuat kerja sama akademik dan profesional melalui pertukaran pengetahuan, riset kolaboratif, serta program pembelajaran sepanjang hayat, sekaligus menjalin hubungan yang lebih erat antara institusi, pembuat kebijakan, komunitas bisnis Indonesia, dan berbagai sekolah maupun institusi di SMU.</p>
            </div>
          </div>
          <div id="greater-summary">
            <div className="textbox" id="summary">
              <div id='box-header'>
                <h1><div id='h1inbox'>Summary</div></h1>
              </div>
              <div className="chat-ai">
                Salary
  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.

  Working hours
  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.

  Weekend policy
  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
              </div>
              <div className="chat-user" style={{color: "#EAEFEF"}}>
                I want to ask something.
              </div>
            </div>
            <div className="chatbox">
              <img src="src/assets/search.svg" id="search"></img>
              Lorem ipsum dolor sit amet.
            </div>
          </div>
      </div>
    </div>
  )
}


export default App
