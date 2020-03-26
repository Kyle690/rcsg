import {GET_SHOTS} from "../../Types";

const INITIAL_STATE ={
  shots:null,
  error:null
};

export default (state= INITIAL_STATE, action)=>{
    switch(action.type){
        case GET_SHOTS:
            return {shots:action.payload.shots, error:action.payload.error};
        default:
            return {...state};
    }

}