import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Card} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colorPallet from '../../components/Constants/colors';
import {connect} from 'react-redux';
import {getGames} from "../../Store/Actions/Games/gameActions";

const bgImage = require('../../../assets/bg3.jpg');


class Games extends React.Component{

    componentWillMount() {
        this.props.getGames()
    }

    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'Games',
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
                    onPress={()=> navigation.navigate('newGame')}
                    title='New Game'
                    titleStyle={{fontSize:18, color:colorPallet.iosBlue}}
                />
            )
        }

    };

    renderGames=()=>{

      if(this.props.games.games !== null){
          //console.log(this.props.games);
          return this.props.games.games.map(game=>{
              return(
                  <TouchableOpacity key={game.id} onPress={()=>this.props.navigation.navigate('viewGame',{game:game})}>
                      <Card title={game.team.name +' vs '+game.opposition}>
                        <Text>Date: {game.date}</Text>
                          <Text>Type: {game.type}</Text>
                      </Card>
                  </TouchableOpacity>
              )
          })
      }else{
          return (
              <Card>
                  <Text>No Games loaded yet</Text>
              </Card>
          )
      }

    };


    render(){
        const {bg }=styles;
        return(
           <ImageBackground style={bg} source={bgImage}>
            <ScrollView>
                {this.renderGames()}
            </ScrollView>
           </ImageBackground>
        )
    }
}
const styles = {
    bg:{
        height:"100%",
        width:'100%'
    }
};

const mapStateToProps = state=>{
  return {games:state.games}
};


export default connect(mapStateToProps, {getGames})(Games);