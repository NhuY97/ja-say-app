import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { commonStyle } from '~/utils/Utils';
import * as firebase from "firebase";
import * as LocalAuthentication from 'expo-local-authentication';

const appImage = require('~/assets/images/cat-trans.png');
const { width } = Dimensions.get('window');
const IMG_SIZE = width*1/2;

export default function AppHome({navigation}) {

	const [isReady, setReady] = useState(false);

	useEffect(() => {
		checkLocalAuthentication().then(
			r => {
				if (r) {
					if (Platform.OS === 'ios') {
						scanFingerprint();
					} else {
						showAndroidAlert();
					}
				} else {
					authenFirebase();
				}
			}
		).catch(
			e => authenFirebase()
		);
	}, []);

	  const checkLocalAuthentication = () => {
	  	return LocalAuthentication.hasHardwareAsync().then(r => {
			return LocalAuthentication.supportedAuthenticationTypesAsync().then( r => {
					return LocalAuthentication.isEnrolledAsync().then( r => {
						return r;
					})
					})
				}
			);
	  }


	const _cacheResourcesAsync = async () => {
	    const images = [appImage];

	    const cacheImages = images.map(image => {
	      return Asset.fromModule(image).downloadAsync();
	    }); 
	    return Promise.all(cacheImages);
  	}

  	const scanFingerprint = async () => {
	    let result = await LocalAuthentication.authenticateAsync(
	      {promptMessage: 'Vui lòng xác thực để mở khoá Jasay'}
	    );
	    
	    if (result.success) {
	    	authenFirebase();
	    } else {
	    	console.log('Scan Error:', result.error);
	    	scanFingerprint();
	    }

  	};

  	showAndroidAlert = () => {
	    Alert.alert(
	      'Authenication',
	      'Vui lòng xác thực để mở khoá Jasay',
	      [
	        {
	          text: 'Scan',
	          onPress: () => {
	            this.scanFingerprint();
	          },
	        }
	      ]
	    );
  	};

  	const authenFirebase = () => {
		if (firebase.auth().currentUser) {
			console.log('user ' + firebase.auth().currentUser.phoneNumber);
		} else {
			navigation.navigate('HomeLogin');
		}
  	}

    if (!isReady) {
      return (
        <AppLoading
          startAsync={_cacheResourcesAsync}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      );
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
					<View style={styles.contentSession, {justifyContent:'flex-end'}}>
						<Text style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>Design by YZENNY © 2021</Text>
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