import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import { ListItem } from 'react-native-material-ui';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
import * as Animatable from 'react-native-animatable';
import StatusPickerAll from '../../../components/StatusPickerAll/StatusPickerAll';

class MissingPersonScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missingPersonItems: [],
      selectedStatus: '',
    };
    this.selectedStatus = this.selectedStatus.bind(this);
  }

  componentDidMount() {
    this.setState({missingPersonItems: this.props.allMissingPersonDetails});
  }

  selectedStatus(value) {
    this.setState({ selectedStatus: value });
    this.filterData(value);
  }

  filterData(value) {
    let a = [];    
    if (value != 'all')
    {
    this.props.allMissingPersonDetails.forEach(record => {
      if (record.status == value) {
        a.push(record);
      }
    });
  }
  else{
    a = [...this.props.allMissingPersonDetails]
  }
    this.setState({ missingPersonItems: a });
  }



  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
        <Text style={styles.heading}>Missing Person</Text>
          <StatusPickerAll status={this.selectedStatus} value='all'/>
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
                    }} />
                }
                centerElement={{
                  primaryText: 'Missing Name: ' + record.name + ' (Age: ' + record.age + ')',
                  secondaryText: 'Contact: ' + record.contact,
                  tertiaryText: 'Details:' + record.details,
                }}
                onPress={() => {
                  this.props.history.push({
                      pathname: '/adminMissingStatus',
                      state: {
                        name: record.name,
                        age: record.age,
                        contact: record.contact,
                        details: record.details,
                        picUrl: record.picUrl,
                        status: record.status,
                        remarks: record.remarks,
                        parentKey: record.parentKey,
                        childKey: record.childKey,
                        goto: '/adminMissing',
                      }
                    })
                }} />
            ))}
          </ScrollView>
      </Animatable.View>
    );
  }
}
function mapStateToProps(state) {
  return {
    allMissingPersonDetails: state.allMissingPersonRecords,
    statusAdmin : state.loggedInUserDetails.userLevel,    
  }
}


export default withRouter(connect(mapStateToProps, null)(MissingPersonScreenAdmin));

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'center',
  }
})