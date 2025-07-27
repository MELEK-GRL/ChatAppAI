import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import theme from '../../theme/colors';

const User: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Profil bilgileri
  const [name, setName] = useState<string>('Melek Gürel');
  const [email, setEmail] = useState<string>('melek@example.com');
  const [phone, setPhone] = useState<string>('+90 555 123 45 67');

  // Profil resmi için uri tutuyoruz
  const [avatarUri, setAvatarUri] = useState<string>('https://i.pravatar.cc/300');

  // Profil resmi değiştirme fonksiyonu
  const changePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) {
          // Kullanıcı iptal etti
          return;
        } else if (response.errorCode) {
          Alert.alert('Hata', response.errorMessage || 'Fotoğraf seçilirken hata oluştu');
          return;
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          if (selectedImage.uri) {
            setAvatarUri(selectedImage.uri);
          }
        }
      }
    );
  };

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Oturumunuzu kapatmak istediğinizden emin misiniz?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', onPress: () => console.log('Çıkış yapıldı') },
    ]);
  };

  const openEditModal = () => {
    setModalVisible(true);
  };

  const saveProfile = () => {
    Alert.alert('Başarılı', 'Profil bilgileri güncellendi.');
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={changePhoto}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <Text style={{ textAlign: 'center', color: theme.primary, marginBottom: 12 }}>
            Fotoğrafı Değiştir
          </Text>
        </TouchableOpacity>

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>{phone}</Text>

        <TouchableOpacity style={styles.editButton} onPress={openEditModal} activeOpacity={0.7}>
          <Text style={styles.editButtonText}>Profili Düzenle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profil Düzenle</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ad Soyad"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-posta"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Telefon"
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </Pressable>

              <Pressable style={[styles.modalButton, styles.saveButton]} onPress={saveProfile}>
                <Text style={styles.saveButtonText}>Kaydet</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: theme.primary,
    marginBottom: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  editButton: {
    marginTop: 28,
    backgroundColor: theme.primary,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: theme.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  editButtonText: {
    color: theme.buttonText || '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    shadowColor: '#EF4444',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: theme.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: theme.textPrimary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#9ca3af',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: theme.primary,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default User;
