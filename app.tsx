/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, Text, useColorScheme, TextInput, View, Button } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>E-mail</Text>
        <TextInput placeholder='ex:joao.silva@gmail.com'></TextInput>
      </View>
      <View>
        <Text>Senha</Text>
        <TextInput secureTextEntry placeholder='Senha'></TextInput>
      </View>
      <Button title='Login' />
    </SafeAreaView>
  );
};

export default App;
