import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import useStyles from './styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails.js';

const List = ({places,isLoading,childClicked}) => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('rating');
 


  const [elRefs, setElRefs] = useState([]);
  const classes = useStyles();


/// useRef is used to scroll to a specific Item

/*
1 everytime Places change then it will called 
2 elRefs is having all the refrences 
3 here we are creating a Array having all the places then 
4 Then we map over that array using a index 
5 Then if ref is not there then we are creating ref


*/

  useEffect(() => {
    const refs =  Array(places.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs)

  }, [places]);
 

  return (
    <div className={classes.container}>
      <Typography variant="h4">Food & Dining around you</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
          {places && places.map((place, i) => (
              <Grid ref={elRefs[i]} key={i}  item xs={12}>
                 <PlaceDetails  selected={Number(childClicked) === i} refProp={elRefs[i]}  place={place}/>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
