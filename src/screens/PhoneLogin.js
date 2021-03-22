import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Image, Dimensions, TextInput } from 'react-native';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

const appImage = require('~/assets/images/cat-trans.png');

export default function PhoneLogin() {

	const [isReady, setReady] = useState(false);

	const _cacheResourcesAsync = async () => {
	    const images = [appImage];

	    const cacheImages = images.map(image => {
	      return Asset.fromModule(image).downloadAsync();
	    }); 
	    return Promise.all(cacheImages);
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
			<SafeAreaView style={[styles.container, styles.bgColor]}>
				<StatusBar barStyle='light-content' style={styles.bgColor} />
				{/* */}
				<View style={[styles.container]}>
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
								{title:'Continue with Mobile Number', icon:'phone-square', backgroundColor:'#fff', iconColor:'#41CDCA', color:'#41CDCA'},
								{title:'Continue with Facebook', icon:'facebook-square', backgroundColor:'#3B5998', iconColor:'#fff', color:'#fff'},
								{title:'Continue with Apple', icon:'apple', backgroundColor:'#000', iconColor:'#fff', color:'#fff'},
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