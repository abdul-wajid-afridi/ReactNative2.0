

import React from "react";
import {View, Text, TouchableOpacity, ActivityIndicator, TextInput, Alert} from "react-native";
import ThemeStyles from "../../theme/styles";

import { Ionicons } from "@expo/vector-icons";

import request from "../../libs/request";

const ChangePasswordScreen = ({navigation}) => {

    const [loading, setLoading] = React.useState(false);

    const [currentPassword, setCurrentPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");


    const _onSave = async () => {
        setLoading(true);
        await request.post("/auth/password/change", {
            currentPassword,
            newPassword,
            confirmPassword
        }).then(res => {
            const {status, msg, data} = res.data;
            // console.log(res.data);
            if(status == "error"){
                Alert.alert("Error", msg);
            }else if(status == "success"){
                Alert.alert("Done", msg);
            }
        }).catch(e => {
            Alert.alert("Network", "Request Failed, check internet connection!");
        });
        setLoading(false);
    }

    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            <View style={{...ThemeStyles.header.container, backgroundColor: "#fff"}}>
                <View style={ThemeStyles.header.containerInner}>
                    <Text style={ThemeStyles.header.title}>Change Password</Text>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Ionicons name="close" size={25}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, backgroundColor: "#fff", padding: 20}}>
                <View style={ThemeStyles.form.group}>
                    <Text style={ThemeStyles.form.label}>Current Password</Text>
                    <TextInput onChangeText={setCurrentPassword} value={currentPassword} style={ThemeStyles.form.input}/>
                </View>

                <View style={ThemeStyles.form.group}>
                    <Text style={ThemeStyles.form.label}>New Password</Text>
                    <TextInput onChangeText={setNewPassword} value={newPassword} style={ThemeStyles.form.input}/>
                </View>

                <View style={ThemeStyles.form.group}>
                    <Text style={ThemeStyles.form.label}>Confirm Password</Text>
                    <TextInput onChangeText={setConfirmPassword} value={confirmPassword} style={ThemeStyles.form.input}/>
                </View>

                <TouchableOpacity disabled={loading} onPress={_onSave} style={{padding: 10, borderRadius: 5, backgroundColor: ThemeStyles.colors.primary}}>
                    {loading ? <ActivityIndicator size="small" colors={"#fff"}/> : 
                        <Text style={{fontFamily: "semibold", textAlign: "center", color: "#fff"}}>Save Password</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChangePasswordScreen;