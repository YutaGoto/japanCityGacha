import { Box, Heading, Button, Text } from "gestalt";
import { City } from "../types";

interface PickedCitiesProps {
  pickedCities: City[];
  setPickedCity: (city: City | undefined) => void;
  setPickedCities: (cities: City[]) => void;
}

export const PickedCities = ({ pickedCities, setPickedCity, setPickedCities }: PickedCitiesProps) => {
  return (
    <Box>
      <Box>
        <Heading accessibilityLevel={2}>選ばれた市町村</Heading>

        {[...pickedCities].reverse().map((city, index) =>
          index === 0 ? (
            <div key={city.city_code} className="newly-picked">
              <Box color="infoWeak" padding={2} rounding={2} marginTop={2}>
                <Text weight="bold">{city.name}</Text>
              </Box>
            </div>
          ) : (
            <Box key={city.city_code} paddingY={1} marginTop={2}>
              <Text>{city.name}</Text>
            </Box>
          )
        )}
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
