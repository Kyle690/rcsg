import React from 'react';
import {View, ImageBackground, ScrollView} from 'react-native'
import {Card, Text, Button, Rating, ListItem} from 'react-native-elements';
import colorPallet from "../../components/Constants/colors";

const bgImage = require('../../../assets/stadium_2.jpg');

class ViewTeamMate extends React.Component{

    static navigationOptions =({navigation})=>{
        return ({
            headerTitle:'View Player',
            headerRight:(
                <Button
                    type='clear'
                    title='Edit'
                    onPress={()=>navigation.navigate('editTeamMate', {player:navigation.getParam('player')})}
                />
            )
        })
    };

    componentWillMount() {
        const player = this.props.navigation.getParam('player', 'No_player_info');
        this.setState({playerInfo:player});
        console.log(player)
    }
    state={
        playerInfo:null,
    };

    renderDetails =()=>{
        if(this.state.playerInfo !== null){
            const{ headPlayerInfo, headTitle, headInfo}=Styles;
            const {firstName, lastName, nickName, rating, innings,log}= this.state.playerInfo;
            return(
                <View style={headPlayerInfo}>
                    <Text style={headTitle}>{firstName+' "'+nickName+'" '+lastName}</Text>
                    <Text style={headInfo}>No of innings: {innings}</Text>
                    <Rating
                        imageSize={20}
                        readonly
                        startingValue={rating/innings}
                    />
                </View>
            )
        }else{
            return(
                <Text>Loading....</Text>
            )
        }
    };

    renderLog =()=>{
      if(this.state.playerInfo.log !== undefined){
          return this.state.playerInfo.log.reverse().map((log, index)=>{
              const {listSubTitle, listRightTitle}=Styles;
              return (
                  <ListItem
                    key={index}
                    title={log.name}
                    subtitle={log.date}
                    subtitleStyle={listSubTitle}
                    rightTitle={log.shot}
                    rightTitleStyle={listRightTitle}
                    rightSubtitle={'Rating: '+log.rating}
                    rightSubtitleStyle={listSubTitle}
                  />
              )

          })
      }
    };

    render(){
        const {bg}=Styles;

        return(
            <ImageBackground style={bg} source={bgImage}>
                <Card>
                    {this.renderDetails()}
                </Card>
                <Card title='Shot Log'>
                    <ScrollView>
                    {this.renderLog()}
                    </ScrollView>
                </Card>
            </ImageBackground>
        )
    }
}

const Styles ={
    bg:{
        height:'100%',
        width:'100%'
    },
    headPlayerInfo:{
        alignItems:'center'
    },
    headTitle:{
        fontSize:20,
        paddingBottom:15
    },
    headInfo:{
        paddingBottom:15,
        color:colorPallet.grey
    },
    listSubTitle:{
        fontSize:12,
        color: colorPallet.grey
    },
    listRightTitle:{
        color:'black',
        fontSize:15
    }
};
export default ViewTeamMate;