import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import MapView, { Marker, an } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useSelector } from "react-redux";
import ThemeStyles from "../../../theme/styles";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import request from "../../../libs/request";
import Icon from "@expo/vector-icons/Ionicons";

import moment from "moment";

import _ from "lodash";

import configs from "../../../configs";

const { width, height } = Dimensions.get("window");

const Context = React.createContext();

const OrderView = ({ navigation, route }) => {
  const { location: myLocation } = useSelector((store) => store._rider);

  // console.log(myLocation);

  // const myLocation = {
  //   latitude: 34.050667529301506,
  //   longitude: 71.59757961430697,
  // };
  const { orderId } = route.params;
  // console.log(orderId);
  const detailSheetRef = React.useRef(null);
  const taskSheetRef = React.useRef(null);
  const [orderDetail, setOrderDetail] = React.useState({});
  const [taskSelected, setTaskSelected] = React.useState(null);

  React.useEffect(() => {
    fetchOrderDetail();
  }, []);

  const fetchOrderDetail = () => {
    request
      .get(`/@rider/orders/${orderId}`)
      .then((res) => {
        const { status, data, msg } = res.data;
        // console.log(res.data);
        if (status == "error") throw error;
        else if (status == "success") {
          setOrderDetail(data);
          if (taskSelected) {
            const taskIndex = _.findIndex(data.orderTasks, {
              id: taskSelected.id,
            });
            setTaskSelected({
              ...taskSelected,
              ...data.orderTasks[taskIndex],
            });
          }
        }
      })
      .catch((e) => {
        navigation.goBack();
      });
  };

  React.useEffect(() => {
    if (taskSelected == null) {
      taskSheetRef?.current?.close();
      detailSheetRef?.current?.expand();
      mapRef.current.fitToSuppliedMarkers([`task-1`, `task-2`], {
        edgePadding: {
          right: width / 20,
          bottom: height / 20,
          left: width / 20,
          top: height / 20,
        },
      });
    } else {
      detailSheetRef?.current?.close();
      taskSheetRef?.current?.expand();
      mapRef.current.fitToSuppliedMarkers([`task-${taskSelected.id}`, `me`], {
        edgePadding: {
          right: width / 20,
          bottom: height / 20,
          left: width / 20,
          top: height / 20,
        },
      });
    }
  }, [taskSelected]);

  const mapRef = React.useRef(null);

  return (
    <Context.Provider
      value={{
        fetchOrderDetail,
        orderDetail,
        setOrderDetail,
        taskSelected,
        setTaskSelected,
      }}
    >
      <View style={{ flex: 1, position: "relative", flexDirection: "column" }}>
        <View
          style={{
            ...ThemeStyles.header.container,
            top: 0,
            width: "100%",
            backgroundColor: "rgba(255,255,255,.5)",
            position: "absolute",
            zIndex: 10,
          }}
        >
          <View style={ThemeStyles.header.containerInner}>
            <TouchableOpacity
              style={ThemeStyles.header.backAction}
              onPress={navigation.goBack}
            >
              <Ionicons
                style={ThemeStyles.header.backActionIcon}
                name="chevron-back"
              />
            </TouchableOpacity>
            <Text style={ThemeStyles.header.title}>Order #{orderId}</Text>
          </View>
        </View>

        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          followsUserLocation={true}
        >
          {orderDetail.orderTasks &&
            orderDetail.orderTasks.map((entry, index) => (
              <React.Fragment>
                <Marker
                  onPress={() => setTaskSelected(entry)}
                  key={`task-${entry.id}`}
                  coordinate={{
                    latitude: parseFloat(entry.location.latitude),
                    longitude: parseFloat(entry.location.longitude),
                  }}
                  title={entry.type}
                  identifier={`task-${entry.id}`}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 5,
                      borderColor: "#fff",
                      borderRadius: 50,
                      backgroundColor: ThemeStyles.colors.primary,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "bold",
                        textAlign: "center",
                        color: "#fff",
                      }}
                    >
                      {index + 1}
                    </Text>

                    {/* <Image
                      source={require("../../../assets/user-marker.png")}
                      style={{ width: 60, height: 60 }}
                      resizeMode="contain"
                    /> */}
                  </View>
                </Marker>
              </React.Fragment>
            ))}

          <Marker
            coordinate={{
              latitude: parseFloat(myLocation.latitude),
              longitude: parseFloat(myLocation.longitude),
            }}
            title={"Me"}
            identifier={`me`}
          >
            <View
              style={{
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                // borderWidth: 2,
                // borderColor: "#fff",
                // borderRadius: 50,
                // backgroundColor: ThemeStyles.colors.primary,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("../../../assets/riderMarker.png")}
                style={{ width: 60, height: 60 }}
              />
              {/* <Ionicons color={"#fff"} name="navigate" size={20} /> */}
            </View>
          </Marker>

          {taskSelected !== null && (
            <MapViewDirections
              lineDashPattern={[0]}
              destination={{
                latitude: parseFloat(taskSelected.location.latitude),
                longitude: parseFloat(taskSelected.location.longitude),
              }}
              mode="DRIVING"
              strokeWidth={5}
              optimizeWaypoints={true}
              origin={{
                latitude: parseFloat(myLocation.latitude),
                longitude: parseFloat(myLocation.longitude),
              }}
              strokeColor={ThemeStyles.colors.primary}
              apikey={configs.googleMap.apiKey}
              onReady={(result) =>
                setTaskSelected({
                  ...taskSelected,
                  duration: result.duration,
                  distance: result.distance,
                })
              }
              onError={() => setTaskSelected(null)}
            />
          )}
        </MapView>

        {/* <View style={{position: "absolute", bottom: 0, top: 0, width: 40, height: 40, backgroundColor: "#f90"}}>
                <Text>Hello</Text>
            </View> */}

        <BottomSheet ref={detailSheetRef} index={1} snapPoints={["12%", "60%"]}>
          <OrderDetail />
        </BottomSheet>
        <BottomSheet ref={taskSheetRef} index={-1} snapPoints={["50%"]}>
          <TaskDetail />
        </BottomSheet>
      </View>
    </Context.Provider>
  );
};

