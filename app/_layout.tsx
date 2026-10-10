import { SplashScreenController } from "@/components/splashScreenController";
import { useAuthContext } from "@/hooks/auth.context";
import AuthProvider from "@/providers/auth.provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootNavigation() {
  const { isLoggedIn, isLoading } = useAuthContext();
  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="pages" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigation />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
