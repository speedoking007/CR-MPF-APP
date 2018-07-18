import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ListItem } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';

class MissingPersonScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    missingPersonItems: []
    };
  }

  componentDidMount(){
    if (this.props.allRecords){
    this.setState({missingPersonItems : this.props.allMissingPersonDetails});
   }
   else{
    this.setState({missingPersonItems : this.props.missingPersonDetails});
   }
  }
  
  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1,  }]}>                                                
        {this.props.allRecords ? null :<Text style={styles.heading}>Missing Persons</Text>}
        <ScrollView>
        {this.state.missingPersonItems.map((record, key) => (
          <ListItem
            key={key}
            divider
            leftElement={
              <Image 
              source={{ uri: record.picUrl }} 
              indicator={ProgressCircle}
              indicatorProps={{
                size: 30,
                borderWidth: 1,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
              style={{
                width: 50,
                height: 50,
              }}/>
               }
            centerElement={{
              primaryText: 'Name: ' + record.name + ' (age : ' + record.age + ' )',
              secondaryText: 'Contact Number: ' + record.contact,
              tertiaryText: 'Details:' + record.details,
            }}
            onPress={() => {this.props.allRecords ?  this.props.history.push({
              pathname: '/missingStatus',
              state: { 
                name: record.name,
                age: record.age,
                contact: record.contact,
                details: record.details,
                picUrl: record.picUrl,
                goto: '/viewReports',
                allRecords: true
               }
            })
            : this.props.history.push({
              pathname: '/missingStatus',
              state: { 
                name: record.name,
                age: record.age,
                contact: record.contact,
                details: record.details,
                picUrl: record.picUrl,
                status: record.status,
                remarks: record.remarks,
                goto: '/missing',
                allRecords: false
               }
            })
          }} />)
        )}
       {(this.state.missingPersonItems.length == 0) ? <Text style={styles.subHeading}>No Missing Persons</Text> : null}
        
        </ScrollView>
          {(this.props.statusLogin && !this.props.allRecords) ?
        <ActionButton
          position='right'
          buttonColor='rgba(231,76,60,1)'
          onPress={() => { this.props.history.push('/missingForm') }}
          offsetY={10}
        />: null}
      </Animatable.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    missingPersonDetails: state.missingPersonRecords,
    statusLogin: state.statusLogin,
    allMissingPersonDetails: state.allMissingPersonRecords,
  }
}

export default withRouter(connect(mapStateToProps, null)(MissingPersonScreen));

const styles = StyleSheet.create({
  heading:{
    fontSize: 20,
    textAlign: 'center',
  },
  subHeading:{
    fontSize: 16,
    textAlign: 'center',
  }
})