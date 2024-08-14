import { PropsWithChildren } from "react"
import {  CombinedDarkTheme, CombinedDefaultTheme, NavigationDarkTheme, NavigationDefaultTheme, ThemeContext } from "../context/ThemeContext";
import { PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";


export const ThemeProvider = ({
    children
}: PropsWithChildren) => {

    const colorScheme = useColorScheme();

    const isDarkTheme = colorScheme === 'dark';
    const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
    const navigationTheme = isDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;


    return <PaperProvider theme={ theme }>
        <NavigationContainer theme={ navigationTheme }>
            <ThemeContext.Provider
                value={{
                    isDark: isDarkTheme,
                    theme
                }}
            >
                { children }
            </ThemeContext.Provider>
        </NavigationContainer>
    </PaperProvider>
}