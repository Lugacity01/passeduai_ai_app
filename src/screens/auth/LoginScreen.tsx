import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      await login({
        email: email.trim().toLowerCase(),
        password,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full max-w-md self-center">
            {/* Brand */}
            <View className="mb-8 items-center">
              <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
                <Text className="text-2xl font-bold text-white">P</Text>
              </View>

              <Text className="text-xl font-bold text-slate-900">
                PassEduAI
              </Text>
            </View>

            {/* Login Card */}
            <View className="rounded-2xl border border-blue-100 bg-white p-6 shadow-lg">
              {/* Header */}
              <View className="mb-7">
                <Text className="text-2xl font-bold text-slate-900">
                  Welcome Back
                </Text>

                <Text className="mt-2 text-sm text-slate-500">
                  Log in to your EduAI account
                </Text>
              </View>

              {/* Login Method */}
              <View className="mb-6 flex-row rounded-xl bg-slate-100 p-1">
                <View className="flex-1 items-center rounded-lg bg-blue-600 py-2">
                  <Text className="text-sm font-semibold text-white">
                    Email
                  </Text>
                </View>

                <View className="flex-1 items-center justify-center py-2">
                  <Text className="text-sm text-slate-400">CBT ID</Text>
                </View>

                <View className="flex-1 items-center justify-center py-2">
                  <Text className="text-sm text-slate-400">Phone</Text>
                </View>
              </View>

              {/* Email */}
              <View className="mb-5">
                <Text className="mb-2 text-sm font-semibold text-slate-700">
                  Email Address
                </Text>

                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  editable={!isSubmitting}
                  className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-900"
                />
              </View>

              {/* Password */}
              <View className="mb-5">
                <Text className="mb-2 text-sm font-semibold text-slate-700">
                  Password
                </Text>

                <View className="h-12 flex-row items-center rounded-lg border border-slate-200 bg-white px-4">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry={!showPassword}
                    autoComplete="current-password"
                    textContentType="password"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    editable={!isSubmitting}
                    className="flex-1 text-base text-slate-900"
                  />

                  <Pressable
                    onPress={() => setShowPassword((current) => !current)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    hitSlop={10}
                  >
                    <Text className="text-sm font-medium text-blue-600">
                      {showPassword ? "Hide" : "Show"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Error */}
              {error ? (
                <View className="mb-4 rounded-lg bg-red-50 p-3">
                  <Text className="text-sm text-red-600">{error}</Text>
                </View>
              ) : null}

              {/* Submit */}
              <Pressable
                onPress={handleLogin}
                disabled={isSubmitting}
                accessibilityRole="button"
                className={`h-12 flex-row items-center justify-center rounded-lg bg-blue-600 ${
                  isSubmitting ? "opacity-70" : "active:bg-blue-700"
                }`}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-base font-semibold text-white">
                    Login
                  </Text>
                )}
              </Pressable>

              {/* Footer */}
              <Text className="mt-6 text-center text-xs text-slate-400">
                Your learning journey continues here.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
