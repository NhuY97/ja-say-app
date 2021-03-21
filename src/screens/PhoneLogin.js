import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, Image, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function PhoneLogin() {

	const fetchFonts = () => {
		return Font.loadAsync({
			'bubblegum': require('~/assets/fonts/Bubblegum.ttf')
		});
	};

	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (
			<AppLoading 
				startAsync={fetchFonts} 
				onFinish={() => setDataLoaded(true)} 
				onError={console.log}
				/>
			);
	}

	return (
			<SafeAreaView style={[styles.container, styles.bgColor]}>
				<StatusBar barStyle='light-content' style={styles.bgColor} />
				{/* */}
				<View style={[styles.container]}>
					{/* */}
					<View style={[styles.imageSession]}>
						<Image source={require('~/assets/images/cat-trans.png')} resizeMode='contain' style={styles.imgCenter} />
						<Text style={styles.slogan}>JASAY</Text>
					</View>
					{/* */}
					<View style={styles.contentSession}>
						<Text>Haa5a5sssfhai</Text>
					</View>
					{/* */}
				</View>
				{/* */}
			</SafeAreaView>
		);
}

const { width } = Dimensions.get('window');
const IMG_SIZE = width*1/2;

const styles = StyleSheet.create({
	container: {
		flex:1
	},
	bgColor: {
		backgroundColor: '#41CDCA'
	},
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
	slogan: {
		color: '#fff',
		fontSize: 64,
		fontFamily: 'bubblegum',
		fontWeight: 'bold',
	},
	contentSession: {
		flex: 1,
	},
});