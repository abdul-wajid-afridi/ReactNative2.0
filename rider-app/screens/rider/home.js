import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";
import * as _location from "../../libs/location";
import ThemeStyles from "../../theme/styles";
import request from "../../libs/request";

import * as Fushar from "../../libs/fushar";

import { useDispatch } from "react-redux";

import moment from "moment";

const HomeScreen = ({ navigation }) => {
  const storeDispatch = useDispatch();

  const {
    state: riderState,
    location,
    orders,
  } = useSelector((store) => store._rider);
  const { logged } = useSelector((store) => store._auth);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", dashboardFetch);
    return unsubscribe;
  }, [navigation]);

  React.useEffect(() => {
    const orderAssignedEvent = Fushar._onEvent(
      "order.assigned",
      (data, { source }) => {
        if (source == "receive") dashboardFetch();
        else if (source == "respond") navigation.navigate("orders");
      },
      "home"
    );
    return orderAssignedEvent.remove;
  }, []);

  const setDashboard = async (data) => {
    const isServiceStarted = await _location.isServiceStarted();
    await storeDispatch({
      type: "rider/set/orders",
      payload: data.orders,
    });

    await storeDispatch({
      type: "rider/set/state",
      payload: isServiceStarted
        ? {
            id: data.state.id,
            createdAt: data.state.createdAt,
            updatedAt: data.state.updatedAt,
          }
        : null,
    });

    if (data.state) {
      await storeDispatch({
        type: "rider/update/location",
        payload: {
          latitude: data.state.latitude || 34.0151,
          longitude: data.state.longitude || 71.5249,
          altitude: data.state.altitude || null,
          heading: data.state.heading || null,
          speed: data.state.speed || 0,
          distance: data.state.distance || 0,
        },
      });
    }
  };

  const dashboardFetch = async () => {
    request
      .get("/@rider/dashboard")
      .then((res) => {
        const { status, msg, data } = res.data;
        if (status == "error") throw { status, msg };
        else if (status == "success") {
          setDashboard(data);
        }
      })
      .catch((e) => {});
  };
  const _onStart = async () => {
    _location
      .start()
      .then(() => request.post("/@rider/state/start"))
      .then((res) => {
        const { status, data, msg } = res.data;
        if (status == "success") {
          setDashboard(data);
        }
      })
      .catch((e) => {
        if (e.code == "LOCATION_PERMISSION_FAILED") {
          return Alert.alert("Error", "Location access failed!");
        } else {
          return Alert.alert("Error", "Starting failed!");
        }
      });
  };

  const _onStop = async () => {
    _location
      .stop()
      .then(() => request.post("/@rider/state/end"))
      .then((res) => {
        const { status, data, msg } = res.data;
        if (status == "success") {
          setDashboard(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#f1f1f1", flexDirection: "column" }}
    >
      <View style={ThemeStyles.header.container}>
        <View style={ThemeStyles.header.containerInner}>
          <Text
            style={{
              ...ThemeStyles.header.title,
              fontFamily: "medium",
              fontSize: 18,
            }}
          >
            Good Morning,{" "}
            <Text style={{ fontFamily: "semibold" }}>{logged?.firstName}</Text>
          </Text>
          <TouchableOpacity
            style={ThemeStyles.header.action}
            onPress={() => navigation.navigate("profile")}
          >
            <Image
              style={{
                width: 30,
                height: 30,
                borderColor: ThemeStyles.colors.primary,
                borderWidth: 2,
                borderRadius: 50,
              }}
              source={require("../../assets/images/avatar.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 10, paddingTop: 5 }}>
        <View
          style={{
            backgroundColor: "#fff",
            marginBottom: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontFamily: "semibold" }}>
            {" "}
            <Ionicons color="tomato" size={25} name="layers-outline" /> Orders
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <InfoBox label="Active" value={orders?.active} />
            <InfoBox label="Pending" value={orders?.pending} />
            <InfoBox label="Completed" value={orders?.completed} />
          </View>
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            overflow: "hidden",
            marginBottom: 5,
            borderRadius: 10,
            padding: 10,
          }}
        >
          {riderState ? (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <InfoBox
                label="Started"
                value={moment(riderState?.createdAt).fromNow()}
              />
            </View>
          ) : (
            <React.Fragment />
          )}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <InfoBox
              label="speed"
              value={`${Math.ceil(location.speed)} KM/H`}
            />
            <InfoBox label="Max. Speed" value={`0 KM/H`} />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <InfoBox label="Total Distance" value={`0 KM`} />
            <View />
          </View>

          {riderState ? (
            <TouchableOpacity
              onPress={_onStop}
              style={{
                margin: -10,
                marginTop: 10,
                padding: 10,
                backgroundColor: ThemeStyles.colors.danger,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "semibold",
                }}
              >
                Stop
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={_onStart}
              style={{
                margin: -10,
                marginTop: 10,
                padding: 10,
                backgroundColor: ThemeStyles.colors.success,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "#fff",
                  fontFamily: "semibold",
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const InfoBox = ({ label, value, onPress }) => {
  return (
    <TouchableOpacity
      disabled={onPress ? false : true}
      onPress={onPress}
      style={{ backgroundColor: "#fff", flexDirection: "column", padding: 10 }}
    >
      <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
        {label}
      </Text>
      <Text style={{ fontFamily: "bold" }}>{value}</Text>
    </TouchableOpacity>
  );
};

export default HomeScreen;
