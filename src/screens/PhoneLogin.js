import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View,
	SafeAreaView, Dimensions, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { commonStyle, alertMessage } from '~/utils/Utils';
import { AntDesign, Feather } from '@expo/vector-icons';
import { firebaseConfig, getVerificationId } from '~/Firebase/firebase';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import parsePhoneNumber from 'libphonenumber-js';

const headerFont = Platform.OS == 'ios' ? 'DamascusSemiBold' : 'Roboto';

export default function PhoneLogin({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [title, setTitle] = useState('Xin chào!');
	const [isBtnActive, setBtnActive] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const [btnNextY, setBtnNextY] = useState(0);
	const recaptchaVerifier = useRef(null);

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
		Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

		// cleanup function
		return () => {
			  Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
			  Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
		};
	}, []);

	const _keyboardDidShow = (e) => {
		setKeyboardHeight(e.endCoordinates.height);
	};

	const _keyboardDidHide = () => {
		setKeyboardHeight(0);
	};

	const onChangeTextHandler = (phone) => {
		setPhoneNumber(phone);
		if (phone.length >= 10 && !isBtnActive) {
			setBtnActive(true);
		} else if (phone.length < 10 && isBtnActive) {
			setBtnActive(false);
		}
	}

	const onClearTextHandler = () => {
		setPhoneNumber('');
		setBtnActive(false);
	}

	const register = async () => {
          try {
          	const phoneNumberToVerify = parsePhoneNumber(phoneNumber, 'VN');
          	console.log('Phone to verify: ' + phoneNumberToVerify.number);
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumberToVerify.number,
              recaptchaVerifier.current
            );
            navigation.navigate('OtpLogin', {verificationId: verificationId});
          } catch (err) {
          	console.log('recaptcha err code: ' + err.code + ' - msg : ' + err.message);
          	if (err.code !== 'ERR_FIREBASE_RECAPTCHA_CANCEL') {
          		setTitle(err.message)
          	}
          }
    }
	

	const onLayout=(event)=> {
    	setBtnNextY(event.nativeEvent.layout.y);
  	}

	return (
		<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
		    <FirebaseRecaptchaVerifierModal
        			ref={recaptchaVerifier}
        			firebaseConfig={firebaseConfig}
        	/>
			<StatusBar barStyle='light-content' style={commonStyle.bgColor}/>
			<View style={commonStyle.container}>
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
				<Text style={styles.h1}>{title}</Text>
				<Text style={styles.h1}>Nhập số điện thoại</Text>
				<View style={styles.inputParent}>
					<TextInput 
						value={phoneNumber} onChangeText={value => onChangeTextHandler(value)}
						autoFocus={true} selectionColor='#fff' maxLength={11} style={styles.inputPhone} 
						keyboardType='phone-pad' placeholder='0000000000' placeholderTextColor="#E5FFF1" />
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
				<View style={commonStyle.container}>
					<View style={{flex:1,justifyContent: 'flex-end'}}>

						<TouchableOpacity
							activeOpacity={.7}
							style={[styles.nextBtn, isBtnActive ? styles.btnActive : styles.btnInactive, {transform: [{ translateY: -(btnNextY > 200 ? keyboardHeight : 0) }]} ]} 
							disabled={!isBtnActive}
	            			onPress={register} 
	            			onLayout={onLayout}>
	        				<Text style={isBtnActive ? styles.h2Active : styles.h2} >NEXT</Text>
						</TouchableOpacity>

					</View>
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
	nextBtn: {
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center', 
		width: '100%',
		height: 50,
	},
	btnInactive: {
		backgroundColor: '#ccc',
	},
	btnActive: {
		backgroundColor: '#fff',
	},
});