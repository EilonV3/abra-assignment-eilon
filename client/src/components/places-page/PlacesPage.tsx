import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { getAllPlaces, getWeather } from "../../api/api";
import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../../consts";
import { Link } from "react-router-dom";
// @ts-ignore
import styles from "./PlacesPage.module.css";
interface Place {
  id: string;
  address: GeoLocation;
  type: string;
  name: string;
}
interface GeoLocation {
  lat: number;
  lng: number;
}
export const PlacesPage = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place>({
    name: "hotel",
    id: "1",
    type: "hotel",
    address: { lat: 32.109333, lng: 34.855499 },
  });
  useEffect(() => {
    // @ts-ignore
    const fetchRequest = async () => {
      try {
        const response = await getAllPlaces();
        setPlaces(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequest();
  }, []);
  // @ts-ignore
  const handleGetWeather = async () => {
      const weather = await getWeather(
          selectedPlace.address.lat,
          selectedPlace.address.lng,
      );
      console.log(weather);
  };

  const Table = () => (
    <table className="requests-table">
      <thead>
        <tr>
          <th>Request ID</th>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place: Place) => (
          <tr
            key={place.id}
            onClick={() => {
              setSelectedPlace(place);
              handleGetWeather();
            }}
            className={selectedPlace.id == place.id ? styles.selectedplace : ""}
          >
            <td>{place.id}</td>
            <td>{place.name}</td>
            <td>{place.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const PlacesMap = () => (
    <APIProvider
      apiKey={GOOGLE_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div style={{ height: "80vh", width: "100vh" }}>
        <Map defaultZoom={13} center={selectedPlace?.address}>
          {places.map((place) => (
            <Marker
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              position={place.address}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );

  return (
    <>
      <PlacesMap />
      {<Table />}

      <Link to="/add-place" className="welcome-button">
        Add a new place!!!
      </Link>
    </>
  );
};
