import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Image, Dimensions } from 'react-native';
import { alertMessage, commonStyle } from '~/utils/Utils';
import ButtonWithIcon from '~/components/ButtonWithIcon';

const appImage = require('~/assets/images/cat-trans.png');
const { width } = Dimensions.get('window');
const IMG_SIZE = width*1/2;

export default function HomeLogin({navigation}) {

	const _onPressPhoneLogin = () => {
		navigation.navigate('PhoneLogin');
	}

	const _onPressFbLogin = () => {
		alertMessage('Chức năng này đang tạm thời bị khóa!');
	}

	const _onPressAppleLogin = () => {
		alertMessage('Chức năng này đang tạm thời bị khóa!');
	}

	return (
			<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
				<StatusBar barStyle='light-content' style={commonStyle.bgColor} />
				{/* */}
				<View style={[commonStyle.container]}>
					{/* */}
					<View style={[styles.imageSession]}>
						<Image source={appImage} resizeMode='cover' style={styles.imgCenter} borderRadius={100} />
						<Text style={styles.title}>JASAY</Text>
						<Text style={styles.slogan}>GIẶT SẤY LẤY NGAY</Text>
					</View>
					{/* */}
					<View style={styles.contentSession}>
						{
							[
								{title:'Continue with Mobile Number', icon:'phone-square', backgroundColor:'#fff', iconColor:'#41CDCA', color:'#41CDCA', onPress:_onPressPhoneLogin},
								{title:'Continue with Facebook', icon:'facebook-square', backgroundColor:'#3B5998', iconColor:'#fff', color:'#fff', onPress:_onPressFbLogin},
								{title:'Continue with Apple', icon:'apple', backgroundColor:'#000', iconColor:'#fff', color:'#fff', onPress:_onPressAppleLogin},
							]
							.map((data, index) => {
							return (
									<ButtonWithIcon
										key={index.toString()}
										title={data.title}
										icon={data.icon}
										backgroundColor={data.backgroundColor}
										iconColor={data.iconColor}	
										color={data.color}
										onPress={data.onPress}																								
									/>
								);
							})
						}
					</View>
					{/* */}
				</View>
				{/* */}
			</SafeAreaView>
		);
}

const styles = StyleSheet.create({
	imageSession: {
		flex: 2,
		alignItems: 'center', 
		justifyContent: 'center',
	},
	imgCenter: {
		width: IMG_SIZE,
		height: IMG_SIZE,
		backgroundColor: '#fff',
		borderRadius: IMG_SIZE,
		overflow: "hidden",
		marginBottom: 14,
	},
	title: {
		color: '#fff',
		fontSize: 64,
		fontWeight: 'bold',
		letterSpacing: 4,
	},
	slogan: {
		color: '#fff',
		fontSize: 24
	},
	contentSession: {
		flex: 1,
      	alignItems: 'center'
	},

});