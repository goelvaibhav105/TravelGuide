import React,{useEffect,useState} from 'react'
import { CssBaseline,Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'

import {getPlacesData } from './api'



export default function App() {
  const [places, setPlaces] = useState([])
  const [rating, setRating] = useState('');

  // As we are setting below so now init value is not required 
 // const [coords, setCoords] = useState({lat:0,lng:0});
 const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // How to get the use thing 

  // Fetch User Location by built in browser GeoLocation APi 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);



  // WHat is going on here ,,, 
  // 1 We are setting up the coordinate and bounds by the google map in the map file 
  /// if they are changing then we are running GetPlacesData Api and fetch places Accordingly 
// Use google Chrome setting for this or simple scrool the map ok 

  useEffect(()=>{
    if (bounds) {
      setIsLoading(true);
    getPlacesData(bounds.sw,bounds.ne)
    .then((data)=>{
      console.log(data,"heyyy ")
      setPlaces(data)
      setIsLoading(false)
    })
  }},[coords,bounds])

  return (
   <>
   <CssBaseline/>
   <Header/>
   <Grid container spacing={3} style={{width:'100%'}}>
     <Grid item xs={12} md={4}>
      <List  isLoading={isLoading} places={places}/>
     </Grid>
     <Grid item xs={12} md={8}>
      <Map 
      setCoords={setCoords}
      setBounds={setBounds}
      coords={coords}
      places={places}
      />
     </Grid>
   </Grid>
   </>
  )
}
