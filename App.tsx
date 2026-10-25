import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PassEduAI</Text>
      <Text style={styles.subtitle}>Smarter exam preparation, on the go.</Text>
      <Text style={styles.note}>Your mobile learning journey starts here.</Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#153e75',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#334155',
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  note: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
});
