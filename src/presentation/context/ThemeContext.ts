import { createContext } from "react";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
  } from 'react-native-paper';
import { NavigationTheme } from "react-native-paper/lib/typescript/types";
import merge from 'deepmerge';



export interface ThemeContextProps {
    isDark: boolean
    theme: NavigationTheme
}



const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);


export {
    NavigationDarkTheme,
    NavigationDefaultTheme
}


export const ThemeContext = createContext<ThemeContextProps>({
    isDark: false,
    theme: CombinedDefaultTheme
});