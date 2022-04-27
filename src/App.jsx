import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import {Footer, Header, Main, Input} from "./components/index"

import React from 'react';
import './index.css'

const App = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://yay-api.herokuapp.com/api")
      .then((res) => {
        if (res.ok){
          return res.json()
        }
      }
        )
      .then((data) => setData(data.message));
      console.log('fetched data');
  }, []);

  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <h1 className='mt-10 h-20 w-100 font-medium mt underline leading-tight text-5xl mb-2 text-blue-700' >You & Yours</h1>
      <h6 className= 'font-medium leading-tight text-base text-blue-700 d'>Gift meaningfully</h6>
    </div> 
    <div className="App justify-center w-full">
        <Input/>
    </div>
    </>
  );
}

export default App;
  
