import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Dialog from "@mui/material/Dialog";
import LoadingSpinner from "./LoadingSpinner"
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
  const [ownerName, setOwnerName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [state, setState] = useState('');
  const [alert, setAlert] = useState({
    type: 'error',
    text: '',
    title: 'Error',
    open: false
  })
  const [ paymentStatus, setPaymentStatus ] = useState({
    status: null,
    title: "Error",
    type: "error",
    open: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [giftOwnerMessage, setGiftOwnerMessage] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
 
  useEffect(() => {

  const fetchData = async () => {
    var random = Number((Math.random() * 1000000000).toFixed())
      // get the data from the api
      const resp =  await fetch("https://yay-api.herokuapp.com/unique/check", { 
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json'
         }, 
        body: JSON.stringify({
         giftCode: random // possible random Number 
        })  
        }); 
     if (!resp){ ////response false - there does not exist a number in the db already, set 
       console.log("the repsonse is: " + resp);
       setRandomNumber(random);
       console.log('random number set to:' + random)
     }
    else {
      fetchData()  // recusively run until response is false and setRandomNumber has run.
    }
  };
    fetchData();
    }, [])

    useEffect(() => {
      setAlert({
        type: paymentStatus.type,
        text: paymentStatus.status,
        title: paymentStatus.title,
        open: paymentStatus.open
      }); // This will always use latest value of count
  }, [paymentStatus]);


  const handleChangeInput = (id, e) => {
   // generateUniqueRandom();

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

  setIsLoading(true);
  console.log('ownerName: '+ ownerName);
  console.log('ownerEmail: '+ ownerEmail);
  console.log('clientSecret: '+ props.clientSecret);

  //(async () => {

    const {paymentIntent, error} = await stripe.confirmCardPayment(
      props.clientSecret,
      {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name: ownerName,
            email: ownerEmail
          },
        },
      },
    );
    if (error) {
      setPaymentStatus({
        status: "Error: " + error.message,
        title: "Error",
        type: "error",
        open: true
      })
      console.log("There has been a payment error", error.message)
    return 'submitpayment function complete - error'
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log("Your payment has succeeded", paymentIntent.status)
      setPaymentStatus({
          status: "Your payment of $45 dollars succeeded",
          title: "Success",
          type: "success",
          open: true
        })
     // postOrderMongoDB()
      sendEmails();
    return 'submitpayment function complete - success'

      
     
    }
//  })();



}

// const updatePaymentIntent = async () => {

//   const resp =  await fetch("https://yay-api.herokuapp.com/stripe/updatePaymentIntent", { 
//     method: 'POST', 
//     headers: { 
//       'Content-type': 'application/json'
//      }, 
//     body: JSON.stringify({
//      receipt_email: ownerEmail
//     })  
//     });
//   const respData = await resp.json(); 
//   console.log('after payment intent update with price amount: '+respData);
//   if(respData){ // work on this to properply handle the error / return message paymentIntent.status would be what?
//     return true
//   }
//   else {
//     return false
//   }
// }

// const databasePost = async () => {
//   const responseEmail =  await fetch("https://yay-api.herokuapp.com/bundle", { 
//      method: 'POST', 
//       headers: { 
//         'Content-type': 'application/json'
//        }, 
//       body: JSON.stringify({
//         email_id: randomNumber,
//         name: name,
//         ownerName: ownerName,
//         ownerEmail: ownerEmail,
//         address: address,
//         apartment: apartment,
//         city: city,
//         state: state,
//         zipCode: zip,
//         country: country,
//         phone: phone
        
//       }) 
//       }); 
//     const rData = await responseEmail.json(); 
//     if (rData.status === 'success'){
//      alert("Message with owner and recipeint info sent Sent."); 
//       this.resetForm()
//      }else if(rData.status === 'fail'){
//        alert("Message failed to send.")
//      }
//     }


const sendEmails = async () => {
      const questions = [`What your favorite story about ${name}?`, `What is your favorite memory of you and ${name}?`]
      try {
            for(var j=0; j<emails.length; j++){
              if(emails[j]){
                (async function(j){
                const response =  await fetch("https://yay-api.herokuapp.com/email/send", { 
                  method: 'POST', 
                  headers: { 
                    'Content-type': 'application/json'
                   }, 
                  body: JSON.stringify({
                    email: emails[j].email,
                    giftCode: randomNumber,
                    ownerName: ownerName,
                    recipient: name,
                    giftOwnerMessage: giftOwnerMessage
                  }) 
                  }); 
          
                if (response === 200){
                 alert("Message Sent."); 
                  this.resetForm()
                 }else if(response === 500){
                   alert("Message failed to send.")
                 }
                console.log('contributor email ' + emails[j].email);
                console.log('random number' + randomNumber)
                console.log('recipient - contributor' + name);
                })(j);
              }
            }
          }
          catch {
            console.log('error in sending email(s)');
          }
        };
  

const handleClick = () => {
  setAlert({
    open: false
  })
}


const submitRequest = async (e) => {
  e.preventDefault();
  const result = await submitPayment();
 // alert('Form submitted. Y&Y is still in development - your card was not charged!')
console.log(result);
setIsLoading(false);
//setNotification(true);
};


