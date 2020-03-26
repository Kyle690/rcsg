import {combineReducers} from "redux";
import {reducer as formReducer} from 'redux-form';

import authLogin from './Auth/authRedcuer';
import profile from './Profile/ProfileReducer';
import players from './Players/playersReducer';
import teams from './Teams/teamReducer';
import shots from './Shots/shotsReducer';
import games from './Games/gamesReducer';

export default combineReducers({
    auth:authLogin,
    form:formReducer,
    profile:profile,
    players:players,
    teams:teams,
    shots:shots,
    games:games
})