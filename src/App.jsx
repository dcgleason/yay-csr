import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import {Footer, Header, Main, Input } from "./components/index"
import React from 'react';
import './index.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const App = () => {
const [secret, setSecret] = useState(null);
const stripePromise = loadStripe('pk_test_51KtCf1LVDYVdzLHCzEQuGuw08kKelgXO7AgN6VDN874gIPxfr7dl7PvcNgUZUSnypEOxqJcMCu4G119l0MQixCkj00Rr1fOuls');

useEffect(() => {
const getClientSecret = async () => {
const response =  await fetch('https://yay-api.herokuapp.com/secret').then(res => res.json());
console.log('response: '+ JSON.stringify(response));
const data = JSON.stringify(response);
const {client_secret} = JSON.parse(data);
console.log('JSON.parse(Data): ' + JSON.parse(data))
console.log('client secret: ' + client_secret)
setSecret(client_secret)
}

getClientSecret();

}, []);


const options = {
  client_secret: secret
}

  return (
    <>
    <div className="flex flex-col items-center justify-center">
      <h1 className='mt-10 h-20 w-100 font-medium mt underline leading-tight text-5xl mb-2 text-blue-700' >You & Yours</h1>
      <h6 className= 'font-medium leading-tight text-base text-blue-700 d'>Gift meaningfully</h6>
    </div> 
    <div className="App justify-center w-full">
    <Elements  stripe={stripePromise} options={options}>
        <Input/>
     </Elements>
       
    </div>
    </>
  );
}

export default App;
  
