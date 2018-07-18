import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image
} from "react-native";

const picture = {
  Crime : '../../images/CrimeReport-512.png'
}
const RoundedButton = props => {
  // let a = picture[props.name];
  return( <TouchableOpacity onPress={props.onPress}>
   <View
      style={[
        styles.button,
        { backgroundColor: props.color }
      ]}
    >
    {/* <Image source = {require(a)}/> */}
      <Text >
        {props.name}
      </Text>
    </View>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    flex: 0.2,
    //justifyContent: 'flex-start'
  }
});

export default RoundedButton;
