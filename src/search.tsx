import { SyntheticEvent } from "react";
import "./App.css";

interface FormElements extends HTMLFormControlsCollection {
  locationInput: HTMLInputElement;
}
interface LocationFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

type SearchProps = {
  setLocation: (location: string) => void;
};

export default function Search({ setLocation }: SearchProps) {
  const handleSubmit = (event: SyntheticEvent<LocationFormElement>) => {
    event.preventDefault();
    setLocation(event.currentTarget.elements.locationInput.value);
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="locationInput"
            type="text"
            placeholder="Location"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </>
  );
}
