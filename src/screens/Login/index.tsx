import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/index'
import colors from '../../theme/colors';

type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({ navigation }) => {
 
  const { width, height, isPad,fs12px,fs1px } = useSelector((state: RootState) => state.size);
console.log('--->width')
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { fontSize: isPad ? 32 : fs1px }]}>
        Doktor AI'ye Hoşgeldin
      </Text>

      <TextInput
        placeholder="Kullanıcı Adı"
        style={styles.input}
        placeholderTextColor={colors.textSecondary}
      />

      <TextInput
        placeholder="Şifre"
        style={styles.input}
        secureTextEntry
        placeholderTextColor={colors.textSecondary}
      />

      <TouchableOpacity
        style={[styles.button, { paddingVertical: isPad ? 20 : 16 }]}
        onPress={() => navigation.replace('Main')}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/* Örneğin ölçüleri göstermek istersen */}
      <Text style={{ marginTop: 20, color: colors.textSecondary }}>
        Ekran Genişliği: {width ?? 'Bilinmiyor'}, Yükseklik: {height ?? 'Bilinmiyor'}
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    color: colors.textPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: '700',
    fontSize: 18,
  },
});

export default Login;
