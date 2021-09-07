import React, { useRef, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity,  StatusBar, TextInput } from 'react-native';   
  
import styles from './Styles';

 
const SignIn: React.FC = () => (  
    
        <>
            <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true} />
            <View style={styles.container}>


                <View  style={styles.content}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoImg}   />
                    </View>
                    <TextInput   placeholder="Telefone"  keyboardType={'decimal-pad'} />
                    <TextInput placeholder="Senha"   keyboardType={'decimal-pad'} secureTextEntry />

                    <TouchableOpacity style={styles.loginButton} onPress={() => {}}> 
                        <Text style={styles.loginButtonText}>ACESSAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.loginRegister}>CADASTRE-SE</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        </> 
);

export default SignIn;
