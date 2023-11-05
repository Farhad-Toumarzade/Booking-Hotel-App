import { useSearchParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader/Loader";

export default function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("option"))?.room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  if (isLoading) <Loader />;

  return <div>{data.length}</div>;
}
