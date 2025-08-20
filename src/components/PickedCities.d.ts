import { City } from "../types";
interface PickedCitiesProps {
    pickedCities: City[];
    setPickedCity: (city: City | undefined) => void;
    setPickedCities: (cities: City[]) => void;
}
export declare const PickedCities: ({ pickedCities, setPickedCity, setPickedCities }: PickedCitiesProps) => import("react/jsx-runtime").JSX.Element;
export {};
