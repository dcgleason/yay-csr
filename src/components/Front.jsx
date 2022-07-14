/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShieldCheckIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Input } from "../components/index"
import { useEffect } from 'react'
import clsx from "clsx"


const navigation = {
  categories: [
    // {
    //   id: 'women',
    //   name: 'Women',
    //   featured: [
    //     {
    //       name: 'New Arrivals',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    //       imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
    //     },
    //     {
    //       name: 'Basic Tees',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
    //       imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
    //     },
    //   ],
    //   sections: [
    //     {
    //       id: 'clothing',
    //       name: 'Clothing',
    //       items: [
    //         { name: 'Tops', href: '#' },
    //         { name: 'Dresses', href: '#' },
    //         { name: 'Pants', href: '#' },
    //         { name: 'Denim', href: '#' },
    //         { name: 'Sweaters', href: '#' },
    //         { name: 'T-Shirts', href: '#' },
    //         { name: 'Jackets', href: '#' },
    //         { name: 'Activewear', href: '#' },
    //         { name: 'Browse All', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'accessories',
    //       name: 'Accessories',
    //       items: [
    //         { name: 'Watches', href: '#' },
    //         { name: 'Wallets', href: '#' },
    //         { name: 'Bags', href: '#' },
    //         { name: 'Sunglasses', href: '#' },
    //         { name: 'Hats', href: '#' },
    //         { name: 'Belts', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'brands',
    //       name: 'Brands',
    //       items: [
    //         { name: 'Full Nelson', href: '#' },
    //         { name: 'My Way', href: '#' },
    //         { name: 'Re-Arranged', href: '#' },
    //         { name: 'Counterfeit', href: '#' },
    //         { name: 'Significant Other', href: '#' },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: 'men',
    //   name: 'Men',
    //   featured: [
    //     {
    //       name: 'New Arrivals',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
    //       imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
    //     },
    //     {
    //       name: 'Artwork Tees',
    //       href: '#',
    //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
    //       imageAlt:
    //         'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
    //     },
    //   ],
    //   sections: [
    //     {
    //       id: 'clothing',
    //       name: 'Clothing',
    //       items: [
    //         { name: 'Tops', href: '#' },
    //         { name: 'Pants', href: '#' },
    //         { name: 'Sweaters', href: '#' },
    //         { name: 'T-Shirts', href: '#' },
    //         { name: 'Jackets', href: '#' },
    //         { name: 'Activewear', href: '#' },
    //         { name: 'Browse All', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'accessories',
    //       name: 'Accessories',
    //       items: [
    //         { name: 'Watches', href: '#' },
    //         { name: 'Wallets', href: '#' },
    //         { name: 'Bags', href: '#' },
    //         { name: 'Sunglasses', href: '#' },
    //         { name: 'Hats', href: '#' },
    //         { name: 'Belts', href: '#' },
    //       ],
    //     },
    //     {
    //       id: 'brands',
    //       name: 'Brands',
    //       items: [
    //         { name: 'Re-Arranged', href: '#' },
    //         { name: 'Counterfeit', href: '#' },
    //         { name: 'Full Nelson', href: '#' },
    //         { name: 'My Way', href: '#' },
    //       ],
    //     },
    //   ],
    // },
  ],
  pages: [
    { name: 'Home', href: '#' },
    { name: "Write", href: 'https://bundle.love/write'}
  ],
}
const userNavigation = [
//   { name: 'Sign in', href: '#' },
//   { name: 'Create account', href: '#' },
]
const product = {
  name: 'Create a Bundle. Spread the love.',
  href: '#',
  price: '$45',
  description:
   '',
  imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundle.png',
  imageAlt: 'Bundle logo',
  breadcrumbs: [
    { id: 1, name: 'Travel', href: '#' },
    { id: 2, name: 'Bags', href: '#' },
  ],
  sizes: [
    { name: '10 pages', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20 pages', description: 'Enough room for a serious amount of snacks.' },
  ],
}
const policies = [
  {
    name: 'Create a special memory',
    description:
      'Give a gift your family member or friend will remember for the rest of his or her life.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg', 
  },
  {
    name: '24/7 Customer Support',
    description:
      'As a company, we are committed to answering any questions or addressing any concerns you might have, quickly. Email us and we will respond within 24 hours.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast turn-around',
    description:
      "Within three weeks after ordering, you'll have your Bundle at your door-step, ready to gift.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Vouchers',
    description:
      "Not a great time for you to gift a Bundle right now? Email us your details and we will send you a voucher to use for later, or to gift to someone you know.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
]
const reviews = {
  average: 5,
  totalCount: 3,
  counts: [
    { rating: 5, count: 3 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>I got this as a gift for my mom on Mother's Day - she loved it! Our family and her friends all chipped in. It was really special. </p>
      `,
      author: 'Eliza Irwin',
      avatarSrc:
        'https://www.linkedin.com/in/elizairwin/overlay/photo/',
    },
    // More reviews...
  ],
}
const footerNavigation = {
  products: [
    // { name: 'Bags', href: '#' },
    // { name: 'Tees', href: '#' },
    // { name: 'Objects', href: '#' },
    // { name: 'Home Goods', href: '#' },
    // { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Return Policy', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' }
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Front() {


  const [open, setOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [secret, setSecret] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[betaEmail, setBetaEmail] = useState('');
  const[betaReferralSource, setBetaReferralSource] = useState('');
  const[betaName, setBetaName] = useState('');

  const stripePromise = loadStripe('pk_test_51KtCf1LVDYVdzLHCzEQuGuw08kKelgXO7AgN6VDN874gIPxfr7dl7PvcNgUZUSnypEOxqJcMCu4G119l0MQixCkj00Rr1fOuls');

useEffect(() => {
        const getClientSecret = async () => {
        const response =  await fetch('https://yay-api.herokuapp.com/stripe/secret').then(res => res.json());
        console.log('response: '+ JSON.stringify(response));
        const data = JSON.stringify(response);
        const {client_secret} = JSON.parse(data);
        console.log('JSON.parse(Data): ' + JSON.parse(data))
        console.log('client secret: ' + client_secret)
        setSecret(client_secret)
}

        getClientSecret();

}, []);


const submitBetaInfo = async () => {
  setIsModalOpen(false)
  const response =  await fetch("https://yay-api.herokuapp.com/beta/signup", { 
    method: 'POST', 
    headers: { 
      'Content-type': 'application/json'
     }, 
    body: JSON.stringify({
     name: betaName,
     email: betaEmail,
     referralSource: betaReferralSource
    })  
    });
  console.log("modal submit api response" + response);
}


const options = {
    client_secret: secret
  }  



  return (
    <div className="bg-gray-100">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                          
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              {/* <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Create account
                  </a>
                </div>
              </div> */}

                  
          
                
              <div className="border-t border-gray-200 py-6 px-4">
              
                <a href="#" className="-m-2 p-2 flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1600px-Flag_of_the_United_States.svg.png?20151118161041"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">USA</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>

            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        {/* <p className=" bg-[#ffdab9] h-12 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          DEV
        </p> */}

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Bundle</span>
                  <img
                    className="h-6 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundle.png"
                    alt=""
                  />
                </a>
              </div>
              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute z-10 top-full inset-x-0 text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <Transition
                show={isModalOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-15 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                >
    <Dialog
		  onClose={() => setIsModalOpen(false)}
			as="div"
      className=
				" fixed inset-0 opacity-100 flex items-center justify-center overflow-y-auto bg-gray-100">
			
			<div className="flex flex-col bg-gray-300 text-white w-96 py-8 px-4 text-center">
				<Dialog.Overlay />
			      	<Dialog.Title className="text-[#f08080] text-3xl">
				      	Try the beta version of <em>Bundle</em> 
                </Dialog.Title>
                <Dialog.Description className="text-xl m-2">
                  (it is free! We'll send you an email with instructions.)
                </Dialog.Description>
                <form className="mt-2 flex-col sm:max-w-md" >
                <label className="text-gray-700 underline text-sm font-bold">
                   Full Name
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    placeholder="Full Name"
                    required
                    value={betaName}
                    onChange={(e)=>setBetaName(e.target.value)}
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f4978e] focus:ring-1 focus:ring-[#f4978e]"
                  />
                  <label className="text-gray-700 underline text-sm font-bold">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    value={betaEmail}
                    onChange={(e)=>setBetaEmail(e.target.value)}
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f4978e] focus:ring-1 focus:ring-[#f4978e]"
                  />
                 <label className="text-gray-700 underline text-sm font-bold">
                    How did you hear about Bundle?
                  </label>
                  <div className="mt-1">
                  <select
                    id="heardOf"
                    name="heardOf"
                    onChange={e => setBetaReferralSource(e.target.value)}
                    value={betaReferralSource}
                    autoComplete="country-name"
                    className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                 >
                    <option>Friend or family member</option>
                    <option>Google search</option>
                    <option>Advertisement</option>
                    <option>Other</option>
                  </select>
                </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="w-full bg-[#f8ad9d] hover:bg-[#f4978e] border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f08080]"
                      onClick={() => submitBetaInfo()} //need to submit email onSubmit without slowing down performance
                    >
                     Sign-up
                    </button>
                  </div>
                </form>
                
              </div>
		</Dialog>
    </Transition>

        {/* Join beta pop up */}
        
              <div className="ml-auto flex items-center">
                {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div> */}
                 <button
                      type="button"
                      className="w-full bg-[#f8ad9d] hover:bg-[#f4978e] border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f08080]"
                      onClick={() => setIsModalOpen(true)}
                   >
                      Try Beta Version (it's free)
                    </button>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1600px-Flag_of_the_United_States.svg.png?20151118161041"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">USA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                {/* <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Product */}
        <div className="bg-white">
          <div className="max-w-2xl mx-auto px-4 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product details */}
            <div className="lg:max-w-lg mb-40 pb-40 lg:self-end">
              {/* <nav aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                  {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center text-sm">
                        <a href={breadcrumb.href} className="font-medium text-gray-500 hover:text-gray-900">
                          {breadcrumb.name}
                        </a>
                        {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                          <svg
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            aria-hidden="true"
                            className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav> */}
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-9/12 h-9/12 object-center object-cover mb-10 ml-14 mx-25"
                /> 

              <div className="mt-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <h2 id="information-heading" className="sr-only">
                  TEST
                </h2>

                <div className="flex items-center">
                  <p className="text-lg text-gray-900 sm:text-xl">{product.price}</p>

                  <div className="ml-4 pl-4 border-l border-gray-300">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{reviews.average} out of 5 stars</p>
                      </div>
                      <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <p className="text-base text-gray-500"><b>Bundle</b>,  <em>noun</em>: a book of written messages of love and support collected for a special person in your life from <em>his or her</em> family and friends. <br></br><br></br> We coordinate all of the logistics for you, deliver within a two week window, and give <em>you</em> all the credit. </p>
                </div>
                <div className="mt-6 text-center">
                    <a href="#" className="group inline-flex text-base font-medium">
                      <ShieldCheckIcon
                        className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="text-gray-500 hover:text-gray-700">We have a money-back guarantee, but we guarentee you won't need it 😉</span>
                    </a>
                  </div>

                {/* <div className="mt-6 flex items-center">
                  <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
                  <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                </div> */}
              </section>
            </div>

            {/* Product image */}


            <div className="mt-10 pb-20 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <Elements  stripe={stripePromise} options={options}>
                <Input clientSecret={secret}/>
             </Elements>   
            
              </div>
            </div>

            {/* Product form */}
            <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
              <section aria-labelledby="options-heading">
                <h2 id="options-heading" className="sr-only">
                  Product options
                </h2>

                <form>
                  <div className="sm:flex sm:justify-between">
                    {/* Size selector */}
                    {/* <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                      <RadioGroup.Label className="block text-sm font-medium text-gray-700">Book Size</RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            as="div"
                            key={size.name}
                            value={size}
                            className={({ active }) =>
                              classNames(
                                active ? 'ring-2 ring-indigo-500' : '',
                                'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                  {size.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                  {size.description}
                                </RadioGroup.Description>
                                <div
                                  className={classNames(
                                    active ? 'border' : 'border-2',
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    'absolute -inset-px rounded-lg pointer-events-none'
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup> */}
                  </div>
                  {/* <div className="mt-4">
                    <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                      <span>What size should I buy?</span>
                      <QuestionMarkCircleIcon
                        className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                  </div> */}
                  {/* <div className="mt-10">
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                    >
                      Add to bag
                    </button>
                  </div> */}
                
                </form>
              </section>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          {/* Details section */}
          <section aria-labelledby="details-heading">
            <div className="flex flex-col items-center text-center">
              <h2 id="details-heading" className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Here's how your Bundle is put together:
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
                (This all happens within a two week window)
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
              <div>
                <div className="w-8/12 aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/aami-flat-emails/64/email-41-512.png"
                    alt="Drawstring top with elastic loop closure and textured interior padding."
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <p className="mt-8 text-base text-gray-500">
                 1. Family, friends, and/or coworkers of your Bundle recipient write heartfelt messages from prompts on our <a className="underline font-bold" href="https://bundle.love/write">Write</a> page about your Bundle recipient (we coordinate this for you). All Bundle contributors have five days to submit their responses. 
                </p>
              </div>
              <div>
                <div className="w-8/12 aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/1024px-Closed_Book_Icon.svg.png"
                    alt="Front zipper pouch with included key ring."
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <p className="mt-8 text-base text-gray-500">
                  2. After responses are collected for your Bundle, they are compiled, published into a physical book, and sent to you within eight to ten business days. The completed book is sent to you, so that you can give to it your intended recipient. 
                </p>
              </div>
            </div>
          </section>

          {/* Policies section */}
          <section aria-labelledby="policy-heading" className="mt-16 lg:mt-24">
          <div className="flex flex-col items-center pb-10 text-center">
              <h2 id="details-heading" className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
               When to send a Bundle:
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">
               (Below are some of our favorite excuses to "share the love.")
              </p>
            </div>
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {/* {policies.map((policy) => ( */}
              {/* Start of occations */}
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Birthdays</h3>
                  <p className="mt-3 text-base text-gray-500">Wish someone a "happy birthday."</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Graduations</h3>
                  <p className="mt-3 text-base text-gray-500">Congratulate someone on his or her accomplishments.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Anniversaries</h3>
                  <p className="mt-3 text-base text-gray-500">Wish someone a happy anniversary.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Weddings</h3>
                  <p className="mt-3 text-base text-gray-500">Give a the bride (or groom) a gift she or he can cherish for years to come.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">A Thank You</h3>
                  <p className="mt-3 text-base text-gray-500">Send a "group thank you" to a special someone.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Retirement</h3>
                  <p className="mt-3 text-base text-gray-500">Offer well-wishes to a co-worker on his or her final day.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Get Well Soon</h3>
                  <p className="mt-3 text-base text-gray-500">Offer up support from friends and family for a sick loved one.</p>
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-auto text-[#f8ad9d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                  <h3 className="mt-6 text-base font-medium text-gray-900">Just Because</h3>
                  <p className="mt-3 text-base text-gray-500">Let someone know how much they're loved, just because they are.</p>
                </div>
              {/* ))} */}
            </div>
          </section>
        </div>

        <section aria-labelledby="reviews-heading" className="bg-white">
          <div className="max-w-2xl mx-auto py-24 px-4 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-4">
              <h2 id="reviews-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                Customer Reviews
              </h2>

              <div className="mt-3 flex items-center">
                <div>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
                <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Review data</h3>

                <dl className="space-y-3">
                  {reviews.counts.map((count) => (
                    <div key={count.rating} className="flex items-center text-sm">
                      <dt className="flex-1 flex items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {count.rating}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" className="ml-1 flex-1 flex items-center">
                          <StarIcon
                            className={classNames(
                              count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                              'flex-shrink-0 h-5 w-5'
                            )}
                            aria-hidden="true"
                          />

                          <div className="ml-3 relative flex-1">
                            <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                            {count.count > 0 ? (
                              <div
                                className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                                style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                        {Math.round((count.count / reviews.totalCount) * 100)}%
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you’ve used this product, share your thoughts with other customers
                </p>
                <a
                  href="#"
                  className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                >
                  Write a review
                </a>
                
              </div> */}
            </div>

            <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
              <h3 className="sr-only">Recent reviews</h3>

              <div className="flow-root">
                <div className="-my-12 divide-y divide-gray-200">
                  {reviews.featured.map((review) => (
                    <div key={review.id} className="py-12">
                      <div className="flex items-center">
                        <img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                        <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
                          <div className="mt-1 flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                  'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{review.rating} out of 5 stars</p>
                        </div>
                      </div>

                      <div
                        className="mt-4 space-y-6 text-base italic text-gray-600"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby="footer-heading" className="bg-white">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min">
              {/* Image section */}
              <div className="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Bundle.png"
                  alt=""
                  className="h-8 w-auto"
                />
              </div>

              {/* Sitemap sections */}
              <div className="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6">
                <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Company</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className="text-sm">
                          <a href={item.href} className="text-gray-500 hover:text-gray-600">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.customerService.map((item) => (
                      <li key={item.name} className="text-sm">
                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Newsletter section */}
              <div className="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4">
                <h3 className="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                <p className="mt-6 text-sm text-gray-500">Arrives in your inbox every Monday.</p>
                <form className="mt-2 flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    autoComplete="email"
                    required
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f4978e] focus:ring-1 focus:ring-[#f4978e]"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      className="w-full bg-[#f8ad9d] hover:bg-[#f4978e] border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 text-center">
            <p className="text-sm text-gray-500">&copy; 2022 Bundle, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}