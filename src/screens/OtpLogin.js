import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View,
	SafeAreaView, Dimensions, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { commonStyle, alertMessage } from '~/utils/Utils';
import { AntDesign, Feather } from '@expo/vector-icons';
import * as firebase from "firebase";
import Spinner from 'react-native-loading-spinner-overlay';

const headerFont = Platform.OS == 'ios' ? 'DamascusSemiBold' : 'Roboto';

export default function OtpLogin({ route, navigation }) {

	const [otpCode, setOtpCode] = useState('');
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('Mã OTP đã được gửi đến sđt của bạn!');

	const onChangeTextHandler = (code) => {
		setOtpCode(code);
		if (code.length == 6) {
			console.log(code);
			verifyCode(code);
		}
	}

	const verifyCode = async (verificationCode) => {
        try {
        	startLoading();
            const credential = firebase.auth.PhoneAuthProvider.credential(
              route.params.verificationId,
              verificationCode
            );
            await firebase.auth().signInWithCredential(credential);
 			setLoading(false);
 			navigation.navigate('OnboardTab');
        } catch (err) {
        	console.log(err.message);
            setTitle('OTP không đúng, vui lòng thử lại');
            setLoading(false);
        }
    }

    const startLoading = () => {
	    setLoading(true);
	    setTimeout(() => {
	      setLoading(false);
	    }, 10000);
  };

	const onClearTextHandler = () => {
		setOtpCode('');
	}

	return (
			<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
				<StatusBar barStyle='light-content' style={commonStyle.bgColor}/>
				<View style={commonStyle.container}>
				<Spinner visible={loading} textContent={''} />
					<TouchableOpacity
						style={{width: '20%'}}
						onPress={() => navigation.goBack()}
						activeOpacity={.7}>
						<AntDesign
						    name='arrowleft'
						    size={28}
						    color='#fff'
						    style={styles.backIcon}/>
					</TouchableOpacity>
					<Text style={styles.txt}>{title}</Text>
					<Text style={styles.h1}>Nhập OTP</Text>
					<View style={styles.inputParent}>
						<TextInput 
							value={otpCode} onChangeText={value => onChangeTextHandler(value)} onSubmitEditing={Keyboard.dismiss}
							autoFocus={true} selectionColor='#fff' maxLength={6} style={styles.inputPhone} 
							keyboardType='number-pad' placeholder='000000' placeholderTextColor="#E5FFF1" />
						<TouchableOpacity
							activeOpacity={.7}
							style={styles.closeButtonParent}
	            			onPress={() => onClearTextHandler()} >
	            			<Feather
							    name='x-circle'
							    size={18}
							    color='#fff'
							    style={styles.iconX} />
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
}

const styles = StyleSheet.create({
	backIcon: {
		paddingLeft: 10,
		marginTop: 28,
	},
	h1: {
		color: '#fff',
		fontSize: 28,
		fontWeight: 'bold',
		marginTop: 8,
		paddingLeft: 15,
		fontFamily: headerFont,
	},
	h2: {
		color: '#fff',
		fontSize: 20,
		fontFamily: headerFont,
	},
	h2Active: {
		color: '#41CDCA',
		fontSize: 20,
		fontFamily: headerFont,
	},
	txt: {
		color: '#fff',
		fontSize: 18,
		marginTop: 8,
		paddingLeft: 15,
		fontFamily: headerFont,
	},
	inputPhone: {
		paddingLeft: 5,
		height: 40,
		marginLeft: 12,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		borderColor: '#fff',
		color: '#fff',
		fontSize: 22,
		flex:8,
	},
	inputParent: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	marginTop: 10,
	},
	closeButtonParent: {
		justifyContent: 'center',
    	alignItems: 'center',
    	marginRight: 12,
    	borderColor: '#fff',
    	borderWidth: 1,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
		flex:1
	},
	iconX: {
		paddingRight: 10,
	},
});