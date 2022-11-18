import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AppTextInputs = ({placeholder, onChangeText, onBlur}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={['gray', 'white']}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 0.9,
          y: 0,
        }}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'black'}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppTextInputs;

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    borderRadius: 40,
    marginVertical: 20,
  },
  input: {
    height: '100%',
    width: '100%',
  },
});
