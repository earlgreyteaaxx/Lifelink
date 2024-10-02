# Create a new file named "App.js" for the React Native code provided to the user.

app_js_content = """
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import BleManager from 'react-native-ble-manager';

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [text, setText] = useState('');
  const [devices, setDevices] = useState([]);
  
  useEffect(() => {
    BleManager.start({ showAlert: false });

    BleManager.scan([], 5, true).then(() => {
      console.log('Scanning...');
      setIsScanning(true);
    });

    return () => {
      BleManager.stopScan();
      console.log('Scan stopped');
      setIsScanning(false);
    };
  }, []);

  const handleSend = () => {
    // Placeholder for sending data via Bluetooth
    console.log('Sending message: ', text);
    setText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.name || 'Unnamed Device'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LifeLink App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Type your message here"
      />
      <Button
        title={isScanning ? 'Scanning...' : 'Scan Devices'}
        onPress={() => BleManager.scan([], 5, true)}
      />
      <Button
        title="Send Message"
        onPress={handleSend}
        disabled={!text}
      />
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
  listItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ddd',
  },
  listText: {
    fontSize: 18,
  },
});

export default App;
"""

path = "/mnt/data/App.js"
with open(path, "w") as file:
    file.write(app_js_content)

path
