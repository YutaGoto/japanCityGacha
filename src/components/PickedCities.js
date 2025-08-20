import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Heading, Button, Text } from "gestalt";
export const PickedCities = ({ pickedCities, setPickedCity, setPickedCities }) => {
    return (_jsxs(Box, { children: [_jsxs(Box, { children: [_jsx(Heading, { accessibilityLevel: 2, children: "\u9078\u3070\u308C\u305F\u5E02\u753A\u6751" }), pickedCities.map((city) => (_jsx(Text, { children: city.name }, city.city_code)))] }), _jsx(Box, { marginTop: 2, children: _jsx(Button, { text: "\u30EA\u30BB\u30C3\u30C8", color: "red", onClick: () => {
                        setPickedCity(undefined);
                        setPickedCities([]);
                    } }) })] }));
};
