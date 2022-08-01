/* eslint-disable consistent-return */
import axios from 'axios';



export const getPlacesData = async (type,sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'X-RapidAPI-Key': '602dd61275msh72fc9f6d5b5b79ap12edf9jsn1c8e0437f275',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};