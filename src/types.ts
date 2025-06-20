export interface City {
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

export interface Prefecture {
  type: string;
  code: string;
  name: string;
  kana: string;
  pref_code: string;
  pref_name: string;
  pref_kana: string;
}

export type ColorSchemeType = "light" | "dark" | "userPreference";
