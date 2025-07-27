import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import theme from '../../theme/colors';

type MainTabParamList = {
  Chat: { chatId: string; patientName: string };
  History: undefined;
  User: undefined;
};

type Props = NativeStackScreenProps<MainTabParamList, 'History'>;

// Örnek sohbet listesi (her item bir hasta ile olan sohbeti temsil ediyor)
const chats = [
  {
    id: '1',
    patientName: 'Hasta 1',
    lastMessage: 'Baş ağrım çok şiddetliydi...',
    lastDate: '2025-07-25 10:30',
  },
  {
    id: '2',
    patientName: 'Hasta 2',
    lastMessage: 'İlaç dozunu artırmanı öneriyorum.',
    lastDate: '2025-07-25 11:00',
  },
  {
    id: '3',
    patientName: 'Hasta 3',
    lastMessage: 'Teşekkürler, ilacı kullanmaya başladım.',
    lastDate: '2025-07-26 08:15',
  },
];

const History = ({ navigation }: Props) => {
  const renderItem = ({ item }: { item: typeof chats[0] }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() =>
        navigation.navigate('Chat', { chatId: item.id, patientName: item.patientName })
      }
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={styles.patientName}>{item.patientName}</Text>
        <Text style={styles.date}>{item.lastDate}</Text>
      </View>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMessage}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geçmiş Mesajlar</Text>
      {chats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz mesaj bulunmamaktadır.</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 20,
  },
  chatCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  patientName: { fontWeight: '700', color: theme.primary, fontSize: 16 },
  date: { fontSize: 12, color: theme.textSecondary },
  lastMessage: { fontSize: 15, color: theme.textPrimary },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 18, color: theme.textSecondary },
});

export default History;
