import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { getPlaces } from "../http.js";
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // exp1
  // useEffect(()=>{
  //   fetch('http://localhost:3000/places').then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     setAvailablePlaces(data.places);
  //   })
  // },[])

  // exp2

  useEffect(() => {
    const fetchAvailablePlaces = async () => {
      try {
       const data=await getPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });
      } catch (error) {
        setError({ message: error.message || "Something went wrong!" });
        setIsLoading(false);
      }
      
    };

    fetchAvailablePlaces();
  }, []);
  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText="Loading places..."
      isLoading={isLoading}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
