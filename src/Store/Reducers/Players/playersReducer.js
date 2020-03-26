import {GET_PLAYERS, DELETE_PLAYER,EDIT_PLAYER} from "../../Types";

const INITIAL_STATE ={
  players:[],
  error:'',
    editPlayer:null
};


export default (state=INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_PLAYERS:
            return {players:action.payload.players, error:action.payload.error, editPlayer: null};
        case EDIT_PLAYER:
            return{...state, editPlayer:action.payload};
        default:
            return {...state}
    }
}