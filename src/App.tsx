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
import { useCallback, useEffect, useReducer, useState } from "react";
import type { ColorSchemeType } from "./types";
import { gachaReducer, initialState } from "./reducers/gachaReducer";
import drumLoop from "/noise-drum-loop.mp3?url";
import crashCymbal from "/crash-cymbal.mp3?url";
import { Navigation, PickedCities } from "./components";

function App() {
  const [scheme, setScheme] = useState<ColorSchemeType>("userPreference");
  const [isPlaySound, setIsPlaySound] = useState<boolean>(false);

  const [state, dispatch] = useReducer(gachaReducer, initialState);
  const {
    start,
    prefectureStart,
    pickedCity,
    pickedCities,
    pickedPrefecture,
    isRandomPrefecture,
  } = state;

  const [playDrum, { stop: stopDrum }] = useSound(drumLoop, { volume: 0.5 });
  const [playCrashCymbal, { stop: stopCrashCymbal }] = useSound(crashCymbal, { volume: 0.5 });

  const handleStartGachaSound = useCallback(() => {
    if (isPlaySound) {
      playDrum();
      stopCrashCymbal();
    }
  }, [isPlaySound, playDrum, stopCrashCymbal]);

  const handleStopGachaSound = useCallback(() => {
    if (isPlaySound) {
      stopDrum();
      playCrashCymbal();
    }
  }, [isPlaySound, stopDrum, playCrashCymbal]);

  const handleSelectPrefecture = (prefectureCode: string) => {
    const prefecture = prefectures.find(p => p.pref_code === prefectureCode);
    if (prefecture) {
      dispatch({ type: "SELECT_PREFECTURE", payload: prefecture });
    }
  };

  useEffect(() => {
    if (!prefectureStart) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * prefectures.length);
      dispatch({ type: "SET_PICKED_PREFECTURE", payload: prefectures[randomIndex] });
    }, 10);

    return () => clearInterval(interval);
  }, [prefectureStart]);

  useEffect(() => {
    if (!start) return;

    const prefectureCity = cities.filter(
      (city) => city.pref_code === pickedPrefecture?.pref_code
    );
    const availableCities = prefectureCity.filter(
      (city) => !pickedCities.find((pc) => pc.city_code === city.city_code)
    );

    if (availableCities.length === 0 || pickedCities.length >= 15) {
      handleStopGachaSound();
      dispatch({ type: "STOP_CITY_GACHA" });
      return;
    }

    const interval = setInterval(() => {
      const currentCity =
        availableCities[Math.floor(Math.random() * availableCities.length)];
      dispatch({ type: "SET_PICKED_CITY", payload: currentCity });
    }, 10);

    return () => clearInterval(interval);
  }, [start, pickedPrefecture, pickedCities, handleStopGachaSound]);

  const optionPrefectures = prefectures.map((p) => ({
    value: p.pref_code,
    label: p.pref_name,
  }));

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
                        onChange={() => dispatch({ type: "TOGGLE_RANDOM_PREFECTURE" })}
                      />
                    </Flex>
                    <ComboBox
                      label="都道府県"
                      id="prefecture"
                      placeholder="都道府県を選択"
                      inputValue={pickedPrefecture?.pref_name || ""}
                      onSelect={(e) => handleSelectPrefecture(e.item.value)}
                      onClear={() => dispatch({ type: "CLEAR_PREFECTURE" })}
                      disabled={isRandomPrefecture}
                      options={optionPrefectures}
                    />
                  </Flex>
                  <Flex alignItems="end" gap={4}>
                    <Button
                      text={prefectureStart ? "都道府県選択ストップ" : "都道府県ランダム選択"}
                      disabled={!isRandomPrefecture || start}
                      onClick={() => {
                        if (prefectureStart) {
                          handleStopGachaSound();
                          dispatch({ type: "STOP_PREFECTURE_GACHA" });
                        } else {
                          handleStartGachaSound();
                          dispatch({ type: "START_PREFECTURE_GACHA" });
                        }
                      }}
                    />
                    <Button
                      text={start ? "市町村ガチャストップ" : "市町村ガチャスタート"}
                      onClick={() => {
                        if (start) {
                          handleStopGachaSound();
                          dispatch({ type: "STOP_CITY_GACHA" });
                        } else {
                          handleStartGachaSound();
                          dispatch({ type: "START_CITY_GACHA" });
                        }
                      }}
                      color={"blue"}
                      disabled={
                        pickedCities.length >= 15 ||
                        !pickedPrefecture ||
                        prefectureStart
                      }
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
                    onChange={() => {}}
                  />
                </Box>
                <PickedCities
                  pickedCities={pickedCities}
                  setPickedCity={(city) => dispatch({ type: "SET_PICKED_CITY", payload: city })}
                  setPickedCities={(cities) => dispatch({ type: "SET_PICKED_CITIES", payload: cities })}
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