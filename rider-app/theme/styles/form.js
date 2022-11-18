import { StyleSheet } from "react-native";

import colors from "./colors";

export default StyleSheet.create({
    group: {
        marginBottom: 15, 
    },
    label: {
        fontFamily: "medium",
        marginBottom: 5,
        fontSize: 12,
        color: colors.primary,
        textTransform: "uppercase"
    },
    input: {
        padding: 10,
        paddingVertical: 10,
        fontFamily: "regular",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
        fontFamily: "regular",
    },
    inputAfixRow: {
        backgroundColor: "#f9f9f9",
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "stretch",
        borderRadius: 5,
    },
    inputAfix: {
        backgroundColor: "#f9f9f9",
        flexDirection: "row",
        alignItems: "center",
    }
})