import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../Feature/Userslice'
import { Link } from 'react-router-dom'
import GoogleMapReact from "google-map-react";


function Profile() {
  // const [user, setUser] = useState(null);

// useEffect(() => {
//   fetchUserData(); // Assume this function fetches the user object.
// }, []);

// const fetchUserData = async () => {
//   const response = await fetch("https://api.example.com/user");
//   const data = await response.json();
//   setUser(data);
// };
    const user=useSelector(selectUser)
console.log(user);

    const [location, setLocation] = useState(null);
    const [weather, setWeather] = useState(null);
    const [addressDetails, setAddressDetails] = useState({
      city: "",
      state: "",
      country: "",
    });
  
    const MapMarker = ({ text }) => (
      <div style={{ color: "red", fontWeight: "bold" }}>{text}</div>
    );
    

    const fetchLocationAndWeather = async () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
      
          try {
            const geocodeResponse = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD0Mth2AxAnyFCwrzWiTR8HtUTCfAVSPqE`
            );
            const geocodeData = await geocodeResponse.json();
  
            if (geocodeData.results && geocodeData.results.length > 0) {
              const address = geocodeData.results[0].formatted_address;
              const components = geocodeData.results[0].address_components;
  
              const city = components.find((comp) =>
                comp.types.includes("locality")
              )?.long_name;
              const state = components.find((comp) =>
                comp.types.includes("administrative_area_level_1")
              )?.long_name;
              const country = components.find((comp) =>
                comp.types.includes("country")
              )?.long_name;
              console.log("City:", city || "Not Found");
              console.log("State:", state || "Not Found");
              console.log("Country:", country || "Not Found");
  
              setLocation({ latitude, longitude, address });
              setAddressDetails({ city, state, country });
            } else {
              alert("Unable to fetch address for the given location.");
            }
            //fetch weather data
            const weatherResponse = await fetch(
              `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=YV99LQFWPEVU9MV6PFA4RZJGP`
            );
            const weatherData = await weatherResponse.json();
  
            if (weatherData) {
              setWeather({
                temperature: weatherData.currentConditions.temp,
                condition: weatherData.currentConditions.conditions,
              });
            } else {
              alert("Unable to fetch weather data.");
            }
          } catch (error) {
            alert("An error occurred while fetching location data.");
            console.error("Error fetching geocode data:", error);
          }
        },
        (error) => {
          alert("Failed to retrieve location: " + error.message);
          console.error("Geolocation error:", error);
        }
        );
      };  
  return (
    <div>
      <div className="flex items-center mt-9 mb-4 justify-center">
        <div className='max-w-xs'>
            <div className='bg-white shadow-lg rounded-lg py-3'>
   <div className="photo-wrapper p-2">
   <img src={user?.photo} alt="" className="w-32 h-32 rounded-full mx-auto" />
   </div>
<div className='p-2'>

    <h3 className='text-center text-xl text-gray-900'>{user?.name}</h3>
</div>
<div className='text-xs my-3'>
<h3 className='text-xl font-bold'>UID</h3>
    <h3 className='text-center text-lg text-gray-900'>{user?.uid}</h3>
</div>
<div>

<h3  className='text-xl font-bold'>Email</h3>
    <h3 className='text-center text-xl text-gray-900'>{user?.email}</h3>
</div>
<div className='flex justify-center mt-3' >

<Link to="/userapplication" class="relative  items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-blue-600 rounded-full hover:bg-white group">
<span class="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
<span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-blue-600">View Applciations</span>
</Link>

</div>
<div style={{textAlign:" centre" ,position :"absolute" ,left:"200px" , top:"150px"}}>
<button onClick={fetchLocationAndWeather}>Obtain Location</button>
{location && (
      <div style={{ marginTop: "20px" }}>
        <h3>City: {addressDetails.city || "N/A"}</h3>
        <h3>State: {addressDetails.state || "N/A"}</h3>
        <h3>Country: {addressDetails.country || "N/A"}</h3>
      </div>
    )}
    {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Weather Information:</h3>
          <p>
            <strong>Temperature:</strong> {weather.temperature}°C
          </p>
          <p>
            <strong>Condition:</strong> {weather.condition}
          </p>
        </div>
      )}

{location && (
      <div style={{ height: "100px", width: "100%", marginTop: "20px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyD0Mth2AxAnyFCwrzWiTR8HtUTCfAVSPqE",
          }}
          center={{
            lat: location.latitude,
            lng: location.longitude,
          }}
          zoom={12}
        >
          <MapMarker
            lat={location.latitude}
            lng={location.longitude}
            text="You are here!"
          />
        </GoogleMapReact>
      </div>
    )}
</div>
</div>
</div>
</div>
</div>
   
  )
}

export default Profile
