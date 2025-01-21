import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-1- mt-40 text-sm'>
        {/* left section */}
        <div>
           <img className='mb-5 w-40' src={assets.logo} alt="" />
           <p className='w-full md:w-2/3 text-gray-600 leading-6'> Prescripto is a website connecting people with trusted doctors. Users can log in to browse profiles, find specialists, and book appointments. It offers a secure platform for contacting doctors, seeking medical advice, and managing healthcare needs. </p>
        </div>
        {/* center section */}
        <div>
           <p className='text-xl font-medium mb-5'>COMPANY</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
           </ul>
        </div>
        {/* right section */}
        <div>
           <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>1-23-456-7890</li>
            <li>gajulasharath29@gmail.com</li>
           </ul>
        </div>
        </div>
        
        <div>
            <hr className='mt-4'/>
             <p className='py-5 text-sm text-center'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
