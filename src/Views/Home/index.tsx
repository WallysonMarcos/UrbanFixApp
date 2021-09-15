import React from 'react';
import { View, StatusBar } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Home: React.FC = () => (
    <View style={{ flex: 1, justifyContent: `center`, alignItems:'center', backgroundColor: '#fff' }}>
        <Icon name="home" size={90} />
    </View>
);

export default Home;
