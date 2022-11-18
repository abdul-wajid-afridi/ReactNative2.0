// import React from "react";
// import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// import tw from "tailwind-react-native-classnames";
// import { Formik } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(4).label("Password"),
// });

// const Login = () => {
//   return (
//     <View>
//       <Text style={tw`text-center my-10 font-bold text-xl`}>Login</Text>
//       <Formik
//         validationSchema={validationSchema}
//         initialValues={{ email: "", password: "" }}
//         onSubmit={(value) => console.log(value.password)}
//       >
//         {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => {
//           return (
//             <View>
//               <TextInput
//                 placeholder="Email"
//                 onChangeText={handleChange("email")}
//                 onBlur={() => setFieldTouched("email")}
//               />
//               {touched.email && (
//                 <Text style={tw`text-red-900`}>{errors.email}
//                 </Text>
//               )}
//               <TextInput
//                 placeholder="password"
//                 onChangeText={handleChange("password")}
//                 onBlur={() => setFieldTouched("password")}
//               />
//               {touched.password && (
//                 <Text style={tw`text-red-900`}>{errors.password}</Text>
//               )}
//               <Button title="submit" onPress={handleSubmit} />
//             </View>
//           );
//         }}
//       </Formik>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({});

// import { Formik } from "formik";
// import React from "react";
// import { Button, StyleSheet, Text, TextInput, View } from "react-native";

// import * as Yup from "yup";
// import tw from "tailwind-react-native-classnames";
// const Login = () => {
//   const validationSchema = Yup.object().shape({
//     email: Yup.string().required().email().label("Email"),
//     password: Yup.string().required().min(4).label("Password"),
//   });
//   return (
//     <View>
//       <Text style={tw`text-center font-bold my-10`}>Login Page</Text>
//       <Formik
//         onSubmit={(value) => console.log(value)}
//         initialValues={{ email: "", password: "" }}
//         validationSchema={validationSchema}
//       >
//         {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => {
//           return (
//             <View>
//               <TextInput
//                 onBlur={() => setFieldTouched("email")}
//                 placeholder="User Email"
//                 onChangeText={handleChange("email")}
//               />
//               {touched.email ? (
//                 <Text style={{ color: "red" }}>{errors.email}</Text>
//               ) : null}
//               <TextInput
//                 onBlur={() => setFieldTouched("password")}
//                 placeholder="User Password"
//                 onChangeText={handleChange("password")}
//               />
//               {touched.password ? (
//                 <Text style={{ color: "red" }}>{errors.password}</Text>
//               ) : null}
//               <Button title="Submit" onPress={handleSubmit} />
//             </View>
//           );
//         }}
//       </Formik>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [Form, setForm] = useState([]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
  });
  return (
    <View>
      {Form.map((item) => (
        <View key={item.password}>
          <Text>{item.email}</Text>
          <Text>{item.password}</Text>
        </View>
      ))}
      <Text>Login Page</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(value) => setForm([value, ...Form])}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => {
          return (
            <View>
              <TextInput
                placeholder="User Email"
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
              />
              {touched.email && (
                <Text style={{ color: "red" }}>{errors.email}</Text>
              )}
              <TextInput
                placeholder="User Password"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password && (
                <Text style={{ color: "red" }}>{errors.password}</Text>
              )}
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
