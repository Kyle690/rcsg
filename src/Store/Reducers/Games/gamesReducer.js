import {GET_GAMES, GET_GAMES_ERROR} from "../../Types";


const INITIAL_STATE = {
  games:null,
  error:null
};

export default (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case GET_GAMES:
            return{games:action.payload, error:null};
        case GET_GAMES_ERROR:
            return {games:null, error:action.payload};
        default:
            return{...state}
    }
}