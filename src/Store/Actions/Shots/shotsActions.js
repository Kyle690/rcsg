import {GET_SHOTS} from "../../Types";

import {auth, database} from "../../Firebase/firebase";

export const getShots =()=>(dispatch, getState)=>{
    if(getState().shots.shots === null){
        const ref = database.ref('shots');
        ref.on('value', snapshot=>{
            if(snapshot.val() !== null){
                const shots =[];

                snapshot.forEach(shot=>{
                    const id = shot.ref.key;
                    const shotDetails = shot.val();
                    shotDetails.id = id;
                    shots.push(shotDetails);
                });

                if(shots.length >0){
                    dispatch({type:GET_SHOTS, payload:{shots:shots, error:null}});
                }
            }else{
                dispatch({type:GET_SHOTS, payload:{shots:null, error:'No Shots loaded'}});
            }


        })
    }

};