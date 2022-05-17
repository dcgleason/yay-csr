import { Fragment, useState } from 'react'
import { Dialog, Popover, RadioGroup, Tab, Transition } from '@headlessui/react'

const Modal = () => {

    return(


<Transition
                show={isModalOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-15 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                >
              <Dialog onClose={() => setIsModalOpen(false)}  className="relative w-2/5 z-50 ">
              <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center  justify-center p-4">
                <Dialog.Panel className="w-full max-w-md border-solid border-2 m-10 rounded border-white bg-[#ffdab9]">
                  <Dialog.Title className='text-xl bold'>Try the Beta version of Amore Books</Dialog.Title>
                  <Dialog.Description>
                   Submit your email to test Amore Books for free.
                
                  </Dialog.Description>
                  <form className="mt-2 flex h-1/6 sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    type="text"
                    placeholder="Email Address"
                    autoComplete="email"
                    className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#f4978e] focus:ring-1 focus:ring-[#f4978e]"
                  />
                  <div className="ml-4 flex-shrink-0">
                    <button
                      type="button"
                      className="w-full bg-[#f8ad9d] hover:bg-[#f4978e] border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setIsModalOpen(false)}
                   >
                      Submit
                    </button>
                  </div>
                </form>
                </Dialog.Panel>
                </div>
              </Dialog>
              </Transition>

)
}

export default Modal;