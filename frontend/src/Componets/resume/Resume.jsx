import React, { useState, useCallback, useRef } from 'react';
import { toPng } from 'html-to-image';
import './resume.css';
import html2canvas from 'html2canvas';
import axios from 'axios';
import CertificateTemp from '../Assets/images/Certificate.png'



const Resume = () => {
  const ref = useRef(null);
  const [name, setName] = useState('');
  const [qualification, setqualification] = useState('');
  const [experience, setexperience] = useState('');
  const [personal, setpersonal] = useState('');

  const [photo, setPhoto] = useState(null); // State to store uploaded photo
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(true); // Track if photo is loaded

  const onButtonClick = useCallback(() => {
    if (ref.current === null || !isPhotoLoaded) {
      return; // Ensure photo is loaded before proceeding
    }

    html2canvas(ref.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL();
      link.click();
    });

    toPng(ref.current, {
      cacheBust: true,
      style: {
        transform: 'scale(1)', // Ensure scaling is applied
        width: 'auto', // Force proper width
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'certificate.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, isPhotoLoaded]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Base64 data URL
        setIsPhotoLoaded(true);
      };
      reader.readAsDataURL(file);
      setIsPhotoLoaded(false); // Mark photo as not loaded yet
    }
  };

  const handleImageLoad = () => {
    setIsPhotoLoaded(true); // Mark photo as loaded
  };
const checkoutHandler = async (amount) => {
try {
      console.log('Amount passed to checkoutHandler:', amount); // Debugging amount
  
      // Get API key
      const { data: { key } } = await axios.get('https://intern-a3y7.vercel.app/api/getkey');
      console.log('Fetched API Key:', key);
  
      // Create an order
      const { data: { order } } = await axios.post(
        'https://intern-a3y7.vercel.app/api/checkout',
        { amount },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('Order created:', order);


      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits
        currency: 'INR',
        name: 'Percy',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: order.id, // This is a sample Order ID
        callback_url: `https://intern-a3y7.vercel.app/api/paymentVerification`,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },

        handler: function (response) {
          // After successful payment, call `onButtonClick`
          console.log("Payment successful:", response);
          onButtonClick(); // Generate the resume
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Error in checkoutHandler:', error);
    }
   
  };
 

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <form className="flex flex-col gap-4 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Enter qualification"
          value={qualification}
          onChange={(e) => setqualification(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Enter experience"
          value={experience}
          onChange={(e) => setexperience(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Enter personal details"
          value={personal}
          onChange={(e) => setpersonal(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </form>
  
      <div
        className="relative w-[800px] bg-white shadow-lg overflow-hidden"
        ref={ref}
      >
        <img
          src={CertificateTemp}
          alt="Certificate Template"
          className="w-full h-auto"
        />
        <div className="absolute inset-0">
          <h1 className="absolute text-xl font-bold text-gray-800" style={{ top: "24%", left: "10%" }}>
            {name}
          </h1>
          <p className="absolute text-lg text-gray-600" style={{ top: "26.8%", left: "16%" }}>
            {qualification}
          </p>
          <p className="absolute text-lg text-gray-600" style={{ top: "29.5%", left: "15%" }}>
            {experience}
          </p>
          <p className="absolute text-lg text-gray-600" style={{ top: "32.2%", left: "17%" }}>
            {personal}
          </p>
        {photo && (
  <img
    src={photo}
    alt="Uploaded"
    className="photo-style absolute w-32 h-32 object-cover "
  />
)}

        </div>
        <div className="absolute bottom-[150vh] left-[25vw]">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="cursor-pointer border border-gray-300 rounded-lg px-3 py-1 focus:outline-none"
          />
        </div>
      </div>
  
      <button
        onClick={() => checkoutHandler(5000)}
        disabled={!isPhotoLoaded}
        className={`mt-6 px-6 py-2 rounded-lg text-white ${
          isPhotoLoaded ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Pay 50 for Resume
      </button>
    </div>
  );
  
};

export default Resume;
