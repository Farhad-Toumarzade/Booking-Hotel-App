import { createContext, useContext, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
export default function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoaadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}
      `);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{ isLoading, hotels, currentHotel, getHotel, isLoaadingCurrHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
