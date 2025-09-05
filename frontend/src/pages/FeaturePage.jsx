<<<<<<< HEAD
import {React, useEffect, useState, useNavigate, useLocation} from 'react';

const FeaturePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => {
    if (state?.parsed) return state.parsed;
    const saved = localStorage.getItem('parsedDoc');
    return saved ? JSON.parse(saved) : null;
  }, [state]);

  if (!parsed) {
    navigate('/', { replace: true });
    return null;
  }
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
              <p id="pinbox">
                {state?.parsed}
              </p>
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

=======
import React, { useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const FeaturePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => {
    if (state?.parsed) return state.parsed;
    const saved = localStorage.getItem('parsedDoc');
    return saved ? JSON.parse(saved) : null;
  }, [state]);

  if (!parsed) {
    navigate('/', { replace: true });
    return null;
  }
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
              <p id="pinbox">
                {state?.parsed}
              </p>
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

>>>>>>> b418ed9 (specify iand fix imports)
export default FeaturePage