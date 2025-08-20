import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, ColorSchemeProvider, DesignTokensProvider, ComboBox, Flex, Heading, IconButton, Label, Switch, Text, TextField, } from "gestalt";
import { useSound } from "use-sound";
import { cities, prefectures } from "./constants";
import { useEffect, useState } from "react";
import drumLoop from "/noise-drum-loop.mp3?url";
import crashCymbal from "/crash-cymbal.mp3?url";
import { Navigation, PickedCities } from "./components";
function App() {
    const [scheme, setScheme] = useState("userPreference");
    const [playDrum, { stop: stopDrum }] = useSound(drumLoop, {
        volume: 0.5,
    });
    const [playCrashCymbal, { stop: stopCrashCymbal }] = useSound(crashCymbal, {
        volume: 0.5,
    });
    const [isPlaySound, setIsPlaySound] = useState(false);
    const [isRandomPrefecture, setIsRandomPrefecture] = useState(false);
    const [prefectureStart, setPrefectureStart] = useState(false);
    const [pickedCity, setPickedCity] = useState(undefined);
    const [pickedCities, setPickedCities] = useState([]);
    const [start, setStart] = useState(false);
    const [pickedPrefecture, setPickedPrefecture] = useState(prefectures[0]);
    const optionPrefectures = prefectures.map((prefecture) => ({
        value: prefecture.pref_code,
        label: prefecture.pref_name,
    }));
    const selectPrefecture = (prefectureCode) => {
        const prefecture = prefectures.find((prefecture) => prefecture.pref_code === prefectureCode);
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
            }
            else {
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
                const currentCity = prefectureCity[Math.floor(Math.random() * prefectureCity.length)];
                if (!pickedCities.find((city) => city.city_code === currentCity.city_code)) {
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
            setPickedCities([...pickedCities, pickedCity]);
    }, [pickedCities, pickedCity, start]);
    return (_jsx(Flex, { alignContent: "center", justifyContent: "center", children: _jsx(ColorSchemeProvider, { colorScheme: scheme, children: _jsx(DesignTokensProvider, { children: _jsxs(Box, { color: "default", minHeight: "100vh", minWidth: "100vw", paddingX: 4, children: [_jsx(Navigation, { scheme: scheme, setScheme: setScheme }), _jsx(Flex, { justifyContent: "center", children: _jsxs(Box, { children: [_jsx(Heading, { accessibilityLevel: 1, children: "\u5E02\u753A\u6751\u30AC\u30C1\u30E3" }), _jsxs(Flex, { direction: "column", gap: 6, children: [_jsxs(Flex, { direction: "row", alignItems: "end", gap: 4, children: [_jsxs(Flex, { gap: 2, children: [_jsx(Label, { htmlFor: "isRandomPrefecture", children: _jsx(Text, { children: "\u30E9\u30F3\u30C0\u30E0\u3067\u90FD\u9053\u5E9C\u770C\u3092\u9078\u629E" }) }), _jsx(Switch, { id: "isRandomPrefecture", name: "isRandomPrefecture", switched: isRandomPrefecture, onChange: () => setIsRandomPrefecture(!isRandomPrefecture) })] }), _jsx(ComboBox, { label: "\u90FD\u9053\u5E9C\u770C", id: "prefecture", placeholder: "\u90FD\u9053\u5E9C\u770C\u3092\u9078\u629E", inputValue: pickedPrefecture?.pref_name || "", onSelect: (e) => selectPrefecture(e.item.value), onClear: () => setPickedPrefecture(undefined), disabled: isRandomPrefecture, options: optionPrefectures })] }), _jsxs(Flex, { alignItems: "end", gap: 4, children: [_jsx(Button, { text: "\u90FD\u9053\u5E9C\u770C\u30E9\u30F3\u30C0\u30E0\u9078\u629E", disabled: !isRandomPrefecture || start, onClick: () => {
                                                            setPickedCity(undefined);
                                                            setPrefectureStart(!prefectureStart);
                                                            soundEffect();
                                                        } }), _jsx(Button, { text: start ? "市町村ガチャストップ" : "市町村ガチャスタート", onClick: () => {
                                                            setStart(!start);
                                                            soundEffect();
                                                        }, color: "blue", disabled: pickedCities.length === 15 || !pickedPrefecture || prefectureStart }), _jsx(IconButton, { accessibilityLabel: "Toggle sound effect", size: "md", bgColor: isPlaySound ? "gray" : "transparent", icon: isPlaySound ? "music-on" : "music-off", onClick: () => setIsPlaySound(!isPlaySound) })] })] }), _jsx(Box, { marginTop: 4, children: _jsx(TextField, { id: "city", name: "city", label: "\u5E02\u753A\u6751", value: pickedPrefecture?.pref_name && pickedCity?.city_name
                                                ? `${pickedPrefecture.pref_name}${pickedCity.city_name}`
                                                : "", onChange: () => { } }) }), _jsx(PickedCities, { pickedCities: pickedCities, setPickedCity: setPickedCity, setPickedCities: setPickedCities })] }) })] }) }) }) }));
}
export default App;
