import * as firebase from 'firebase';
import { Platform } from 'react-native'
import 'firebase/auth';

const appIdIos = '1:876942974248:ios:4fb62d127b695f2864c41d';
const appIdAndroid = '1:876942974248:android:ccdac536404b508664c41d';

const config = {
  apiKey: 'AIzaSyBi_CWc_5XMwIndjfFOFNFHSyE8AByxVSc',
  authDomain: 'jasay-app.firebaseapp.com',
  databaseURL: 'https://jasay-app.firebaseio.com',
  projectId: 'jasay-app',
  storageBucket: 'jasay-app.appspot.com',
  appId: Platform.OS == 'ios' ? appIdIos : appIdAndroid
};

if (!firebase.apps.length) {
	console.log(config);
  firebase.initializeApp(config);
}

export const auth = firebase.auth();

export const loginWithEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);