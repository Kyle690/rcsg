import {IS_LOGGED_IN, UPDATE_PROFILE, UPDATE_PROFILE_ERR,} from "../Types";
import {auth} from "../Firebase/firebase";

export const getProfileData =()=>(dispatch)=>{

    // get the user info and upload it to state
    let user = auth.currentUser;
    if(user!== null){

        const [firstName, lastName]= user.displayName.split(/\s+/);

        dispatch({type:UPDATE_PROFILE, payload:{email:user.email,firstName:firstName, lastName:lastName}})
    }

};

export const saveProfileData = (formValues, callback)=>(dispatch)=>{
  //save new info to database
    let user = auth.currentUser;

    const displayName = formValues.firstName +' '+formValues.lastName;

    user.updateProfile({displayName:displayName})
        .then(()=>{

            dispatch({type:IS_LOGGED_IN, payload:{name:formValues.firstName, uid:user.uid}});
            callback()
        })
        .catch(err=>{
            dispatch({type:UPDATE_PROFILE_ERR, payload:err});

        })



};

