import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppButtons from '../Components/AppButtons';
import AppTextInputs from '../Components/AppTextInputs';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().min(4).label('Email'),
});

const Login = () => {
  return (
    <Formik
      onSubmit={value => console.log(value)}
      initialValues={{
        name: '',
        email: '',
      }}
      validationSchema={validationSchema}>
      {({handleChange, handleSubmit, errors}) => {
        return (
          <View>
            <View
              style={{
                marginHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 600,
              }}>
              <AppTextInputs
                placeholder={'user Name'}
                onChangeText={handleChange('name')}
              />
              <Text style={{color: 'red'}}>{errors.name}</Text>
              <AppTextInputs
                placeholder={'user Email'}
                onChangeText={handleChange('email')}
              />
              <Text style={{color: 'red'}}>{errors.email}</Text>
              <AppButtons name={'Submit'} onPress={handleSubmit} />
            </View>
            <View
              style={{
                backgroundColor: 'black',
                height: 80,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>All Rights Reserved</Text>
              <Text>AW developers</Text>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({});
