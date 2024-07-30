import { HOST_WITH_PORT, WEATHER_API_KEY } from "../consts";
import axios from "axios";

export const addNewPlace = async (newRequest: any) => {
  await axios.post(`${HOST_WITH_PORT}/api/place`, newRequest);
};

export const getAllPlaces = async () => {
  return axios.get(`${HOST_WITH_PORT}/api/places`);
};

export const getWeather = async (lat: number, lon: number) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`,
  );
};
