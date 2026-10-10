import { useAuthContext } from "@/hooks/auth.context";
import { Redirect, Stack } from "expo-router";

export default function StartupLayout() {
  const { profile } = useAuthContext();

  if (!profile) return null;

  if (profile.state > 2) {
    return <Redirect href="/pages" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={profile.state === 1}>
        <Stack.Screen name="themes" />
      </Stack.Protected>

      <Stack.Protected guard={profile.state === 2}>
        <Stack.Screen name="niveau" />
      </Stack.Protected>
    </Stack>
  );
}
