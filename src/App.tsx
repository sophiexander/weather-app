import { useState } from "react";
import "./App.css";
import Weather from "./weather";
import Search from "./search";

function App() {
  const [location, setLocation] = useState("");

  return (
    <div className="bg-amber-800">
      <div className="text-4xl">Weather {location}</div>
      <Search setLocation={setLocation} />
      <Weather location={location} />
    </div>
  );
}

export default App;