const postOrderMongoDB = async () => {
  try{
    const resp =  await fetch("https://yay-api.herokuapp.com/gift/insertOrder", { 
      method: 'POST', 
      headers: { 
        'Content-type': 'application/json'
       }, 
      body: JSON.stringify({
          owner: {
            ownerName: ownerName,
            ownerEmail: ownerEmail,
            shipping: {
              address: address + " " + apartment,
              city: city,
              state: state,
              zipCode: zip,
              country: country,
              phone: phone,
            }
          },
          gift: {
              giftCode: randomNumber,
              recipient: name
          }
      }) 
      }); 
  }
  catch{
    console.error(error)
  }
}

  return (
    <div>

      <Dialog open={alert.open} onClose={handleClick}>
        <Alert
          severity={alert.type}
          color={alert.type}
          role="button"
          onClose={() => handleClick()}
          closeText="Doesn't Work!"
          sx={{
            width: '80%',
            margin: 'auto',
            "& .MuiAlert-icon": {
              color: "blue"
            }
            //backgroundColor: "green"
          }}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.text}
        </Alert>
      </Dialog>
      
      <div className="flex flex-col items-center justify-around bg-gray-200"></div>
      <div className="w-full max-w-sm m-auto flex flex-col my-32">

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-gray-200 border"
          onSubmit={submitRequest}
        >
          <h1 className="text-2xl pt-6 pb-6 text-center font-medium text-gray-800">
            Create your Bundle
          </h1>
          <h2 className="text-xl pt-3 pb-3 text-center underline font-medium text-gray-800">
            Your Information
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
              placeholder="Full name"
              onChange={e => setOwnerName(e.target.value)}
              value={ownerName}
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
              placeholder="Email address"
              onChange={e => setOwnerEmail(e.target.value)}
              value={ownerEmail}
              required
            />
            {/* Shipping information top */}  
            
            {  ownerEmail.length >= 1 ?
           (
           <>
           <div className='sm:border-t sm:border-gray-200 mt-7 '>
           <h2 className="text-xl pt-5 font-medium text-center underline text-gray-800">Shipping Information</h2>
            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
  
              <div className="sm:col-span-2">
                <label htmlFor="address"  className="block text-gray-700 text-sm pb-2 font-bold mb-2">
                  Street address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    onChange={e => setAddress(e.target.value)}
                    value={address}
                    placeholder="123 Main St."
                    id="address"
                    autoComplete="street-address"
                    className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="apartment"  className="block text-gray-700 text-sm pb-2 font-bold">
                  Apartment, suite, etc.
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    onChange={e => setApartment(e.target.value)}
                    value={apartment}
                    name="apartment"
                    placeholder="Apt 1A"
                    id="apartment"
                    className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 />
                </div>
              </div>
              <div>
                <label htmlFor="city"  className="block text-gray-700 text-sm pb-2 font-bold">
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    placeholder="Boston"
                    autoComplete="address-level2"
                    className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="country"  className="block text-gray-700 text-sm pb-2 font-bold">
                  Country
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    autoComplete="country-name"
                    className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                 >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="region"  className="block text-gray-700 text-sm pb-2 font-bold">
                  State / Province
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    onChange={e => setState(e.target.value)}
                    value={state}
                    placeholder="MA"
                    autoComplete="address-level1"
                    className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="postal-code"  className="block text-gray-700 text-sm pb-2 font-bold">
                  Postal code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="postal-code"
                    onChange={e => setZip(e.target.value)}
                    value={zip}
                    id="postal-code"
                    placeholder="02117"
                    autoComplete="postal-code"
                    className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                 />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-gray-700 text-sm pb-2 font-bold">
                  Phone number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    placeholder="(555) 555-5555"
                    id="phone"
                    autoComplete="tel"
                    className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                 />
                </div>
              </div>
            </div>
            <label
              className="block text-gray-700 text-sm py-2 font-bold"
              htmlFor="Email"
            >
              
             Billing Information
            </label>
             <CardElement  className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
             </div>
            </>
           )
          : <div></div> 
          }

          
            {/* Shipping information bottom */}  
    
          <div className='sm:border-t sm:border-gray-200 sm:pt-5 mt-7'>
            <h2 className="text-xl pt-3 pb-3 text-center underline font-medium text-gray-800">
            Recipient Information
          </h2>
          <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Bundle recipient's first and last name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Full name of Bundle recipient "
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
            <label
              className="block text-gray-700 text-sm py-2 font-bold mb-2"
              htmlFor="Email"
            >
              Bundle contributors' email addresses:
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
           <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label htmlFor="about" className="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
                Your message to contributors:
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={4}
                  required
                  onChange={e => setGiftOwnerMessage(e.target.value)}
                  value={giftOwnerMessage}
                  className="max-w-lg shadow block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
            </div>
            
     
     {isLoading ? 
          <LoadingSpinner /> : 
          <div className="flex items-center justify-between">
         
           <button
              className="bg-[#f8ad9d] hover:bg-[#f4978e] text-white font-bold py-2 px-4 mt-6 w-full rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={submitRequest}
            >
              Submit Payment & Initate Gift
            </button> 
          </div>
}
          </div>
        </form>
        <div className="inline-flex">
        <button  onClick={handleAddFields} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-6 rounded-l">
             <span className='font-bold'> Add Contributor </span> 
              </button>
            <button disabled={emails.length === 1} onClick={() => handleRemoveFields(emails.id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 border-4 py-1 px-2 rounded-r">
             <span className='font-bold'> Remove Contributor </span>
            </button>
           
           </div>
      </div>
      
      
    </div>

    
  );
};

export default Input;
  