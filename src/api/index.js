/* eslint-disable consistent-return */
import axios from 'axios';

const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Key': '602dd61275msh72fc9f6d5b5b79ap12edf9jsn1c8e0437f275',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};