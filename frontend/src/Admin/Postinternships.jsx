import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Postinternships() {
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [aboutCompany, setAboutCompany] = useState('');
    const [aboutInternship, setAboutInternship] = useState('');
    const [whoCanApply, setWhoCanApply] = useState('');
    const [perks, setPerks] = useState('');
    const [numberOfOpening, setNumberOfOpening] = useState('');
    const [stipend, setstipend] = useState('');
    const [startDate, setStartDate] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
   const navigate=useNavigate()
    const sendData=(e)=>{
      e.preventDefault();
  if( title === '' &&
  companyName === '' &&
  location === '' &&
  category === '' &&
  aboutCompany === '' &&
  aboutInternship === '' &&
  whoCanApply === '' &&
  perks === '' &&
  numberOfOpening === '' &&
  stipend === '' &&
  startDate === '' &&
  
  additionalInfo === ''){
  
      alert("fill the Blanks ")
  }
  
  
  else{
      const bodyJosn={
          title:title,
          company:companyName,
          location:location,
          category:category,
          aboutCompany:aboutCompany,
          aboutInternship:aboutInternship,
          Whocanapply:whoCanApply,
          perks:perks,
          numberOfopning:numberOfOpening,
          stipend:stipend,
          StartDate:startDate,
          AdditionalInfo:additionalInfo,
  
      }
  axios.post("https://internshipbackend-vwja.onrender.com/api/internship",bodyJosn).then((res)=>{
      console.log(res.data)
    }).catch((err)=>
    console.log(err))
    
  }
  alert(" Internship Posted is Successfully")
  navigate("/adminepanel")
    }
    return (
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Post An Internship
            </h2>
          </div>
    
          <form className="mx-auto grid gap-4 sm:grid-cols-2 max-w-screen-md" onSubmit={sendData}>
            <div>
              <label
                htmlFor="title"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Title*
              </label>
              <input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
    
            <div>
              <label
                htmlFor="company-name"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Company Name*
              </label>
              <input
                name="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
    
            <div className="sm:col-span-2">
              <label
                htmlFor="Location"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Location
              </label>
              <input
                name="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
    
            {/* Repeat similar structure for other inputs */}
    
            <div className="sm:col-span-2">
              <label
                htmlFor="additionalInfo"
                className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >
                Additional Information*
              </label>
              <textarea
                name="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="h-12 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              ></textarea>
            </div>
    
            <button className="sm:col-span-2 w-full rounded bg-indigo-500 px-4 py-2 text-white font-medium hover:bg-indigo-600 transition duration-100">
              Post Job
            </button>
          </form>
        </div>
      </div>
    );
    
}

export default Postinternships
