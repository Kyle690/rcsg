import {auth, database} from "../../Firebase/firebase";
import {GET_GAMES, GET_GAMES_ERROR} from "../../Types";



export const addGame  = (formValues, callback)=>()=>{

    let user = auth.currentUser;
    if(user !== null){
        const shotsRef = database.ref('shots');
        shotsRef.on('value', snapshot=>{
            if(snapshot.val() !== null){
                const shots ={};
                snapshot.forEach(shot=>{
                    const id = shot.ref.key;
                    shots[id]=shot.val().title;
                });
                if(shots.length === snapshot.val().length){
                    const players=[];
                    formValues.selectedPlayers.map(player=>{
                        const randomShot = Object.keys(shots)[Math.floor(Math.random()*Object.keys(shots).length)];
                        player.shot={
                            id:randomShot,
                            name:shots[randomShot],
                            rating:0
                        };
                        players.push(player);
                    });

                    const gameRef =database.ref(`games/${user.uid}`);
                    gameRef.push({
                        opposition:formValues.opposition,
                        team:{
                          id:formValues.team.id,
                            name:formValues.team.teamName
                        },
                        players:players,
                        date:formValues.date,
                        type:formValues.team.type
                    }, err=>{
                        if(err){
                            console.log(err)
                        }else{
                            const teamRef = database.ref(`teams/${user.uid}/${formValues.team.id}`);
                            teamRef.on('value', teamInfo=>{
                                teamRef.off();
                                const teamDetails = teamInfo.val();
                                let gamesPlayed = teamDetails.gamesPlayed;
                                const newGamesPlayed = parseInt(gamesPlayed)+1;
                                const teamRefUpdate = database.ref(`teams/${user.uid}/${formValues.team.id}`);
                                teamRefUpdate.update({
                                    gamesPlayed:newGamesPlayed
                                }, err=>{
                                    if(err){
                                        console.log(err)
                                    }else{
                                        callback()
                                    }
                                })
                            })
                        }
                    })

                }
            }
        })
    }


};


export const getGames = ()=>dispatch=>{
  let user = auth.currentUser;
    if(user !== null){
        const gameRef = database.ref(`games/${user.uid}/`);

        gameRef.on('value', snapshot=>{
            const games=[];
            snapshot.forEach(game=>{
                const id = game.ref.key;
                const gameDetails = game.val();
                gameDetails.id=id;
                games.push(gameDetails);
            });

            if(games.length >0){
               dispatch({type:GET_GAMES, payload:games.reverse()});
            }else{
                dispatch({type:GET_GAMES_ERROR, payload: 'No Games Loaded Yet'})
            }
        })
    }
};


export const deleteGame =(gameData, callback)=>()=>{
    let user = auth.currentUser;
    if(user !== null){
        const gameRef = database.ref(`games/${user.uid}/${gameData.id}`);
        gameRef.remove();
        callback()
    }
};


export const savePlayer =(player, callback)=>()=>{

    let user = auth.currentUser;
    //console.log(player);
    if(user !== null){
       const gameRef = database.ref(`games/${user.uid}/${player.gameId}/players/${player.index}/shot/`);


           gameRef.update({
               rating:player.shot.rating,
               saved:true
           }, err=>{
               if(err){
                   console.log(err);
               }else{

                   const playerRef = database.ref(`players/${user.uid}/${player.value}/`);
                   playerRef.on('value', snapshot=>{
                       playerRef.off();
                       const playerInfo = snapshot.val();
                       const innings = parseInt(playerInfo.innings) +1;
                       const rating =  parseInt(playerInfo.rating)+player.shot.rating;
                       let log = [];
                       if(playerInfo.log !== undefined){
                          // console.log('playerInfo.log found');
                           log = playerInfo.log
                       }
                       log.push(player.gameInfo);
                       const playerUpdateRef = database.ref(`players/${user.uid}/${player.value}/`);
                       playerUpdateRef.update({
                           innings,
                           rating,
                           log
                       }, error=>{
                           if(error){
                               console.log(err)
                           }else{
                               callback()
                           }
                       })
                   })


               }
           })
       }



};

/*

 */
