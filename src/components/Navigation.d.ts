import type { ColorSchemeType } from "../types";
interface NavigationProps {
    scheme: ColorSchemeType;
    setScheme: (scheme: ColorSchemeType) => void;
}
export declare const Navigation: ({ scheme, setScheme }: NavigationProps) => import("react/jsx-runtime").JSX.Element;
export {};
