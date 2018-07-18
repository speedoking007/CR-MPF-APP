import React from 'react';
import { StyleSheet, Button, Image, Text, View} from 'react-native';
//import { Card, Button } from 'react-native-material-ui';
//import {withRouter} from 'react-router-native';
import  {ImagePicker} from 'expo';
//import * as firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyCvQM-osJvMeJVIrTUXETRasaB_bzj7AbI",
//     authDomain: "xendre-login-f7129.firebaseapp.com",
//     databaseURL: "https://xendre-login-f7129.firebaseio.com",
//     storageBucket: "xendre-login-f7129.appspot.com",
//     messagingSenderId: "807649152171"
//  };
  
//   firebase.initializeApp(firebaseConfig);

  export default class PickImage1 extends React.Component{
constructor(){
    super();
    console.ignoredYellowBox = [
        'Setting a timer'
      ];
    this.state ={
        pickedImage: null,
        downloadURL : null
    }
}

selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({ pickedImage: result.uri });
    //   this.props.picture(this.state.pickedImage);
    }
}

uploadImage(){
    let authToken = this.props.token;
    console.log(authToken);
    fetch(
        "https://xendre-login-f7129.cloudfunctions.net/storeImage",
        {
          method: "POST",
          body: JSON.stringify({
            image: this.state.pickedImage.base64
          }),
          headers: {
            Authorization: authToken
          }
        }
      )
      .then(res => res.json())
      .then (parsedRes => {console.log (parsedRes.imageUrl)});
}

// uploadImageAsync = async () => {
//     // console.log('function called');
//     var uri = this.state.pickedImage;
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const ref = firebase
//       .storage()
//       .ref()
//       .child('pic');
  
//     const snapshot = await ref.put(blob);
    
//    const url = ref.getDownloadURL().
//         then (url=>{
//     this.setState({
//         downloadURL: url
//     });
//   });
//  }

  
    render(){
        return(
            <View>
            <View style = {{width: 200, height: 200,  backgroundColor: 'grey'}}>
          <Image source={{ uri: this.state.pickedImage }} style={{ width: 200, height: 200}} />            
            </View>
            <Button
          title="Pick Image"
          onPress={this.selectImage.bind(this)}
        />
            <Button
          title="Upload"
          onPress={this.uploadImage.bind(this)}
        />
            </View>
        );
    }
}