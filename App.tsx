import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { LoginScreen } from "./src/screens/auth/LoginScreen";

function AppContent() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-sm text-slate-500">
          Restoring your session...
        </Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Text className="text-3xl font-bold text-slate-900">
        Welcome, {user?.fullName}!
      </Text>

      <Text className="mt-3 text-center text-base text-slate-500">
        Your mobile learning journey starts here.
      </Text>

      <Pressable
        onPress={logout}
        className="mt-8 rounded-lg bg-red-600 px-8 py-3"
      >
        <Text className="font-semibold text-white">Log out</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}
