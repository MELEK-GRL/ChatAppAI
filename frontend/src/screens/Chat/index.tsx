import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import theme from '../../theme/colors';

// Mesaj tipi
type Message = {
  id: string;
  text: string;
  fromUser: boolean;
};

// Sahte veri
const dummyMessages: Message[] = [
  { id: '1', text: 'Merhaba, size nasıl yardımcı olabilirim?', fromUser: false },
  { id: '2', text: 'Bugün biraz başım ağrıyor.', fromUser: true },
  { id: '3', text: 'Ne zamandır böyle hissediyorsunuz?', fromUser: false },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      fromUser: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.fromUser ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={item.fromUser ? styles.userText : styles.botText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <Text style={styles.title}>Sohbet</Text>

        <FlatList
          data={messages.slice().reverse()} // en son mesaj en altta gözüksün
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatContainer}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mesajınızı yazın..."
            placeholderTextColor={theme.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  chatContainer: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
  },
  userBubble: {
    backgroundColor: theme.primary,
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  userText: {
    color: theme.buttonText,
    fontSize: 16,
  },
  botText: {
    color: theme.textPrimary,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.borderColor,
    color: theme.textPrimary,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: theme.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: theme.buttonText,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default Chat;
