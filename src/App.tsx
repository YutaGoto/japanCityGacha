import {
  Box,
  Button,
  ButtonLink,
  ColorSchemeProvider,
  ComboBox,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
} from "gestalt";

import { cities } from "./cities";
import { prefectures } from "./prefectures";
import { useState } from "react";
import { ColorScheme } from "gestalt/dist/contexts/ColorSchemeProvider";
import type { City, Prefecture } from "./types";

function App() {
  const [scheme, setScheme] = useState<ColorScheme>("userPreference");

  const [pickedCity, setPickedCity] = useState<City | undefined>(undefined);
  const [pickedCities, setPickedCities] = useState<City[]>([]);

  const [pickedPrefecture, setPickedPrefecture] = useState<
    Prefecture | undefined
  >(prefectures[0]);

  const optionPrefectures = prefectures.map((prefecture) => ({
    value: prefecture.pref_code,
    label: prefecture.pref_name,
  }));

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

    let randomIndex: number;
    while (true) {
      randomIndex = Math.floor(Math.random() * prefectureCity.length);
      if (
        !pickedCities.find(
          (city) => city.city_code === prefectureCity[randomIndex].city_code
        )
      ) {
        break;
      }
    }

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
            <ButtonLink
              text="GitHub"
              accessibilityLabel="GitHub"
              color="transparent"
              href="https://github.com/YutaGoto/japanCityGacha"
              target="blank"
              rel="nofollow"
              iconStart="visit"
            />
            <ButtonLink
              text="市町村一覧"
              accessibilityLabel="市町村一覧"
              color="transparent"
              href="https://github.com/nojimage/local-gov-code-jp/blob/ba7a68463e2c68996e6a993640c21296a9cb0785/cities.json"
              target="blank"
              rel="nofollow"
              iconStart="visit"
            />
          </Box>
          <Flex justifyContent="center">
            <Box>
              <Heading accessibilityLevel={1}>市区町村ルーレット</Heading>
              <Flex alignItems="end" gap={4}>
                <ComboBox
                  label="都道府県"
                  id="prefecture"
                  placeholder="都道府県を選択"
                  inputValue={pickedPrefecture?.pref_name || ""}
                  onSelect={(e) => selectPrefecture(e.item.value)}
                  onClear={() => setPickedPrefecture(undefined)}
                  options={optionPrefectures}
                />
                <Button
                  text="市町村ルーレット"
                  onClick={pickCity}
                  disabled={pickedCities.length === 15 || !pickedPrefecture}
                />
              </Flex>
              <Box marginTop={4}>
                <TextField
                  id="city"
                  name="city"
                  value={
                    pickedPrefecture?.pref_name && pickedCity?.city_name
                      ? `${pickedPrefecture.pref_name}${pickedCity.city_name}`
                      : ""
                  }
                  onChange={() => {}}
                />
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
