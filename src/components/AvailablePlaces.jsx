import Places from './Places.jsx';
import { useEffect, useState } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
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
   const response = await fetch('http://localhost:3000/places');
   const data = await response.json();
   setAvailablePlaces(data.places);
 }

 fetchAvailablePlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
