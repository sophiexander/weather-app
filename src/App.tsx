import { useState } from "react";
import "./App.css";
import Weather from "./weather";
import Search from "./search";

function App() {
  const [location, setLocation] = useState("Auckland");

  return (
    <div className="">
      <div className="text-4xl">Weather {location}</div>
      <Search setLocation={setLocation} />
      <Weather location={location} />
    </div>
  );
}

export default App;
