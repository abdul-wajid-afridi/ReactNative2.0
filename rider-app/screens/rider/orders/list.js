import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ThemeStyles from "../../../theme/styles";
import Icon from "@expo/vector-icons/Ionicons";
import request from "../../../libs/request";

import moment from "moment";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import * as Fushar from "../../../libs/fushar";

const Context = React.createContext(null);

const orderStatus = {
  pending: "2",
  active: "3",
  completed: "4",
};

const OrdersListScreen = ({ navigation, route }) => {
  const limit = 10;
  const [section, setSection] = React.useState(
    route?.params?.section ? route.params.section : "active"
  );
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(false);

  React.useEffect(() => {
    const assignedEvent = Fushar._onEvent(
      "order.assigned",
      async (payload, source) => {
        if (section !== "pending") return;
        await setOrders([]);
        fetchOrders();
      },
      "orders"
    );

    setOrders([]);
    setLoadMore(false);
    fetchOrders();
    return assignedEvent.remove;
  }, [section]);

  const fetchOrders = async () => {
    await setLoading(true);
    const offset = orders.length;
    await request
      .get("/@rider/orders", {
        params: {
          status: orderStatus[section],
          limit: limit,
          offset: offset,
        },
      })
      .then((res) => {
        const { status, data, msg } = res.data;

        if (status == "error") throw msg;
        else if (status == "success") {
          if (!offset) setOrders(data);
          else {
            setOrders((prev) => [...prev, ...data]);
          }
        }
      })
      .then(() => {
        setLoadMore(true);
      })
      .catch((e) => {
        if (!offset) setOrders([]);
        else setLoadMore(false);
      });
    await setLoading(false);
  };
  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Context.Provider
        value={{
          section,
          setSection,
        }}
      >
        <View
          style={{ ...ThemeStyles.header.container, backgroundColor: "#fff" }}
        >
          <View style={ThemeStyles.header.containerInner}>
            <Text style={ThemeStyles.header.title}>Orders</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TabItem label="Active" value="active" />
            <TabItem label="Pending" value="pending" />
            <TabItem label="Completed" value="completed" />
          </View>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={orders}
            maxToRenderPerBatch={10}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderBlock {...item} />}
            onEndReachedThreshold={0.6}
            onEndReached={
              loadMore == true && loading == false ? () => fetchOrders() : null
            }
            ListFooterComponent={() => (
              <View>
                {loading ? (
                  <ActivityIndicator
                    style={{ height: 60 }}
                    size="small"
                    color={ThemeStyles.colors.primary}
                  />
                ) : !orders.length ? (
                  <View
                    style={{
                      marginVertical: 20,
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "semibold" }}>
                      No Orders found!
                    </Text>
                  </View>
                ) : (
                  <React.Fragment />
                )}
              </View>
            )}
          />
        </View>
      </Context.Provider>
    </View>
  );
};

const TabItem = ({ label, value }) => {
  const navigation = useNavigation();
  let { orders: ordersCount } = useSelector((store) => store._rider);
  const { section, setSection } = React.useContext(Context);
  const isActive = section == value;
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      // position: "relative",
      alignItems: "center",
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: isActive ? ThemeStyles.colors.primary : "transparent",
    },
    text: {
      fontFamily: isActive ? "semibold" : "medium",
      color: isActive ? ThemeStyles.colors.primary : "grey",
    },
  });

  return (
    <TouchableOpacity
      disabled={isActive}
      style={styles.container}
      onPress={() => navigation.replace("list", { section: value })}
    >
      <Text style={styles.text}>{label}</Text>
      {["active", "pending"].includes(value) && ordersCount[value] ? (
        <View
          style={{
            borderRadius: 10,
            justifyContent: "center",
            marginLeft: 5,
            alignItems: "center",
            width: 20,
            height: 20,
            backgroundColor: styles.text.color,
          }}
        >
          <Text
            style={{
              fontSize: 10,
              textAlignVertical: "center",
              fontFamily: "semibold",
              color: "#fff",
            }}
          >
            {ordersCount[value]}
          </Text>
        </View>
      ) : (
        <React.Fragment />
      )}
    </TouchableOpacity>
  );
};
// .....................order Block............................
const OrderBlock = ({ id, status, createdAt, orderTasks }) => {
  //   console.log(id);
  const navigation = useNavigation();

  const TaskBlock = ({ type, status }) => {
    return (
      <View
        style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}
      >
        {status == "4" ? (
          <View
            style={{
              backgroundColor: "green",
              color: "#fff",
              borderRadius: 50,
            }}
          >
            <Icon
              style={{ textAlignVertical: "center" }}
              color="#fff"
              name="checkmark"
              size={20}
            />
          </View>
        ) : (
          <Icon
            style={{ textAlignVertical: "center" }}
            color="#ddd"
            name="ellipse-outline"
            size={25}
          />
        )}
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={{ fontFamily: "semibold" }}>{type}</Text>
          <Text style={{ fontFamily: "regular", color: "grey" }}>
            University Road Peshawar
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("view", { orderId: id })}
      style={{
        flexDirection: "column",
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#f2f2f2",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontFamily: "semibold" }}>Order #{id}</Text>
        <Text style={{ fontFamily: "regular" }}>
          {moment(createdAt).format("hh:mmA DD-MM-YYYY")}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10, marginVertical: 5 }}>
        {orderTasks?.map((entry) => (
          <TaskBlock {...entry} />
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default OrdersListScreen;
