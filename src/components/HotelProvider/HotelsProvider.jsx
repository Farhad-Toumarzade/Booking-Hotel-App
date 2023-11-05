import { createContext, useContext } from "react";
import useFetch from "../../Hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const HotelContext = createContext();

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
