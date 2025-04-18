import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapProps = {
  latitude: number;
  longitude: number;
  weatherConditionImg: string;
};

export default function Map({
  latitude,
  longitude,
  weatherConditionImg,
}: MapProps) {
  return (
    <div className="shadow-md rounded mx-8 mt-6 mb-8" style={{ height: 300 }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <img src={weatherConditionImg} />
          </Popup>
          <Tooltip>
            Current
            <img src={weatherConditionImg} />
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
}
