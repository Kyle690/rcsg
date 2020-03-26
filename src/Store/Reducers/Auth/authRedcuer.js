
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGIN_ERR,
    SIGN_UP_ERR,
    SIGN_UP_SUCCESS,
    IS_LOGGED_IN,
    LOGOUT,
    RESETPASSWORD_ERR
} from "../../Types";

const INITIAL_STATE = {
  isLoggedIn:false,
  logInErr:null,
  userId: null,
  displayName:null,
  signUpErr:null,
    resetPasswordErr:null


};

export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case RESETPASSWORD_ERR:
            return{...state,isLoggedIn:false, userId:null,logInErr:null,displayName:null, signUpErr:null, resetPasswordErr: action.payload};
        case LOGIN_SUCCESS:
            return {...state, isLoggedIn: true, userId:action.payload.uid, displayName:action.payload.name,resetPasswordErr:null};
        case LOGIN_FAILED:
            return {...state};
        case LOGIN_ERR:
            return {...state, logInErr:action.payload};
        case SIGN_UP_ERR:
            return{...state, signUpErr: action.payload };
        case SIGN_UP_SUCCESS:
            return {...state, isLoggedIn:true,resetPasswordErr:null, signUpErr:null, userId: action.payload.uid, displayName: action.payload.displayName};
        case IS_LOGGED_IN:
            return {isLoggedIn:true, userId:action.payload.uid, displayName:action.payload.name, signUpErr:null, logInErr: null, resetPasswordErr:null };
        case LOGOUT:
            return {...INITIAL_STATE};
        default:
            return{...state}
    }
}