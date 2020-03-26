import {GET_TEAMS, ADD_TEAM, EDIT_TEAM} from "../../Types";

import {auth, database} from "../../Firebase/firebase";


export const getTeams =()=>(dispatch, getState)=>{

      let user = auth.currentUser;
      if(user !== null){
          const ref = database.ref(`teams/${user.uid}`);
          ref.on('value', snapshot=>{

              if(snapshot.val()!== null){
                  const teams =[];

                  snapshot.forEach(team=>{
                      const id = team.ref.key;
                      const teamDetails = team.val();
                      teamDetails.id = id;
                      teams.push(teamDetails);
                  });

                  if(teams.length >0){
                      dispatch({type:GET_TEAMS, payload:{teams:teams, error:null}});
                  }else{
                      //ref.off();
                      dispatch({type:GET_TEAMS, payload:{teams:null, error:'No teams added yet!'}})
                  }
              }else{
                  dispatch({type:GET_TEAMS, payload:{teams:null, error:'No teams added yet!'}})
              }


          })
      }

};

export const addTeam = (formValues, callBack)=> (dispatch, getState)=>{
  let user = auth.currentUser;
  if(user !== null){
      const ref = database.ref(`teams/${user.uid}`);
      ref. push({
          type:formValues.type,
          teamName: formValues.teamName,
          teamPlayers: formValues.teamPlayers,
          gamesPlayed:0
      }, err=>{
          if(err){
              console.log(err)
          }else{

              callBack();
          }
      })
  }
};

export const editTeam = (team)=>(dispatch)=>{
    dispatch({type:EDIT_TEAM, payload:team});
};

export const saveTeam = (formValues, callback)=>()=>{

    console.log(formValues);
    let user =auth.currentUser;
    if(user !== null){
        const ref = database.ref(`teams/${user.uid}/${formValues.id}`);
        ref.update({
            type:formValues.type,
            teamName: formValues.teamName,
            teamPlayers: formValues.teamPlayers,
            gamesPlayed:formValues.gamesPlayed
        }, err=>{
            if(err){
                console.log(err);
            }else{
                callback();
            }
        })
    }
};

export const deleteTeam =(formValues, callback)=>()=>{
  let user = auth.currentUser;
  if(user !== null){
      const ref = database.ref(`teams/${user.uid}/${formValues}`);
      ref.remove();
      callback();
  }
};

