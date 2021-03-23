import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Dimensions, TextInput, TouchableOpacity, Platform } from 'react-native';
import { commonStyle } from '~/utils/Utils';
import { AntDesign, Feather } from '@expo/vector-icons';
import ButtonWithIcon from '~/components/ButtonWithIcon';

const headerFont = Platform.OS == 'ios' ? 'DamascusSemiBold' : 'Roboto';

export default function PhoneLogin({ navigation }) {

	return (
		<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
			<StatusBar barStyle='light-content' style={commonStyle.bgColor}/>
			<View>
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
					<TextInput autoFocus={true} selectionColor='#fff' maxLength={11} style={styles.inputPhone} keyboardType='number-pad' placeholder='0000000000' placeholderTextColor="#E5FFF1" />
					<TouchableOpacity
						style={styles.closeButtonParent}
            			onPress={() => setText('')} >
            			<Feather
						    name='x-circle'
						    size={18}
						    color='#fff'/>
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
		marginTop: 10,
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
		width: '90%'
	},
	inputParent: {
		flexDirection: 'row',
    	justifyContent: 'space-between',
	},
	closeButtonParent: {
		justifyContent: 'center',
    	alignItems: 'center',
    	marginRight: 20,
    	borderColor: '#fff',
    	borderWidth: 1,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderTopWidth: 0,
	},
});