import React from 'react';
import {View, ImageBackground,ScrollView, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {Button, Card, Text} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colorPallet from '../../components/Constants/colors';
import {getTeams} from "../../Store/Actions/Teams";

const bgImage = require('../../../assets/stadium_4.jpg');

class Teams extends React.Component{

    componentWillMount() {
        this.props.getTeams();
    }

    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'Teams',
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
                    onPress={()=> navigation.navigate('addTeam')}
                    title='Add Team'
                    titleStyle={{fontSize:18, color:colorPallet.iosBlue}}
                />
            )
        }

    };

    renderTeams=()=>{
        console.log(this.props.teams);
        if(this.props.teams.teams !== null){
            const {paraText, viewStyle, teamInfo} = Styles;

            return  this.props.teams.teams.map(team=>{
                return (
                    <TouchableOpacity key={team.id} onPress={()=>{this.props.navigation.navigate('viewTeam',{team:team})}}>
                        <Card>
                            <View style={viewStyle}>
                                <Text h4>{team.teamName}</Text>
                                <View style={teamInfo}>
                                    <Text style={paraText}>No of Players: {team.teamPlayers.length}</Text>
                                    <Text style={paraText}>Type: {team.type}</Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )
            })
        }else{
            return (
                <Card>
                    <Text style={{alignSelf:'center'}} h5>{this.props.teams.error}</Text>
                </Card>
            )
        }
    };

    render(){
        const {bg}= Styles;
        return(
            <ImageBackground source={bgImage} style={bg}>
                <ScrollView>
                    {this.renderTeams()}
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
    paraText:{
        color:'grey',
        fontSize: 14
    },
    viewStyle:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    teamInfo:{
        alignItems:'flex-end'
    }
};

const mapStateToProps = state=>{

  return {teams:state.teams}
};

export default connect(mapStateToProps,{getTeams})(Teams);