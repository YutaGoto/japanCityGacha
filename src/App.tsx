import {
  Box,
  Button,
  ColorSchemeProvider,
  Flex,
  Heading,
  IconButton,
  IconButtonLink,
  SelectList,
  Text,
  TextField,
} from "gestalt";

import { cities } from "./cities";
import { prefectures } from "./prefectures";
import { useState } from "react";
import { ColorScheme } from "gestalt/dist/contexts/ColorSchemeProvider";

interface City {
  type: string;
  code: string;
  name: string;
  kana: string;
  city_code: string;
  city_name: string;
  city_kana: string;
  pref_code: string;
  pref_name: string;
  pref_kana: string;
}

function App() {
  const [scheme, setScheme] = useState<ColorScheme>("userPreference");

  const [pickedCity, setPickedCity] = useState<City | undefined>(undefined);
  const [pickedCities, setPickedCities] = useState<City[]>([]);

  const [pickedPrefecture, setPickedPrefecture] = useState({
    pref_name: "北海道",
    pref_code: "010006",
  });

  const selectPrefecture = (prefectureCode: string) => {
    const prefecture = prefectures.find(
      (prefecture) => prefecture.pref_code === prefectureCode
    );
    if (!prefecture) {
      return;
    }
    setPickedCity(undefined);
    setPickedPrefecture(prefecture);
  };

  const pickCity = () => {
    const prefectureCity = cities.filter((city) => {
      return city.pref_code === pickedPrefecture.pref_code;
    });
    const randomIndex = Math.floor(Math.random() * prefectureCity.length);
    setPickedCity(prefectureCity[randomIndex]);
    setPickedCities([...pickedCities, prefectureCity[randomIndex]]);
  };

  return (
    <Flex alignContent="center" justifyContent="center">
      <ColorSchemeProvider colorScheme={scheme}>
        <Box color="default" minHeight="100vh" minWidth="100vw" paddingX={4}>
          <Box
            role="navigation"
            direction="row"
            display="flex"
            justifyContent="end"
            paddingX={4}
            paddingY={3}
          >
            <IconButton
              accessibilityLabel="Toggle color scheme"
              icon={scheme === "light" ? "moon" : "sun"}
              onClick={() => setScheme(scheme === "light" ? "dark" : "light")}
            />
            <IconButtonLink
              accessibilityLabel="GitHub"
              href="https://github.com/YutaGoto/japanCityGacha"
              target="blank"
              rel="nofollow"
              icon="visit"
            />
          </Box>
          <Flex justifyContent="center">
            <Box>
              <Heading accessibilityLevel={1}>市区町村ルーレット</Heading>
              <Flex alignItems="end" gap={4}>
                <SelectList
                  label="都道府県"
                  id="prefecture"
                  value={pickedPrefecture.pref_code}
                  onChange={(e) => selectPrefecture(e.value)}
                >
                  {prefectures.map((prefecture) => (
                    <SelectList.Option
                      key={prefecture.pref_code}
                      value={prefecture.pref_code}
                      label={prefecture.pref_name}
                    />
                  ))}
                </SelectList>
                <Button text="市町村ルーレット" onClick={pickCity} />
              </Flex>
              <Box marginTop={4}>
                {pickedCity?.city_name && (
                  <TextField
                    id="city"
                    name="city"
                    value={`${pickedPrefecture.pref_name}${pickedCity.city_name}`}
                    onChange={() => {}}
                  />
                )}
              </Box>
              <Box>
                <Heading accessibilityLevel={2}>選ばれた市町村</Heading>

                {pickedCities.map((city) => (
                  <Text key={city.city_code}>{city.name}</Text>
                ))}
              </Box>
            </Box>
          </Flex>
        </Box>
      </ColorSchemeProvider>
    </Flex>
  );
}

export default App;
