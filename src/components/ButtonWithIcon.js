import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ButtonWithIcon(route) {
  return (
    <TouchableHighlight
      style={[styles.btnClickContain, {backgroundColor:route.backgroundColor}]}
      underlayColor='#042417'>
      <View
        style={styles.btnContainer}>
        <FontAwesome
          name={route.icon}
          size={25}
          color={route.iconColor}
          style={styles.btnIcon}/>
        <Text style={[styles.btnText, {color:route.color}]}>{route.title}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  btnClickContain: {
    height:'20%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 5,
    marginTop: 15,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnIcon: {
    flex: 1,
    paddingLeft: 20
  },
  btnText: {
    flex: 9,
    fontSize: 18,
    marginLeft: 10,
    marginTop: 2,
  }
});

