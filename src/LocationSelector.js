// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LocationSelector = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Fetch all countries on initial render
//     axios
//       .get("https://crio-location-selector.onrender.com/countries")
//       .then((response) => {
//         setCountries(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching countries:", error);
//       });
//   }, []);

//   const handleCountryChange = (event) => {
//     const country = event.target.value;
//     setSelectedCountry(country);
//     setSelectedState("");
//     setSelectedCity("");

//     // Fetch states of the selected country
//     axios
//       .get(
//         `https://crio-location-selector.onrender.com/country=${country}/states`
//       )
//       .then((response) => {
//         setStates(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching states:", error);
//       });
//   };

//   const handleStateChange = (event) => {
//     const state = event.target.value;
//     setSelectedState(state);
//     setSelectedCity("");

//     // Fetch cities of the selected state in the selected country
//     axios
//       .get(
//         `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
//       )
//       .then((response) => {
//         setCities(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching cities:", error);
//       });
//   };

//   const handleCityChange = (event) => {
//     const city = event.target.value;
//     setSelectedCity(city);
//   };

//   return (
//     <div>
//       <select value={selectedCountry} onChange={handleCountryChange}>
//         <option value="">Select Country</option>
//         {countries.map((country) => (
//           <option key={country} value={country}>
//             {country}
//           </option>
//         ))}
//       </select>

//       {selectedCountry && (
//         <select value={selectedState} onChange={handleStateChange}>
//           <option value="">Select State</option>
//           {states.map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//       )}

//       {selectedState && (
//         <select value={selectedCity} onChange={handleCityChange}>
//           <option value="">Select City</option>
//           {cities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       )}
//       {selectedCity && (
//         <p>
//           You Selected {selectedCity},{selectedState},{selectedCountry}
//         </p>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;

import React, { useState, useEffect } from "react";
import "./LocationSelector.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateDropdownDisabled, setStateDropdownDisabled] = useState(true);
  const [cityDropdownDisabled, setCityDropdownDisabled] = useState(true);

  useEffect(() => {
    // Fetch all countries
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedCity("");
    setStateDropdownDisabled(false);
    setCityDropdownDisabled(true);

    // Fetch states of the selected country
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
    )
      .then((response) => response.json())
      .then((data) => {
        setStates(data);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedCity("");
    setCityDropdownDisabled(false);

    // Fetch cities of the selected state in the selected country
    fetch(
      `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
    )
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  };

  return (
    <div className="city-selector">
      <h1>Select Locaton</h1>
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="dropdown"
        >
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={stateDropdownDisabled}
          className="dropdown"
        >
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={cityDropdownDisabled}
          className="dropdown"
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className="highlight">{selectedCity}</span>,
          <span className="fade">
            {""}
            {selectedState},{selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};

export default LocationSelector;
