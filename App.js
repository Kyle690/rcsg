import React from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import store from './src/Store'


//import screens
import loginScreen from './src/Screens/Auth/loginScreen';
import RegisterScreen from './src/Screens/Auth/registerScreen';
import resetPasswordScreen from './src/Screens/Auth/resetPasswordScreen';
import Home from './src/Screens/home';
//games
import EditGame from './src/Screens/Games/editGameScreen';
import Games from './src/Screens/Games/gamesScreen';
import NewGame from './src/Screens/Games/newGameScreen';
import ViewGame from './src/Screens/Games/viewGameScreen';
//how to play
import HowToPlay from './src/Screens/HowToPlay/howToPlayHome';
import HowToTopic from './src/Screens/HowToPlay/howToPlayTopic';
//Shots
import Shots from './src/Screens/shots/shotsScreen';
import ViewShot from './src/Screens/shots/viewShotScreen';
// Team Mates
import AddNewTeamMate from './src/Screens/teamMates/addNewTeamMate';
import EditTeamMate from './src/Screens/teamMates/editTeamMate';
import TeamMates from './src/Screens/teamMates/teamMates';
import ViewTeamMate from './src/Screens/teamMates/viewTeamMate';
//teams
import EditTeam from'./src/Screens/teams/editTeamScreen';
import NewTeam from './src/Screens/teams/newTeamsScreen';
import Teams from './src/Screens/teams/teamsScreen';
import ViewTeam from './src/Screens/teams/viewTeamsScreen';
//profile
import MyProfile from './src/Screens/Auth/profileScreen';









class App extends React.Component {

    render(){

        const MainNavigator = createSwitchNavigator({
           login:{screen:loginScreen},
            register:{screen:RegisterScreen},
            resetPassword:{screen:resetPasswordScreen},
            home:{screen:Home},
            games:createStackNavigator({
                Games:{screen:Games},
                newGame:{screen:NewGame},
                viewGame:{screen:ViewGame},
                editGame:{screen:EditGame}
            }),
            players:createStackNavigator({
                teamMates:{screen:TeamMates},
                addTeamMate:{screen:AddNewTeamMate},
                editTeamMate:{screen:EditTeamMate},
                viewTeamMate:{screen:ViewTeamMate}
            }),
            howItWorks:createStackNavigator({
                howToPlay:{screen:HowToPlay},
                howToTopic:{screen:HowToTopic}
            }),
            shots:createStackNavigator({
                allShots:{screen:Shots},
                viewShot:{screen:ViewShot}
            }),
            teams:createStackNavigator({
                allTeams:{screen:Teams},
                addTeam:{screen:NewTeam},
                editTeam:{screen:EditTeam},
                viewTeam:{screen:ViewTeam}
            }),
            profile:createStackNavigator({
                myProfile:{screen:MyProfile}
            })

        });

        const AppContainer = createAppContainer(MainNavigator);





        return(
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}

export default App;


