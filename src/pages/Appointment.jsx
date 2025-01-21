import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';  // Ensure correct context path
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { docId } = useParams();  // Get the dynamic route parameter 'docId'
  const { doctors,currencySymbol } = useContext(AppContext);  // Get doctors from context
  //days
  const daysOfWeek = ['SUN','MON','TUE','WED',
    'THU','FRI','SAT'
  ]
  const [docInfo, setDocInfo] = useState(null);
  
  // whre you can add the days and times to use present time use state
  // whre you can book the appointemnt of a doctor od day and time date
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime,setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    console.log("Doctors in context:", doctors); // Log doctors for debugging
    const docInfo = doctors.find(doc => doc._id === docId);  // Find the doctor by ID
    if (!docInfo) {
      console.error(`Doctor with id ${docId} not found`);
      return;
    }
    setDocInfo(docInfo);  // Set the found doctor's info in state
  };

  //functin for time slots and day
  const getAvailableSlots = async ()=>{
       setDocSlots([])

       //getting the current date
       let today = new Date();

       for(let i=0;i<7;i++){
           //get the date with index
           let currentDate = new Date(today)
           //for next 7 days 
           currentDate.setDate(today.getDate()+i)

           //setting end time of the date with index
           let endTime = new Date()
           endTime.setDate(today.getDate()+i)
           endTime.setHours(21,0,0,0) 

           //setting hours
           if(today.getDate() === currentDate.getDate()){
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
           }
           //if for future
           else{
            currentDate.setHours(10)
            currentDate.setMinutes(0)
           }
          
          let timeSlots = []

           while(currentDate < endTime){
            let formattedTime = currentDate.toLocaleTimeString([],{
              hour:'2-digit',minute:'2-digit'
            })
            
            //add the slot to array
            timeSlots.push({
              dateTime : new Date(currentDate),
              time : formattedTime
            })
            
            //increment the time to 30 minutes
            currentDate.setMinutes(currentDate.getMinutes() + 30)
           }

           setDocSlots(prev => ([...prev,timeSlots]))
       }
  }
  
  //calling purpose
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);  // Re-run when doctors or docId changes

  if (!docInfo) {
    return <p>Loading doctor information...</p>;
  }

  return (
    <div>
      {/* Doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={`Dr. ${docInfo.name}`} />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* Display doctor's name, degree, and experience */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
          <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* .......doctor about.......... */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3' >About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>
     
     {/* boking slot of day and time */}
     <div className='sm:ml-72 sm:pl-4 font-medium text-gray-700'>
     <p>Booking Slot</p>
     <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
      {
        docSlots.length && docSlots.map((item,index)=>(
          <div onClick={()=> setSlotIndex(index)}
          className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
           key={index}>
        <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
        <p>{item[0] && item[0].dateTime.getDate()}</p>
          </div>
        ))
      }
     </div>

     {/* Tomg slot */}
     <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer
            ${item.time === slotTime ? 'bg-primary text-white':'text-gray-400 border border-gray-300'} `} key ={index}>
              {item.time.toLowerCase()}
            </p>
        ))}
     </div>
    
    <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>

    </div>
     
     {/* listing related dc+octs */}

     <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  );
};

export default Appointment;
