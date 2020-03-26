import React from 'react';
import {View, ImageBackground, ScrollView} from 'react-native';
import {Card, Text, Divider, Button} from "react-native-elements";
import colorPallet from "../../components/Constants/colors";

const bgImage = require('../../../assets/stadium_2.jpg');
let teamInfo ='';
class ViewTeam extends React.Component{
    state= {teamInfo:''};
    componentWillMount() {
        const team = this.props.navigation.getParam('team', 'NO_info');
        teamInfo = team;
        this.setState({teamInfo:team});
    }

    static navigationOptions =({navigation})=>{
      return{
          headerTitle:'View Team',
          headerRight:(
              <Button
                  type='clear'
                  onPress={()=> navigation.navigate('editTeam', {team: teamInfo})}
                  title='Edit'
                  titleStyle={{fontSize:18, color:colorPallet.iosBlue}}
              />
          )
      }
    };

    renderPlayer =()=>{
        const {playerText}=Styles;
      return  this.state.teamInfo.teamPlayers.map(player=>{
            return(
                <View key={player.value}>
                    <Text style={playerText}>{player.label}</Text>
                    <Divider/>
                </View>
            )
        })
    };

    render(){
        const{bg, typeText, cardStyle}=Styles;
        return(
            <ImageBackground source={bgImage} style={bg}>
                <ScrollView>
                    <Card>
                        <View style={cardStyle}>
                           <Text h4>{this.state.teamInfo.teamName}</Text>
                            <Text style={[typeText,{justifyContent:'center', alignSelf:'center'}]}>Type: {this.state.teamInfo.type}</Text>
                        </View>
                    </Card>
                    <Card title='Players'>
                        {this.renderPlayer()}
                    </Card>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const Styles ={
  bg:{
      height:'100%',
      width:'100%'
  },
    typeText:{
      fontSize:14,
        color:'grey'
    },
    cardStyle:{
      flexDirection:'row',
        justifyContent:'space-between'
    },
    playerText:{
      paddingTop:10,
      paddingBottom:10,
        fontSize: 20,
        color:colorPallet.grey

    }
};


export default ViewTeam;