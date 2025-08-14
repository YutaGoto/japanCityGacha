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

import { cities, prefectures } from "./constants";
import { useEffect, useState, useMemo } from "react";
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

  const availableCities = useMemo(() => {
    if (!pickedPrefecture) {
      return [];
    }
    const pickedCityCodes = new Set(pickedCities.map((c) => c.city_code));
    return cities.filter(
      (city) =>
        city.pref_code === pickedPrefecture.pref_code &&
        !pickedCityCodes.has(city.city_code)
    );
  }, [pickedPrefecture, pickedCities]);

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
    setPickedCities([]);
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
    }, 50);

    return () => clearInterval(interval);
  }, [prefectureStart, isRandomPrefecture]);

  useEffect(() => {
    if (!start || availableCities.length === 0) {
      if (start) {
        setStart(false);
      }
      return;
    }

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableCities.length);
      setPickedCity(availableCities[randomIndex]);
    }, 50);

    return () => clearInterval(interval);
  }, [start, availableCities]);

  useEffect(() => {
    if (pickedCity && !start && !pickedCities.find(c => c.city_code === pickedCity.city_code)) {
      setPickedCities((prevPickedCities) => [...prevPickedCities, pickedCity]);
    }
  }, [pickedCity, start, pickedCities]);

  return (
    <Flex alignContent="center" justifyContent="center">
      <ColorSchemeProvider colorScheme={scheme}>
        <DesignTokensProvider>
          <Box color="default" minHeight="100vh" minWidth="100vw" paddingX={4}>
            <Navigation scheme={scheme} setScheme={setScheme} />
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
                        onChange={() =>
                          setIsRandomPrefecture(!isRandomPrefecture)
                        }
                      />
                    </Flex>
                    <ComboBox
                      label="都道府県"
                      id="prefecture"
                      placeholder="都道府県を選択"
                      inputValue={pickedPrefecture?.pref_name || ""}
                      onSelect={(e) => selectPrefecture(e.item.value)}
                      onClear={() => {
                        setPickedPrefecture(undefined);
                        setPickedCities([]);
                      }}
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
                        setPickedCities([]);
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
                      disabled={prefectureStart || availableCities.length === 0}
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
                  {start ? (
                    <Box>
                      <Label htmlFor="city-animation">
                        <Text>市町村</Text>
                      </Label>
                      <Box
                        borderStyle="sm"
                        color="default"
                        rounding={8}
                        paddingX={4}
                        paddingY={3}
                        height={50}
                        position="relative"
                        overflow="hidden"
                      >
                        <Text
                          color="subtle"
                          weight="bold"
                          size="300"
                          // @ts-expect-error: className is not in the type definition
                          className="gacha-animation-text"
                        >
                          <span>
                            {pickedPrefecture?.pref_name}
                            {pickedCity?.city_name}
                          </span>
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    <TextField
                      id="city"
                      name="city"
                      label="市町村"
                      value={
                        pickedPrefecture?.pref_name && pickedCity?.city_name
                          ? `${pickedPrefecture.pref_name}${pickedCity.city_name}`
                          : ""
                      }
                      onChange={() => {}}
                    />
                  )}
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