import React from 'react';
import {View, ImageBackground, ScrollView, TouchableOpacity} from 'react-native';
import {Button, Text, Card, Rating, ListItem} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import {connect} from 'react-redux';
import {get_players} from "../../Store/Actions/Players/playerActions";

import colorPallet from '../../components/Constants/colors';

const bgImage = require('../../../assets/stadium_2.jpg');

class TeamMates extends React.Component{

    componentWillMount() {
        this.props.get_players();
    }

    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'Team Mates',
            headerLeft:(
                <Button
                    type='clear'
                    onPress={()=> navigation.navigate('home')}
                    icon={
                        <Icon
                            name='chevron-left'
                            size={20}
                            color={colorPallet.iosBlue}
                        />
                    }
                />
            ),
            headerRight:(
                <Button
                    type='clear'
                    onPress={()=> navigation.navigate('addTeamMate')}
                    title='Add Players'
                    titleStyle={{fontSize:18, color:colorPallet.iosBlue}}
                />
            )
        }

    };

    renderPlayers=()=>{
      if(this.props.players.players.length >0){
          return this.props.players.players.map(player=>{
              const {battingStyle}=styles;
              return (
                  <TouchableOpacity key={player.id} onPress={()=>{this.props.navigation.navigate('viewTeamMate',{player: player} )}}>
                      <Card>
                          <ListItem
                            title={player.firstName+' "'+player.nickName+'" '+player.lastName}
                            subtitle={player.battingStyle}
                            subtitleStyle={battingStyle}
                            rightTitle={
                                <Rating
                                imageSize={15}
                                readonly
                                startingValue={player.rating/player.innings}
                                />
                            }
                            rightSubtitle={'No of Innings: '+player.innings}
                            rightSubtitleStyle={battingStyle}

                          />
                      </Card>
                  </TouchableOpacity>
              )
          })
      }else{
          return (
              <Card>
                  <Text>No Players have been added yet!</Text>
              </Card>
          )
      }
    };

    render(){
        const {bg}= styles;
        return(
            <ImageBackground style={bg} source={bgImage}>
                <ScrollView>
                    {this.renderPlayers()}
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = {
    bg:{
        height:'100%',
        wight:'100%'
    },
    cardStyle:{
        flexDirection:"row",
        justifyContent:'space-between'
    },
    playerNameStyle:{
        fontSize: 15
    },
    battingStyle:{
        fontSize:10,
        color: 'grey'
    },
    ratingStyle:{
        right:0
    }
};


const mapStateToProps = state =>{
  return {players:state.players}
};

export default connect(mapStateToProps, {get_players})(TeamMates);