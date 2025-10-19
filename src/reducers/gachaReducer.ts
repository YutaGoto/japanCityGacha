import type { City, Prefecture } from "../types";
import { prefectures } from "../constants";

// State, Action の定義
export interface GachaState {
  start: boolean;
  prefectureStart: boolean;
  pickedCity?: City;
  pickedCities: City[];
  pickedPrefecture?: Prefecture;
  isRandomPrefecture: boolean;
}

export type GachaAction =
  | { type: "TOGGLE_RANDOM_PREFECTURE" }
  | { type: "SELECT_PREFECTURE"; payload: Prefecture }
  | { type: "CLEAR_PREFECTURE" }
  | { type: "START_PREFECTURE_GACHA" }
  | { type: "STOP_PREFECTURE_GACHA" }
  | { type: "SET_PICKED_PREFECTURE"; payload: Prefecture }
  | { type: "START_CITY_GACHA" }
  | { type: "STOP_CITY_GACHA" }
  | { type: "SET_PICKED_CITY"; payload: City | undefined }
  | { type: "SET_PICKED_CITIES"; payload: City[] };

// 初期状態
export const initialState: GachaState = {
  start: false,
  prefectureStart: false,
  pickedCities: [],
  isRandomPrefecture: false,
  pickedPrefecture: prefectures[0],
};

// Reducer 関数
export function gachaReducer(state: GachaState, action: GachaAction): GachaState {
  switch (action.type) {
    case "TOGGLE_RANDOM_PREFECTURE":
      return { ...state, isRandomPrefecture: !state.isRandomPrefecture, pickedCity: undefined };
    case "SELECT_PREFECTURE":
      return { ...state, pickedPrefecture: action.payload, pickedCity: undefined, pickedCities: [] };
    case "CLEAR_PREFECTURE":
      return { ...state, pickedPrefecture: undefined, pickedCity: undefined, pickedCities: [] };
    case "START_PREFECTURE_GACHA":
      return { ...state, prefectureStart: true, pickedCity: undefined };
    case "STOP_PREFECTURE_GACHA":
      return { ...state, prefectureStart: false };
    case "SET_PICKED_PREFECTURE":
      return { ...state, pickedPrefecture: action.payload };
    case "START_CITY_GACHA":
      return { ...state, start: true };
    case "STOP_CITY_GACHA": {
      const newPickedCities =
        state.pickedCity && !state.pickedCities.find(c => c.city_code === state.pickedCity!.city_code)
          ? [...state.pickedCities, state.pickedCity]
          : state.pickedCities;
      return { ...state, start: false, pickedCities: newPickedCities };
    }
    case "SET_PICKED_CITY":
      return { ...state, pickedCity: action.payload };
    case "SET_PICKED_CITIES":
      return { ...state, pickedCities: action.payload };
    default:
      return state;
  }
}
