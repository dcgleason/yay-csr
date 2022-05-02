import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  PaymentElement,
  Elements,
  CardElement, 
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const Input = (props) => {
  const [emails, setEmail] = useState([ { id: uuidv4(),  email: '' }]);
  const [randomNumber, setRandomNumber] = useState(-1)
  const [name, setName] = useState(['']);
  const [data, setData] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState({email: ''});
  var intArray = []
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "www.google.com",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

 
  useEffect(() => {
  const fetchData = async () => {
      // get the data from the api
      const response = await fetch('https://yay-api.herokuapp.com/unique');
      const json = await response.json();
      const data = JSON.stringify(json)   
      const array = data.split(',');
       for(var k = 0; k<array.length; k++){
           if (!array[k].includes('[') && !array[k].includes(']')){
               intArray.push(parseInt(array[k]))
       }
     }
     setData(intArray)
     }
    fetchData();
    }, [])

const generateUniqueRandom = async () => {
    //Generate random number
     let random = Number((Math.random() * 1000000000).toFixed())

    if(!data.includes(random)) {
        setRandomNumber(random)
        console.log('random', random);
        console.log('randomNumber state value', randomNumber);
    } else {
        if(data.length < maxNr) {
          //Recursively generate number
         return  generateUniqueRandom();
        } else {
          console.log('No more numbers available.')
          return false;
        }
    }
}

  const handleChangeInput = (id, e) => {
    generateUniqueRandom();
    const newInputFields = emails.map(i => {
      if(id === i.id) {
        i[e.target.name] = e.target.value
      }
      return i;
    })
    
    setEmail(newInputFields);
    console.log(emails);
  }

const handleAddFields = () => {
    setEmail([...emails, { id: uuidv4(),  email: '' }])
  }

const handleRemoveFields = id => {
    const values  = [...emails];
    values.splice(values.findIndex(value => value.id === id), 1);
    setEmail(values);
  }
 
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const submitPayment = async () => {

  // create customer and submit payment

  const r =  await fetch("https://yay-api.herokuapp.com/submit", { 
    method: 'POST', 
    headers: { 
      'Content-type': 'application/json'
     }, 
    body: JSON.stringify({
      message_id: resultsArray[m]
    }) 
    }); 
    const rData = await r.json(); 

}


const databasePost = async () => {
  const responseEmail =  await fetch("https://yay-api.herokuapp.com/bundle", { 
      method: 'POST', 
      headers: { 
        'Content-type': 'application/json'
       }, 
      body: JSON.stringify({
        unique_id: randomNumber,
        name: name
      }) 
      }); 
    const rData = await responseEmail.json(); 
    if (rData.status === 'success'){
     alert("Message Sent."); 
      this.resetForm()
     }else if(rData.status === 'fail'){
       alert("Message failed to send.")
     }
    }


const sendEmails = async () => {
      const questions = [`What your favorite story about ${name}?`, `What is your favorite memory of you and ${name}?`]
      try {
            for(var j=0; j<emails.length; j++){
              if(emails[j]){
                (async function(j){
                const response =  await fetch("https://yay-api.herokuapp.com/email", { 
                  method: 'POST', 
                  headers: { 
                    'Content-type': 'application/json'
                   }, 
                  body: JSON.stringify({
                    question: questions,
                    email: emails[j].email,
                    unique_id: randomNumber,
                    name: name
                  }) 
                  }); 
                const resData = await response.json(); 
                if (resData.status === 'success'){
                 alert("Message Sent."); 
                  this.resetForm()
                 }else if(resData.status === 'fail'){
                   alert("Message failed to send.")
                 }
                console.log('j' + j);
                })(j);
              }
            }
  
          }
          catch {
            console.log('error in sending email(s)');
          }
        };
  

   const getMessagesbyEmailID  = async () => { 

    try {
        // get the message ids for a particular unique ID
        const resp =  await fetch("https://yay-api.herokuapp.com/messages", { 
          method: 'POST', 
          headers: { 
            'Content-type': 'application/json'
           }, 
          body: JSON.stringify({
            unique: randomNumber
          }) 
          }); 
          const resultsData = await resp.json(); 
          if (resultsData.status === 'success'){
           alert("Message Sent."); 
            this.resetForm()
           }else if(resultsData.status === 'fail'){
             alert("Message failed to send.")
           }
  // loop of post requests, to get body of emails, based on the the specific id (passed from the previous post request)
     
        console.log('resultsData typeof' + typeof resultsData);
         var resultsArray = [];
         var snippets = [];
      for(var i = 0; i< resultsData.length; i++){
      for(let key in resultsData[i]) {
        console.log(key + ":", resultsData[i][key]);
        if(key=="id"){
          resultsArray.push((resultsData[i][key]))
        };
      }
    }
      console.log('resultsarray' + resultsArray);
      console.log('before the message api post call');
      console.log('resultsArray[1] typeof' + typeof resultsArray[1]);
  
      for (var m =0; m<resultsArray.length; m++ ){
          const r =  await fetch("https://yay-api.herokuapp.com/message", { 
          method: 'POST', 
          headers: { 
            'Content-type': 'application/json'
           }, 
          body: JSON.stringify({
            message_id: resultsArray[m]
          }) 
          }); 
          const rData = await r.json(); 
          console.log('rData typeOf' + rData)
          if (rData.status === 'success'){
           consol.log("Message Sent."); 
            this.resetForm()
           }else if(rData.status === 'fail'){
             console.log("Message failed to send.")
           }
          if(rData.id){
          snippets.push(rData.snippet);
          console.log('snippet: ' + snippets);
          }
          }
          console.log('snippets all: ' + snippets);

        }
        catch {
          console.log('error in message getting')
        }
}


const submitRequest = async (e) => {
  e.preventDefault();
  databasePost();
  sendEmails();
  alert("Submitted!")
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-around bg-gray-200"></div>
      <div className="w-full max-w-sm m-auto flex flex-col my-32">

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-gray-200 border"
          onSubmit={submitRequest}
        >
          <h2 className="text-2xl pt-6 pb-10 text-center font-medium text-gray-800">
            Your Gift Details
          </h2>
          <div className="mb-4">
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
             Your first and last name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Full name gift-intiator"
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Your email address:
            </label>
            <input
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Email address of gift-initiator"
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
             Credit Card number
            </label>

             <CardElement  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Gift recipient's first and last name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Full name of gift recipient "
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
            <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Gift contributors' email addresses:
            </label>
            {emails.map(obj => (
            <input
              key={obj.id}
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              placeholder="Email address of contributor"
              onChange={e => handleChangeInput(obj.id, e)}
              value={emails.email}
              required
            />
            ))}
            
            

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Pay and Initate Gift
            </button>
          </div>
          </div>
        </form>
        <div className="inline-flex">
        <button  onClick={handleAddFields} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-6 rounded-l">
             <span className='font-bold'> + </span> (add email)
              </button>
            <button disabled={emails.length === 1} onClick={() => handleRemoveFields(emails.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-2 rounded-r">
             <span className='font-bold'> - </span> (remove email)
            </button>
           </div>
      </div>
      
      
    </div>
  );
};

export default Input;
  