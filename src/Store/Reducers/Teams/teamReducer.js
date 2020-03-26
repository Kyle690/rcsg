import {ADD_TEAM, GET_TEAMS, EDIT_TEAM} from "../../Types";

const INITIAL_STATE ={
  teams:null,
  error:null,
    editTeam:''
};

export default (state=INITIAL_STATE, action)=>{
  switch (action.type){
      case GET_TEAMS:
          return {...state,teams:action.payload.teams, error:action.payload.error};
      case ADD_TEAM:
          return {...state, teams:action.payload};
      case EDIT_TEAM:
          return {...state, editTeam: action.payload};
      default:
          return {...state};
  }

};