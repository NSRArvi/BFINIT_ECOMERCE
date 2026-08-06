import { useContext } from "react";
import { CountryContext } from "@/context/CountryContext";

export default function useCountry() {
  return useContext(CountryContext);
}
