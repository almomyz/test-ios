import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import products from "./screens/products";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FilterProvider } from "@/hooks/context/FilterContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <FilterProvider>
                <ThemeProvider
                    value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />
                        {/* <Stack.Screen name="(screens)" options={{ headerShown: false }} /> */}
                        <Stack.Screen
                            name="products"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="productDetails"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </ThemeProvider>
            </FilterProvider>
        </QueryClientProvider>
    );
}
