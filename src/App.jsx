
import logo from './logo.svg'
import './App.css'
import { Input, Front } from "./components/index"
import React from 'react';
import './index.css'


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const App = () => {

  return (
    <>
    <Front/>

    {/* <div className="flex flex-col items-center justify-center">
      <h1 className='mt-10 h-20 w-100 font-medium mt underline leading-tight text-5xl mb-2 text-blue-700' >You & Yours</h1>
      <h6 className= 'font-medium leading-tight text-base text-blue-700 d'>Gift meaningfully</h6>
    </div> 
    <div className="App justify-center w-full">
     <Elements  stripe={stripePromise} options={options}>
       <Input/>
     </Elements>    
    </div> */}
    </>
  );
}

export default App;
  
