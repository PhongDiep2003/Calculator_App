import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableHighlight } from 'react-native';

function Button({onPress, styleContainer, text, textStyle}) {
  return (
    
    <TouchableHighlight onPress={onPress} underlayColor={'#778899'} >
        <View style={[styles.container, styleContainer]}>
       
            <Text style={[styles.textStyle, textStyle]}>
                  {text}
            </Text>
     
        </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems:'center',
    borderColor:'black',
    width: 110,
    height: 110,
    borderWidth: 0.2
  },
  textStyle: {
    fontSize: 40,
    fontWeight:'400'
    

  }
});

export default Button;