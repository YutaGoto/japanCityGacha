import {
  Box,
  Button,
  ColorSchemeProvider,
  DesignTokensProvider,
  ComboBox,
  Flex,
  Heading,
  IconButton,
  Label,
  Switch,
  Text,
  TextField,
} from "gestalt";
import { useSound } from "use-sound";

import { cities } from "./cities";
import { prefectures } from "./prefectures";
import { useEffect, useState } from "react";
import type { City, ColorSchemeType, Prefecture } from "./types";
import drumLoop from "/noise-drum-loop.mp3?url";
import crashCymbal from "/crash-cymbal.mp3?url";
import { Navigation, PickedCities } from "./components";

function App() {
  const [scheme, setScheme] = useState<ColorSchemeType>("userPreference");

  const [playDrum, { stop: stopDrum }] = useSound(drumLoop, {
    volume: 0.5,
  });
  const [playCrashCymbal, { stop: stopCrashCymbal }] = useSound(crashCymbal, {
    volume: 0.5,
  });
  const [isPlaySound, setIsPlaySound] = useState<boolean>(false);

  const [isRandomPrefecture, setIsRandomPrefecture] = useState<boolean>(false);
  const [prefectureStart, setPrefectureStart] = useState<boolean>(false);
  const [pickedCity, setPickedCity] = useState<City | undefined>(undefined);
  const [pickedCities, setPickedCities] = useState<City[]>([]);
  const [start, setStart] = useState<boolean>(false);

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

  const soundEffect = () => {
    if (isPlaySound) {
      if (!start && !prefectureStart) {
        playDrum();
        stopCrashCymbal();
      } else {
        stopDrum();
        playCrashCymbal();
      }
    }
  };

  useEffect(() => {
    if (!prefectureStart || !isRandomPrefecture) {
      return;
    }

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * prefectures.length);
      setPickedPrefecture(prefectures[randomIndex]);
    }, 10);

    return () => clearInterval(interval);
  }, [prefectureStart, isRandomPrefecture]);

  useEffect(() => {
    if (!start || !pickedPrefecture) {
      return;
    }
    const prefectureCity = cities.filter((city) => {
      return city.pref_code === pickedPrefecture?.pref_code;
    });

    const interval = setInterval(() => {
      while (true) {
        const currentCity =
          prefectureCity[Math.floor(Math.random() * prefectureCity.length)];

        if (
          !pickedCities.find((city) => city.city_code === currentCity.city_code)
        ) {
          setPickedCity(currentCity);
          break;
        }
      }
    }, 10);

    return () => clearInterval(interval);
  }, [start, pickedPrefecture, pickedCities, pickedCity]);

  useEffect(() => {
    if (pickedCities.length === 15) {
      setStart(false);
    }
  }, [pickedCities]);

  useEffect(() => {
    if (pickedCity && !start && !pickedCities.includes(pickedCity))
      setPickedCities([...pickedCities, pickedCity!]);
  }, [pickedCities, pickedCity, start]);

  return (
    <Flex alignContent="center" justifyContent="center">
      <ColorSchemeProvider colorScheme={scheme}>
        <DesignTokensProvider>
        <Box color="default" minHeight="100vh" minWidth="100vw" paddingX={4}>
          <Navigation
            scheme={scheme}
            setScheme={setScheme}
          />
          <Flex justifyContent="center">
            <Box>
              <Heading accessibilityLevel={1}>市町村ガチャ</Heading>
              <Flex direction="column" gap={6}>
                <Flex direction="row" alignItems="end" gap={4}>
                  <Flex gap={2}>
                    <Label htmlFor="isRandomPrefecture">
                      <Text>ランダムで都道府県を選択</Text>
                    </Label>
                    <Switch
                      id="isRandomPrefecture"
                      name="isRandomPrefecture"
                      switched={isRandomPrefecture}
                      onChange={() => setIsRandomPrefecture(!isRandomPrefecture)}
                    />
                  </Flex>
                  <ComboBox
                    label="都道府県"
                    id="prefecture"
                    placeholder="都道府県を選択"
                    inputValue={pickedPrefecture?.pref_name || ""}
                    onSelect={(e) => selectPrefecture(e.item.value)}
                    onClear={() => setPickedPrefecture(undefined)}
                    disabled={isRandomPrefecture}
                    options={optionPrefectures}
                  />
                </Flex>
                <Flex alignItems="end" gap={4}>
                  <Button
                    text="都道府県ランダム選択"
                    disabled={!isRandomPrefecture || start}
                    onClick={() => {
                      setPickedCity(undefined);
                      setPrefectureStart(!prefectureStart);
                      soundEffect();
                    }}
                  />
                  <Button
                    text={start ? "市町村ガチャストップ" : "市町村ガチャスタート"}
                    onClick={() => {
                      setStart(!start);
                      soundEffect();
                    }}
                    color={"blue"}
                    disabled={pickedCities.length === 15 || !pickedPrefecture || prefectureStart}
                  />
                  <IconButton
                    accessibilityLabel="Toggle sound effect"
                    size="md"
                    bgColor={isPlaySound ? "gray" : "transparent"}
                    icon={isPlaySound ? "music-on" : "music-off"}
                    onClick={() => setIsPlaySound(!isPlaySound)}
                  />
                </Flex>
              </Flex>
              <Box marginTop={4}>
                <TextField
                  id="city"
                  name="city"
                  label="市町村"
                  value={
                    pickedPrefecture?.pref_name && pickedCity?.city_name
                      ? `${pickedPrefecture.pref_name}${pickedCity.city_name}`
                      : ""
                  }
                  onChange={() => { }}
                />
              </Box>
              <PickedCities
                pickedCities={pickedCities}
                setPickedCity={setPickedCity}
                setPickedCities={setPickedCities}
              />
            </Box>
            </Flex>
          </Box>
        </DesignTokensProvider>
      </ColorSchemeProvider>
    </Flex>
  );
}

export default App;
