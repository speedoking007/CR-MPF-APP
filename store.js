import { AsyncStorage } from "react-native";

let defaultState = {
    statusLogin: false,
    loggedInUser: null,
    loggedInUserDetails :[],
    complainRecords : [],
    missingPersonRecords :[],
    crimeReportRecords: [],
    allCrimeReportRecords :[],
    allMissingPersonRecords:[],
    allComplainRecords: [],
  };

  function reducer (state , action)  {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'REG_USER':
            newState.loggedInUser = action.payload;
            newState.statusLogin = true;
            AsyncStorage.setItem('userToken', JSON.stringify(action.payload));       
        break;
        case 'USER_DETAILS':
        newState.loggedInUserDetails= action.payload;
        AsyncStorage.setItem('userDetails', JSON.stringify(action.payload));       
        break;
        case 'USER_LOGOUT':
        newState = defaultState;
        AsyncStorage.removeItem('userDetails');
        AsyncStorage.removeItem('userToken');
        break;
        case 'COMPLAIN_RECORDS':
       newState.complainRecords = [...action.payload]
        break;
        case 'MISSING_PERSON_RECORDS':
       newState.missingPersonRecords = [...action.payload]
        break;
        case 'CRIME_REPORT_RECORDS':
        newState.crimeReportRecords = [...action.payload];
        break;
        case 'ALL_CRIME_REPORT_RECORDS':
        newState.allCrimeReportRecords = [...action.payload];
        // console.log(newState.allCrimeReportRecords);
        break;
        case 'ALL_MISSING_PERSON_RECORDS':
        newState.allMissingPersonRecords = [...action.payload];
        break;
        case 'ALL_COMPLAIN_RECORDS' :
        newState.allComplainRecords = [...action.payload];
        break;
        default: 
    }
   return newState;
}

export default reducer;
