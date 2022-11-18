import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AppButtons = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        style={styles.container}
        colors={['aqua', 'gray']}
        start={{
          x: 0.8,
          y: 0,
        }}
        end={{
          x: 0.2,
          y: 0,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          {name}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AppButtons;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '80%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});
