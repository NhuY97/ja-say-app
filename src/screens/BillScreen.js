import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, 
	SafeAreaView, Image, Dimensions, Platform } from 'react-native';
import { commonStyle } from '~/utils/Utils';

export default function BillScreen({navigation}) {
	return (
			<SafeAreaView style={[commonStyle.container, commonStyle.bgColor]}>
				<StatusBar barStyle='light-content' style={commonStyle.bgColor} />
				{/* */}
				<View style={[commonStyle.container]}>
					<Text>Hello BillScreen!</Text>
				</View>
				{/* */}
			</SafeAreaView>
		);
}