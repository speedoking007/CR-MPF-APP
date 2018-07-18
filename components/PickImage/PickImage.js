import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
//import { Card, Button } from 'react-native-material-ui';
//import {withRouter} from 'react-router-native';
import  {ImagePicker, Camera, Permissions} from 'expo';
import Image from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';


  export default class PickImage extends React.Component{
constructor(){
    super();
    console.ignoredYellowBox = [
        'Setting a timer'
      ];
    this.state ={
        pickedImage: null,
        hasCameraPermission: null,
        hasCameraRollPermission: null,
        type: Camera.Constants.Type.back,
        selection: null
    }
}

async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);    
    this.setState({ hasCameraPermission: status === 'granted' });
    const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);    
    this.setState({ hasCameraRollPermission: status_roll === 'granted' });
    
  }

selectImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
      aspect: [1, 1],
      quality : 1,
    });
 if (!result.cancelled) {
         this.setState({ pickedImage: result.uri });   
         this.props.fn(result.uri);
    }
}

startCamera= async() =>{
    if (this.state.hasCameraPermission)
    {
 let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
              aspect: [1, 1],
              quality : 1,
            });
         if (!result.cancelled) {
                 this.setState({ pickedImage: result.uri });   
                 this.props.fn(result.uri);
            }
}
else
{
    const { status } = await Permissions.askAsync(Permissions.CAMERA);    
    this.setState({ hasCameraPermission: status === 'granted' });
    const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);    
    this.setState({ hasCameraRollPermission: status_roll === 'granted' });
}
}



removeSelectedImage(){
    this.setState({pickedImage: null});
}
  
    render(){
        return(
            <View style={{alignItems: 'center'}}>
            {this.state.pickedImage  ?  
            <View style = {{width: 200, height: 200,}}>
            <TouchableOpacity onPress = {this.removeSelectedImage.bind(this)} style = {{width: 60, height: 20, position: 'absolute', top: 0, right: 0, zIndex: 12 }}>
            <Text style={{color: 'red', fontSize: 12}}>(Remove)</Text>
            </TouchableOpacity>
            <Image 
              source={{ uri: this.state.pickedImage }} 
              indicator={ProgressPie}
              indicatorProps={{
                size: 60,
                borderWidth: 1,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: 200,
                height: 200,
              }}/>
              </View>
              :
              null 
              }
            <View style = {{flex: 1, width: '100%', flexDirection: 'row', justifyContent:'space-around', alignItems:'center'}}>
            <TouchableOpacity style={{width:60, height: 80}} onPress = {this.selectImage.bind(this)}>
                <Image source ={require('../../images/gallery-icon1.png')} style={{width: 50, height: 50}} />
                <Text>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:60, height: 80}} onPress = {this.startCamera.bind(this)}>
                <Image source ={require('../../images/camera-icon1.png')}  style={{width: 50, height: 50}} />
                <Text>Camera</Text>
            </TouchableOpacity>
            </View>
            </View>
        );
    }
}