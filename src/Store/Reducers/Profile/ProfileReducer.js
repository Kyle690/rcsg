import {UPDATE_PROFILE, UPDATE_PROFILE_ERR} from "../../Types";

const INITIAL_STATE = {

    firstName:'',
    lastName:'',
    email:'',
    upDateError:null
};

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case UPDATE_PROFILE_ERR:
            return{...state, upDateError:action.payload};
        case UPDATE_PROFILE:
            return{email:action.payload.email, lastName:action.payload.lastName, firstName:action.payload.firstName, upDateError: null};
        default:
            return{...state}
    }
}