const OrderDetail = () => {
  const { orderDetail } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  const _onComplete = async () => {
    setLoading(true);
    await request
      .post(`/@rider/orders/${orderDetail.id}/complete`)
      .then((res) => {
        const { status, msg } = res.data;
        if (status == "success") {
          return Alert.alert("Done", msg);
        } else if (status == "error") {
          return Alert.alert("Error", msg);
        }
      })
      .catch((e) => {
        return Alert.alert("Network", "Request failed!");
      });
    setLoading(false);
  };

  const CompleteButton = () => {
    const allTaskCompleted =
      _.filter(orderDetail?.orderTasks, { status: 4 }).length ==
      orderDetail?.orderTasks?.length;
    if (allTaskCompleted && orderDetail?.status !== 4)
      return (
        <TouchableOpacity
          onPress={_onComplete}
          disabled={loading}
          style={{
            margin: 10,
            borderRadius: 5,
            padding: 10,
            backgroundColor: ThemeStyles.colors.success,
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: "#fff",
                fontFamily: "semibold",
              }}
            >
              Complete
            </Text>
          )}
        </TouchableOpacity>
      );
    return <React.Fragment />;
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/avatar.png")}
          style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 50,
            borderColor: "#ddd",
          }}
        />
        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={{ fontFamily: "medium" }}>
            {orderDetail?.customer?.firstName} {orderDetail?.customer?.lastName}
          </Text>
          <Text style={{ fontFamily: "regular", color: "grey", fontSize: 12 }}>
            {orderDetail?.customer?.phoneNumber}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#f90",
              backgroundColor: "#f9f9f9",
              borderRadius: 50,
              padding: 5,
            }}
          >
            <Ionicons
              name="call-outline"
              size={30}
              onPress={() =>
                Linking.openURL(`tel:${orderDetail?.customer?.phoneNumber}`)
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetScrollView>
        <View
          style={{
            position: "relative",
            paddingHorizontal: 10,
            marginTop: 10,
            paddingTop: 10,
            borderColor: "#f6f6f6",
            borderTopWidth: 1,
          }}
        >
          <FlatList
            data={orderDetail.orderTasks}
            renderItem={({ item }) => <TaskBlock {...item} />}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            borderColor: "#f6f6f6",
            borderTopWidth: 1,
            paddingHorizontal: 10,
          }}
        >
          <FlatList
            style={{ padding: 10, paddingBottom: 0 }}
            data={orderDetail?.orderBills}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  borderColor: "#f9f9f9",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontFamily: "medium", color: "grey" }}>
                  {item.label}:
                </Text>
                <Text style={{ fontFamily: "medium" }}>{item.amount}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  alignItems: "center",
                  borderTopWidth: 1,
                  paddingTop: 5,
                  borderColor: "#f9f9f9",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontFamily: "medium", color: "grey" }}>
                  Total:
                </Text>
                <Text style={{ fontFamily: "medium" }}>
                  {orderDetail?.orderBills
                    ?.reduce(
                      (prev, current) => prev + Number(current.amount),
                      0
                    )
                    .toFixed(2)}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <CompleteButton />
      </BottomSheetScrollView>
    </View>
  );
};

