import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import { commonStyle } from '~/utils/Utils';
import ButtonWithIcon from '~/components/ButtonWithIcon';
import * as firebase from "firebase";

export default function UserScreen({navigation}) {
	const onSignOut = () => {
		firebase.auth().signOut();
		navigation.navigate('HomeLogin');
	}
	return (
			<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
				<StatusBar barStyle='light-content' style={commonStyle.bgColor} />
				{/* */}
				<View style={[commonStyle.container]}>
					<Text>Hello ReportScreen!</Text>
					<ButtonWithIcon
										title='Sign out'
										icon='phone-square'
										backgroundColor='#fff'
										iconColor='#41CDCA'
										color='#41CDCA'
										onPress={onSignOut}																								
									/>
				</View>
				{/* */}
			</SafeAreaView>
		);
}