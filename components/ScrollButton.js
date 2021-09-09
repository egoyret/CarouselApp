import React from "react";
import { TouchableOpacity, View } from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// StyleSheets
import globalStyles from "../styles/globalStyles";
import scrollButtonStyles from "../styles/ScrollButtonStyles";

const NextButton = ({
    direction,
    scrollToNext,
    scrollToPrevious,
    currentIndex,
    slidesLength,
}) => {
    // Extract style from styleSheets
    const { container } = globalStyles,
        { button } = scrollButtonStyles;


    // If the touchable opacity should be disabled
    const ifDisabled =
        direction === "next"
            ? currentIndex >= slidesLength - 1
            : currentIndex <= 0;

    const scrollNext3times = () => {
        scrollToNext();
    }

    const scrollPrev3times = () => {
        scrollToPrevious();
    }

    return (
        <View style={container}>
 
            {/* The button to scroll the carousel */}
            <TouchableOpacity
                // Function call depending on the direction
                onPress={direction === "next" ? scrollNext3times : scrollPrev3times}
                style={[button, ifDisabled && { backgroundColor: "gray" }]}
                activeOpacity={0.6}
                // disabled if no slides to move in the requested direction
                disabled={ifDisabled}
            >
                {/* Icon */}
                <AntDesign
                    // Icon depending on the direction
                    name={direction === "next" ? "arrowright" : "arrowleft"}
                    size={32}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    );
};

export default NextButton;
