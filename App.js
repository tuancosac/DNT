import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert, 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [fullname, setFullname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!fullname.trim()) {
      Alert.alert('Lỗi', 'Họ tên không được để trống!');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Lỗi', 'Email không được để trống!');
      return;
    }

    Alert.alert(
      'Thành công',
      `Đã lưu thông tin:\n- Họ tên: ${fullname}\n- MSSV: ${studentId}\n- Email: ${email}\n- SĐT: ${phone}`
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
       
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Student Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student Name (*):</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={fullname}
                onChangeText={setFullname}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your student ID"
                value={studentId}
                onChangeText={setStudentId}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email (*):</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad" 
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e88e5',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});