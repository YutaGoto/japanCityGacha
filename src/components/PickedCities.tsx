import { Box, Heading, Button, Text } from "gestalt";
import type { City } from "../types";

interface PickedCitiesProps {
  pickedCities: City[];
  setPickedCity: (city: City | undefined) => void;
  setPickedCities: (cities: City[]) => void;
}

export const PickedCities = ({
  pickedCities,
  setPickedCity,
  setPickedCities,
}: PickedCitiesProps) => {
  return (
    <Box>
      <Box>
        <Heading accessibilityLevel={2}>選ばれた市町村</Heading>

        {pickedCities.map((city) => (
          <Text key={city.city_code}>{city.name}</Text>
        ))}
      </Box>

      <Box marginTop={2}>
        <Button
          text="リセット"
          color="red"
          onClick={() => {
            setPickedCity(undefined);
            setPickedCities([]);
          }}
        />
      </Box>
    </Box>
  );
};
