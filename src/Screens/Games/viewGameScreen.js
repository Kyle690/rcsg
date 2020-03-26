import React from 'react';
import {View, Text, ImageBackground, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {deleteGame, savePlayer} from "../../Store/Actions/Games/gameActions";
import {Button, Card, ListItem, Overlay, Rating} from "react-native-elements";
import colorPallet from "../../components/Constants/colors";
import SuccessButton from '../../components/Buttons/SuccessButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import DangerButton from '../../components/Buttons/dangerButton';
import Spinner from "react-native-loading-spinner-overlay";

const SCREEN_WIDTH = Dimensions.get('window').width;
const bgImage = require('../../../assets/stadium_5.jpeg');
class ViewGame extends React.Component{

    static navigationOptions =({navigation}) => {
        return {
            headerTitle:'View Game',
            headerRight:(
                <Button
                    title='Delete Game'
                    type='clear'
                    titleStyle={{fontSize:18, color:colorPallet.red1}}
                    onPress={navigation.getParam('confirmDelete')}
                />
            )
        }

    };
    state={
      loading:false,
      gameData:null,
        modal:false,
        playerRatingModal:false,
        playerRatingData:null,
    };

    componentWillMount(){
       this.props.navigation.setParams({confirmDelete:this.deleteGame});
        const game = this.props.navigation.getParam('game', 'No game Loaded');
        this.setState({gameData:game});
    }

   deleteGame=()=>{
        this.setState({modal:true});
        //console.log('confirm delete')
    };

    savePlayerRating =()=>{
        this.setState({playerRatingModal:false,loading:true});
        const player = this.state.playerRatingData;
        player.gameId = this.state.gameData.id;
        player.gameInfo ={
            name:this.state.gameData.team.name + ' vs '+this.state.gameData.opposition,
            date:this.state.gameData.date,
            shot:player.shot.name,
            rating:player.shot.rating
        };
        if(this.state.playerRatingData.shot.saved === undefined || !this.state.playerRatingData.shot.saved){
            this.props.savePlayer(player,()=>{
                player.shot.saved=true;
                this.setState({loading:false, playerRatingData:player});
            })
        }

    };

    openPlayer=(player, index)=>{
        const playerdata = player;
        playerdata.index = index;
        this.setState({playerRatingData:playerdata, playerRatingModal:true})
    };

    renderPlayer=(players)=>{
        if(players.length >0){
            const {playerViewStyle}=Styles;
            return players.map((player, index)=>{
                return (
                    <TouchableOpacity key={player.value} onPress={()=>this.openPlayer(player, index)} >
                        <ListItem
                            key={index}
                            title={player.label}
                            rightTitle={player.shot.name}
                        />
                    </TouchableOpacity>
                )
            })
        }
    };

    renderGame=()=>{
      return(
          <Card title={this.state.gameData.team.name +' vs '+this.state.gameData.opposition}>
              {this.renderPlayer(this.state.gameData.players)}
          </Card>
      )
    };

    handleRatingComplete =(rating)=>{
        let playerData = this.state.playerRatingData;
        playerData.shot.rating =rating;
        this.setState({playerRatingData:playerData})
    };

    renderPlayerRating =()=>{
      if(this.state.playerRatingData !== null){
          const {label, shot}=this.state.playerRatingData;
          const {modalCardStyle,modalTextStyle,modalText2Style}=Styles;

          const playerRated = ()=>{
            if(shot.saved === undefined || shot.saved === false){
                return(
                    <View>
                        <Rating
                            startingValue={shot.rating}
                            showRating
                            onFinishRating={(rating)=>this.handleRatingComplete(rating)}
                            style={{ paddingVertical: 10 }}
                        />
                        <SuccessButton
                            title='Save'
                            onPress={()=>this.savePlayerRating()}
                        />
                    </View>
                )
            } else{
                return(
                    <View>
                    <Rating
                        readonly
                        startingValue={shot.rating}
                        showRating
                        onFinishRating={(rating)=>this.handleRatingComplete(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                     <Text style={{alignSelf:'center', color:colorPallet.green1}}>Player already rated.</Text>
                    </View>
                )
            }
          };

          return(
              <View style={modalCardStyle}>
                  <Text style={modalTextStyle}>{label}</Text>
                  <Text style={modalText2Style}>{shot.name}</Text>

                  {playerRated()}
              </View>
          )
      }
    };

    confirmDelete = ()=>{
        this.setState({loading:true, modal:false});
        this.props.deleteGame(this.state.gameData,()=>{
            this.props.navigation.navigate('Games')
        })
    };

    render(){
        const {bg, modalButtonStyle, modalText2Style,modalTextStyle, modalTextView, modalCardStyle}=Styles;
        return(
            <ImageBackground source={bgImage} style={bg}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading....'}
                    textStyle={{color:'white'}}
                />
                <Overlay
                    isVisible={this.state.modal}
                    windowBackgroundColor="rgba(0, 0, 0, .5)"
                    overlayBackgroundColor='white'
                    width="auto"
                    height="auto"
                    onBackdropPress={()=>this.setState({modal:false})}
                >
                    <View style={modalCardStyle}>
                        <View style={modalTextView}>
                            <Text style={modalTextStyle}>Are you sure you want to delete this game?</Text>
                            <Text style={modalText2Style}>Note this cannot be undone!</Text>
                        </View>
                        <View style={modalButtonStyle}>
                            <SecondaryButton
                                title='Cancel'
                                onPress={()=>this.setState({modal:false})}
                            />
                            <DangerButton
                                title='Confirm Delete'
                                onPress={this.confirmDelete}
                            />
                        </View>
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.state.playerRatingModal}
                    windowBackgroundColor="rgba(0, 0, 0, .5)"
                    overlayBackgroundColor='white'
                    width="auto"
                    height="auto"
                    onBackdropPress={()=>this.setState({playerRatingModal:false})}>
                    <View>
                    {this.renderPlayerRating()}
                    </View>
                </Overlay>

                <ScrollView>
                {this.renderGame()}
                </ScrollView>
            </ImageBackground>
        )
    }
}

const Styles={
    bg:{
        height:'100%',
        width:"100%"
    },
    playerViewStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    playerStyle:{

    },
    modalButtonStyle:{
        bottom:0,
        flexDirection:'row',
        justifyContent: 'space-around'
    },
    modalTextView:{
        paddingBottom:20
    },
    modalTextStyle:{
        fontSize: 17,
    },
    modalText2Style:{
        fontSize:12,
        color:colorPallet.grey,
        paddingTop:10
    },
    modalCardStyle:{
        height:SCREEN_WIDTH*0.7,
        width:SCREEN_WIDTH*0.7,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25
    }

};

export default connect(null,{deleteGame, savePlayer})(ViewGame);