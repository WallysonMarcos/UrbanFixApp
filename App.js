import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, View, } from 'react-native';
import { Colors, Header, } from 'react-native/Libraries/NewAppScreen';
var App = function () {
    var isDarkMode = useColorScheme() === 'dark';
    var backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (React.createElement(SafeAreaView, { style: backgroundStyle },
        React.createElement(StatusBar, { barStyle: isDarkMode ? 'light-content' : 'dark-content' }),
        React.createElement(ScrollView, { contentInsetAdjustmentBehavior: "automatic", style: backgroundStyle },
            React.createElement(Header, null),
            React.createElement(View, { style: {
                    backgroundColor: isDarkMode ? Colors.black : Colors.white,
                } }))));
};
var styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
export default App;
//# sourceMappingURL=App.js.map