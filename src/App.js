import React,{useEffect,useState} from 'react'
import { CssBaseline,Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import {getPlacesData } from './api'



export default function App() {
  const [places, setPlaces] = useState([])



  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('rating');
 

  // As we are setting below so now init value is not required 
 // const [coords, setCoords] = useState({lat:0,lng:0});
 const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [isLoading, setIsLoading] = useState(false);


// Click Map Card 
  const [childClicked, setChildClicked] = useState(null);

  // Filtered Places and change is going to happen when we change the rating

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  // How to get the use thing 

  // Fetch User Location by built in browser GeoLocation APi 


  // AutoComplete State 
  const [autocomplete, setAutocomplete] = useState(null);

  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);


  // Rating Type 

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);




  // WHat is going on here ,,, 
  // 1 We are setting up the coordinate and bounds by the google map in the map file 
  /// if they are changing then we are running GetPlacesData Api and fetch places Accordingly 
// Use google Chrome setting for this or simple scrool the map ok 

  useEffect(()=>{
    if (bounds.sw, bounds.ne) {
      setIsLoading(true);
    getPlacesData(type,bounds.sw,bounds.ne)
    .then((data)=>{  
      setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([]);
      setRating('');
      setIsLoading(false);
    })
  }},[type,bounds])


  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
   <>
   <CssBaseline/>
   <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
   <Grid container spacing={3} style={{width:'100%'}}>
     <Grid item xs={12} md={4}>
      <List  isLoading={isLoading}   places={filteredPlaces.length ? filteredPlaces : places}    childClicked={childClicked} type={type} rating={rating} setRating={setRating} setType={setType}/>
     </Grid>
     <Grid item xs={12} md={8}>
      <Map 
      setCoords={setCoords}
      setBounds={setBounds}
      coords={coords}
        places={filteredPlaces.length ? filteredPlaces : places}
      setChildClicked={setChildClicked}
      />
     </Grid>
   </Grid>
   </>
  )
}
