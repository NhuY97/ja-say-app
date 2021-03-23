import { Alert, StyleSheet } from 'react-native';


const BG_COLOR = '#41CDCA';

export const alertMessage = (msg) => {
	Alert.alert(
		msg
	);
}

export const commonStyle = StyleSheet.create({
	container: {
		flex:1
	},
	bgColor: {
		backgroundColor: BG_COLOR
	},
});