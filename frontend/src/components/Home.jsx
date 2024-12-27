import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import Header from "./Header";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
const Home = () => {
  const [coordinate, setCoordinate] = React.useState({
    lat: 1,
    long: 1,
  });
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.data);
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const isSuccess = useSelector((state) => state.isSuccess);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinate({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);

  React.useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    VenueDataService.nearbyVenues(coordinate.lat, coordinate.long)
      .then(function (response) {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch(function () {
        dispatch({ type: "FETCH_FAILURE" });
      });
  }, [coordinate.lat, coordinate.long]);
  //üstteki konumu sürekli güncellesin diye var


  const [searchTerm, setSearchTerm] = React.useState("");


  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div>
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={handleSearchInputChange}
        value={searchTerm}
      />
      <hr />
      <div className="row">
        {isError ? (
          <p>Hata var.</p>
        ) : isLoading ? (
          <p>Mekanlar Yükleniyor...</p>
        ) : (
          isSuccess && <VenueList venues={filteredVenues} />
        )}
      </div>
    </div>
  );
};

export default Home;
