import React from "react";
import {
  View,
  Text,
  TextInput,
  AsyncStorage,
  Image,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import ThemeStyles from "../../theme/styles";
import request from "../../libs/request";

import * as Notifications from "expo-notifications";
import * as Fushar from "../../libs/fushar";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [logging, setLogging] = React.useState(false);

  const onLogin = async () => {
    await setLogging(true);

    try {
      const { token } = await Fushar._getToken();
    } catch (e) {
      Alert.alert("Error", "Enable Notification, for a better experience!");
      return setLogging(false);
    }

    await request
      .post("/auth/login", {
        username: username,
        password: password,
        pushToken: token ? token : null,
      })
      .then(async (res) => {
        const { status, msg, data } = res.data;
        if (status == "error") {
          Alert.alert("Error", msg);
        } else if (status == "success") {
          await AsyncStorage.setItem("auth/logged", JSON.stringify(data));
          navigation.navigate("rider");
        }
      })
      .catch((e) => {
        Alert.alert("Request Failed", "Check your Internet Connection");
      });
    await setLogging(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <Image
              source={require("../../assets/delivery1.gif")}
              style={{ marginTop: "5%", width: 250, height: 250 }}
            />
          </View>

          <SafeAreaView style={{ width: "80%" }}>
            <View>
              <Text
                style={{ fontFamily: "bold", fontSize: 16, marginBottom: 20 }}
              >
                Login{" "}
                <Text style={{ fontFamily: "regular", fontSize: 14 }}>
                  To Start Journey
                </Text>
              </Text>
              <View style={ThemeStyles.form.group}>
                <Text style={ThemeStyles.form.label}>Username</Text>
                <TextInput
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  value={username}
                  onChangeText={setUsername}
                  style={ThemeStyles.form.input}
                />
              </View>
              <View style={ThemeStyles.form.group}>
                <Text style={ThemeStyles.form.label}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  style={ThemeStyles.form.input}
                />
              </View>
              <TouchableOpacity
                disabled={logging}
                onPress={onLogin}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: ThemeStyles.colors.primary,
                }}
              >
                {logging ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "semibold",
                      textAlign: "center",
                    }}
                  >
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
