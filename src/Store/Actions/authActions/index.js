import {SIGN_UP_SUCCESS, SIGN_UP_ERR, LOGIN_ERR, LOGIN_SUCCESS, IS_LOGGED_IN, LOGOUT, RESETPASSWORD_ERR} from "../../Types";
import {auth} from "../../Firebase/firebase";


//register a new user
export const register = (formValues, callback) => async(dispatch)=>{

    const {email, password, firstName, lastName}=formValues;

    auth.createUserWithEmailAndPassword(email,password)
        .then((uid)=>{
           let user = auth.currentUser;
           user.updateProfile({
               displayName: firstName+' '+lastName
           })
               .then(()=>{
                   dispatch({type:SIGN_UP_SUCCESS, payload:{uid:uid, displayName: firstName}});
                   callback();
               })
               .catch(err=>{
                   dispatch({type:SIGN_UP_ERR, payload:err})
               })

        })
        .catch(err=>{
            dispatch({type:SIGN_UP_ERR, payload:err})
        });
};
// log the user in
export const logUserIn = (formValues, callback)=> async (dispatch)=>{

    //console.log('loginFunction called');
    const {email, password}=formValues;
    auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
            let user = auth.currentUser;
            if(user !== null){
                const [firstName,lastName]=user.displayName.split(/\s+/);
                dispatch({type:LOGIN_SUCCESS, payload:{name:firstName, uid:user.uid}});
                callback();
            }
        })
        .catch(err=>{
            dispatch({type:LOGIN_ERR, payload:err})
        })
};
//check if user is valid and logged in
export const userIsLoggedIn =(callback)=>async(dispatch)=>{

    auth.onAuthStateChanged(user=>{
        if(user){
            const [firstName, lastName] = user.displayName.split(/\s+/);

            dispatch({type:IS_LOGGED_IN, payload:{name:firstName, uid:user.uid}});
            callback()
        }
    })

};
//send email link to reset password
export const forgotPassword = (formValues, callback)=>async(dispatch)=>{


    auth.sendPasswordResetEmail(formValues.resetEmail)
        .then(
            callback({status:1})
        )
        .catch(err=>{
            dispatch({type:RESETPASSWORD_ERR, payload:{message:err}})
        })


};
//log user out
export const logUserOut =(callback)=>async(dispatch)=>{

    try {
        await auth.signOut();
        dispatch({type:LOGOUT});
        callback();
    }catch(err){
        console.log(err)
    }
};
