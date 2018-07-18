import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';

class StatusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={{ flex: 1, width: '95%', marginLeft: '2.5%' }}>
        <ScrollView>
        <Text style= {styles.heading}>Missing Person Status</Text>
        <Card>
        
        <View style={{alignItems: 'center'}}>
        <Image 
              source={{ uri: this.props.location.state.picUrl }} 
              indicator={ProgressCircle}
              indicatorProps={{
                size: 60,
                borderWidth: 1,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: 200,
                height: 200
              }}/>
         </View>
       
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Name: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.name} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Age: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.age} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Contact: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.contact} </Text>        
        </View>
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Details: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.details} </Text>                
        </View>
        {!this.props.location.state.allRecords ?
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Status: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.status} </Text>        
        </View> :null}
        {!this.props.location.state.allRecords ?        
        <View style = {styles.fieldView}>
        <Text style = {styles.labels}>Remarks: </Text>
        <Text style = {styles.fieldValue}>{this.props.location.state.remarks} </Text>                
        </View> : null }
        <View style = {{alignItems: 'center', marginBottom: 5}}>
        <Button onPress={()=>{this.props.location.state.allRecords ?
          this.props.history.push({
            pathname: this.props.location.state.goto,
            state: { allRecords: true}})
          :
          this.props.history.push({
            pathname: this.props.location.state.goto,
            state: { allRecords: false}})
          }} 
          raised primary text="Back to List" />                        
        </View>
        </Card>
        </ScrollView>
      </Animatable.View>
    );
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatusScreen));

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 20,
      },
    labels: {
       fontSize: 16, 
    },
    fieldValue: {
        fontSize: 16,
    },
    fieldView:{
        width: '100%',
        height: 35,
        flexDirection: 'row',
        marginLeft: 10,
    }
    
});