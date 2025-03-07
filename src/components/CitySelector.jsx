import React, {useState, useEffect} from "react";
import axios from 'axios';
import styles from "./CitySelector.module.css";
const CitySelector = () => {
    const [countries, setCounties] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    useEffect(() => {
        axios.get("https://crio-location-selector.onrender.com/countries").then((response) => {
            setCounties(response.data);
        })
        .catch((error) => {
            console.error("Error fetching countries: ", error);
        });
    }, []);
    useEffect(() => {
        if(selectedCountry){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`).then((response) => {
                setStates(response.data);
                setSelectedState("");
                setCities([]);
                setSelectedCity("");
            })
            .catch((error) => {
                console.error("Error fetching state: ", error);
            });
        }
    }, [selectedCountry]);
    useEffect(() =>{
        if(selectedCountry && selectedState){
            axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`).then((response) => {
                setCities(response.data);
                setSelectedCity("");
            })
            .catch((error) => {
                console.error("Error fetching city: ", error);
            });
        }
    }, [selectedCountry, selectedState]);
    return(
        <div className={styles.dropdownbody}>
            <h1>Select Location</h1>
            <div className={styles.selectcontain}>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className={styles.dropdown1}>
                    <option value="" disabled>
                        Select Country
                    </option>
                    {countries.map((country) =>(
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} disabled={!selectedCountry} className={styles.dropdown2}>
                    <option value="" disabled>
                        Select State
                    </option>
                    {states.map((state) =>(
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState} className={styles.dropdown3}>
                    <option value="" disabled>
                        Select City
                    </option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {selectedCity && selectedState && selectedCountry && (<p>You selected <span className={styles.city}>{selectedCity}</span>,{" "}<spam className={styles.state}>{selectedState}</spam>,{" "}<spam className={styles.country}>{selectedCountry}</spam></p>)}
        </div>
    )
}
export default CitySelector;