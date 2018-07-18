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

class ComplainScreenAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complainItems: [],
      selectedStatus: '',
    };
    this.selectedStatus = this.selectedStatus.bind(this);
  }

  componentDidMount() {
    this.setState({complainItems: this.props.allComplainDetails});
  }

  selectedStatus(value) {
    this.setState({ selectedStatus: value });
    this.filterData(value);
  }

  filterData(value) {
    let a = [];    
    if (value != 'all')
    {
    this.props.allComplainDetails.forEach(record => {
      if (record.status == value) {
        a.push(record);
      }
    });
  }
  else{
    a = [...this.props.allComplainDetails]
  }
    this.setState({ complainItems: a });
  }



  render() {
    return (
      <Animatable.View animation="slideInUp" duration={800} iterationCount={1} direction="alternate" style={[{ flex: 1, }]}>
        <Text style={styles.heading}>Complaints</Text>
          <StatusPickerAll status={this.selectedStatus} value='all'/>
          <ScrollView>
            {this.state.complainItems.map((record, key) => (
              <ListItem
                key={key}
                divider
                centerElement={{
                  primaryText: 'Complain Nature: ' + record.nature,
                  secondaryText: 'Complain Details: ' + record.details,
                  tertiaryText: 'Status:' + record.status,
                }}
                onPress={() => {
                  this.props.history.push({
                      pathname: '/adminComplainStatus',
                      state: {
                        nature: record.nature,
                        details: record.details,
                        status: record.status,
                        remarks: record.remarks,
                        parentKey: record.parentKey,
                        childKey: record.childKey,
                        goto: '/complainAdmin',
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
    allComplainDetails: state.allComplainRecords,
    statusAdmin : state.loggedInUserDetails.userLevel,    
  }
}



export default withRouter(connect(mapStateToProps, null)(ComplainScreenAdmin));

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: 'center',
  }
})