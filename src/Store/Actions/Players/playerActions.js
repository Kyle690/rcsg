import {ADD_PLAYER, EDIT_PLAYER,DELETE_PLAYER, GET_PLAYERS} from "../../Types";
import {auth, database} from "../../Firebase/firebase";


export const add_player = (formValues, callback) =>()=>{

    let user = auth.currentUser;
    if(user != null){
        const uid = user.uid;

        const ref = database.ref(`players/${uid}/`);

        let nickName ='';
        if(formValues.nickName !== undefined){
            nickName=formValues.nickName;
        }

        ref.push({
            firstName:formValues.firstName,
            nickName:nickName,
            lastName:formValues.lastName,
            battingStyle:formValues.battingStyle,
            innings:0,
            rating:0

        }, err=>{
            if(err){
                console.log(err)
            }else{
                callback()
            }

        })



    }
};

export const get_players = ()=>dispatch=>{

    let user = auth.currentUser;

    if(user != null){
        const uid = user.uid;
        const ref = database.ref(`players/${uid}/`);
        ref.on('value', snapshot=>{
            const players =[];

            snapshot.forEach(player=>{
                const id = player.ref.key;
                const playerDetails = player.val();
                playerDetails.id = id;
                players.push(playerDetails);
            });

            if(players.length >0){
                dispatch({type:GET_PLAYERS, payload:{players:players, error:null}});
            }else{
                dispatch({type:GET_PLAYERS, payload:{players:'', error:'No Players yet'}})
            }

        })
    }else{
        dispatch({type:GET_PLAYERS, payload:{players:'', error:'Error Getting Players'}})
    }




};


export const edit_player =(player)=>dispatch=>{

    if(player !== ''){
        dispatch({type:EDIT_PLAYER, payload:player});
    }

};

export const savePlayer = (formValues, callback)=>()=>{
    let user = auth.currentUser;
    if(user !== null){
        const ref = database.ref(`players/${user.uid}/${formValues.id}`);

        ref.update({
            firstName:formValues.firstName,
            nickName:formValues.nickName,
            lastName:formValues.lastName,
            battingStyle:formValues.battingStyle,
            log:[]
        }, err=>{
            if(err){
                console.log(err);
            }else{
                callback()
            }
        })
    }
};


export const deletePlayer = (id, callback)=>()=>{

   let user = auth.currentUser;
   if(user !== null){
       const ref = database.ref(`players/${user.uid}/${id}`);
       ref.remove();

       callback();
   }
};