const TaskDetail = () => {
  const { taskSelected, orderDetail, fetchOrderDetail, setTaskSelected } =
    React.useContext(Context);
  if (!taskSelected) return <React.Fragment />;
  console.log(taskSelected);  
  const startedAt =
    _.find(orderDetail.logs, {
      action: "TASK_STARTED",
      taskId: taskSelected.id,
    })?.createdAt || null;
  const completedAt =
    _.find(orderDetail.logs, {
      action: "TASK_COMPLETED",
      taskId: taskSelected.id,
    })?.createdAt || null;

  const _Action = (action) => {
    request
      .post(
        `/@rider/orders/${orderDetail.id}/tasks/${taskSelected.id}/${action}`
      )
      .then(async (res) => {
        const { status, msg, code } = res.data;
        if (status == "error") {
          return Alert.alert("Error", msg);
        } else if (status == "success") {
          await fetchOrderDetail();
        }
      })
      .catch((e) => {
        return Alert.alert("Failed", "Please retry.");
      });
  };

  return (
    <BottomSheetScrollView
      style={{ flex: 1, paddingHorizontal: 10, flexDirection: "column" }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: "bold" }}>{taskSelected.type}</Text>
        <TouchableOpacity
          style={{ padding: 5, borderRadius: 50, backgroundColor: "#f9f9f9" }}
          onPress={() => setTaskSelected(null)}
        >
          <Ionicons name="close-outline" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "33%" }}>
            <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
              Distance
            </Text>
            <Text style={{ fontFamily: "bold" }}>
              {taskSelected.distance} KM
            </Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
              Duration
            </Text>
            <Text style={{ fontFamily: "bold" }}>
              {Math.floor(taskSelected.duration)} min
            </Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
              Updated
            </Text>
            <Text style={{ fontFamily: "bold" }}>
              {moment(taskSelected.updatedAt).fromNow()}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ width: "33%" }}>
            <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
              Started At
            </Text>
            <Text style={{ fontFamily: "bold" }}>
              {moment(startedAt)
                .format("hh:mmA")
                .replace("Invalid date", "---")}
            </Text>
          </View>
          <View style={{ width: "33%" }}>
            <Text style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}>
              Completed At
            </Text>
            <Text style={{ fontFamily: "bold" }}>
              {moment(completedAt)
                .format("hh:mmA")
                .replace("Invalid date", "---")}
            </Text>
          </View>
          <View style={{ width: "33%" }}>
            {startedAt !== null && completedAt !== null && (
              <React.Fragment>
                <Text
                  style={{ fontFamily: "medium", fontSize: 12, color: "grey" }}
                >
                  Complete In
                </Text>
                <Text style={{ fontFamily: "bold" }}>
                  {moment(completedAt).from(startedAt)}
                </Text>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>

      {taskSelected.status == "1" && (
        <TouchableOpacity
          onPress={() => _Action("start")}
          style={{
            padding: 10,
            borderRadius: 5,
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

      {taskSelected.status == "2" && (
        <TouchableOpacity
          onPress={() => _Action("reached")}
          style={{
            padding: 10,
            borderRadius: 5,
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
            Reached
          </Text>
        </TouchableOpacity>
      )}

      {taskSelected.status == "3" && (
        <TouchableOpacity
          onPress={() => _Action("complete")}
          style={{
            padding: 10,
            borderRadius: 5,
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
            Complete
          </Text>
        </TouchableOpacity>
      )}
    </BottomSheetScrollView>
  );
};

const TaskBlock = (taskDetail) => {
  const { type, id: taskId, status, location } = taskDetail;
  const { setTaskSelected, orderDetail } = React.useContext(Context);

  const startedAt =
    _.find(orderDetail.logs, { action: "TASK_STARTED", taskId: taskId })
      ?.createdAt || null;
  const completedAt =
    _.find(orderDetail.logs, { action: "TASK_COMPLETED", taskId: taskId })
      ?.createdAt || null;

  return (
    <TouchableOpacity
      onPress={() => setTaskSelected(taskDetail)}
      style={{ flexDirection: "row", marginBottom: 10, alignItems: "center" }}
    >
      {status == "4" ? (
        <View
          style={{ backgroundColor: "green", color: "#fff", borderRadius: 50 }}
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
          {location?.address}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "grey", fontFamily: "regular", fontSize: 12 }}>
            {moment(startedAt).format("hh:mmA").replace("Invalid date", "---")}
          </Text>
          <Text
            style={{
              color: "grey",
              textAlignVertical: "center",
              fontSize: 5,
              marginHorizontal: 2,
            }}
          >
            ⬤
          </Text>
          <Text style={{ color: "grey", fontFamily: "regular", fontSize: 12 }}>
            {moment(completedAt)
              .format("hh:mmA")
              .replace("Invalid date", "---")}
          </Text>
          {startedAt && completedAt ? (
            <React.Fragment>
              <Text style={{ color: "grey", marginHorizontal: 3 }}>|</Text>
              <Text
                style={{ color: "grey", fontFamily: "regular", fontSize: 12 }}
              >
                {moment(completedAt).from(startedAt)}
              </Text>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderView;
