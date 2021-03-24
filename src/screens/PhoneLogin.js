import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Text, View,
	SafeAreaView, Dimensions, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native';
import { commonStyle } from '~/utils/Utils';
import { AntDesign, Feather } from '@expo/vector-icons';
import ButtonWithIcon from '~/components/ButtonWithIcon';

const headerFont = Platform.OS == 'ios' ? 'DamascusSemiBold' : 'Roboto';

export default function PhoneLogin({ navigation }) {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [keyboardHeight, setKeyboardHeight] = useState(0);

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

	return (
		<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
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
				<Text style={styles.h1}>Xin chào!</Text>
				<Text style={styles.h1}>Nhập số điện thoại</Text>
				<View style={styles.inputParent}>
					<TextInput 
						value={phoneNumber} onChangeText={value => setPhoneNumber(value)} onSubmitEditing={Keyboard.dismiss}
						autoFocus={true} selectionColor='#fff' maxLength={11} style={styles.inputPhone} 
						keyboardType='number-pad' placeholder='0000000000' placeholderTextColor="#E5FFF1" />
					<TouchableOpacity
						activeOpacity={.7}
						style={styles.closeButtonParent}
            			onPress={() => setPhoneNumber('')} >
            			<Feather
						    name='x-circle'
						    size={18}
						    color='#fff'
						    style={styles.iconX} />
					</TouchableOpacity>
				</View>
				<View style={commonStyle.container}>
					<View style={{flex:1}}></View>
					<TouchableOpacity
						activeOpacity={.7}
						style={[styles.nextBtn, {transform: [{ translateY: -(keyboardHeight) }]}]}
            			onPress={() => alert('ok')} >
        				<Text style={styles.h2} >NEXT</Text>
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
		flex:8
	},
	inputParent: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
    	marginTop: 10
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
});