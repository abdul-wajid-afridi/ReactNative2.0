
import React from "react";
import {StyleSheet, Platform} from "react-native"

import Constants from 'expo-constants';


export default StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },
    containerInner: {
        padding: 10,
        paddingTop: Constants.statusBarHeight + 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontFamily: "semibold"
    },
    action: {
        marginHorizontal: 2,
    },
    
    backAction: {
        marginRight: 5,
    },
    backActionIcon: {
        fontSize: 25,
    }

})