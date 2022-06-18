import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import tesla from "./tesla.js";
import { Icon } from "leaflet";

const teslaIcon = new Icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png",
  iconSize: [44, 44],
});

function App() {
  console.log(tesla);
  const teslaUSA = tesla.filter(
    (northcarolina) => northcarolina.address.state === "NC"
  );
  return (
    <MapContainer
      center={[37.8230613, -97.6339304]}
      zoom={2.2}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {teslaUSA.map((location) => (
        <Marker
          key={location.id}
          icon={teslaIcon}
          position={[location.gps.latitude, location.gps.longitude]}
        >
          <Popup position={[location.gps.latitude, location.gps.longitude]}>
            <div>
              <h2>{location.name}</h2>
              <p>CHARGING STATIONS: {location.stallCount}</p>
              <p>STATUS: {location.status}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
