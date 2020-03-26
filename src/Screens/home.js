import React from 'react';
import {View, ImageBackground, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Card, Icon, Button } from 'react-native-elements'
import {connect} from 'react-redux';
import colorPallet from '../components/Constants/colors';
import {logUserOut} from "../Store/Actions/authActions";
import {LinearGradient} from 'expo-linear-gradient';


const SCREEN_WITDH = Dimensions.get('window').width;

// images
const Bg = require('../../assets/stadium_3.jpg');
const Logo = require('../../assets/logo.png');
class Home extends React.Component{

    onLogOut = ()=>  {
        this.props.logUserOut(()=>{
            this.props.navigation.navigate('login');
        })
    };

    render(){
        const {bg, headerStyle, buttonStyles, cardStyle, logOutButtonStyle}=Styles;
        return(
            <ImageBackground source={Bg} style={bg}>
                <View>
                    <Card containerStyle={headerStyle}>
                        <Text style={{alignSelf:'center'}} h5>Welcome Back {this.props.user}</Text>
                    </Card>
                    <View>
                        <View style={buttonStyles}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('myProfile')}>
                                <Card containerStyle={cardStyle} >
                                    <Icon name='user' color={colorPallet.blue1} size={55} type='entypo'/>
                                    <Text h5>Profile</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('players')}>
                                <Card containerStyle={cardStyle}>
                                    <Icon name='users' color={colorPallet.green1} size={55} type='entypo'/>
                                    <Text h5>Players</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Games')}} >
                                <Card containerStyle={cardStyle}>
                                    <Icon name='social-game-center' color={colorPallet.orange1} size={55} type='foundation'/>
                                    <Text h5>Games</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('teams')} >
                                <Card containerStyle={cardStyle}>
                                    <Icon name='layers' size={55} color={colorPallet.blue2} type='entypo'/>
                                    <Text h5>Teams</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('howItWorks')} >
                                <Card containerStyle={cardStyle}>
                                    <Icon name='cogs' size={55} color={colorPallet.green2} type='font-awesome'/>
                                    <Text h5>How it Works</Text>
                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('shots')}>
                                <Card containerStyle={cardStyle}>
                                    <Icon name='cricket' size={55} color={colorPallet.orange2} type='material-community'/>
                                    <Text h5>Shots</Text>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={logOutButtonStyle}>
                    <Button
                        title='Log Out'
                        onPress={this.onLogOut}
                        ViewComponent={LinearGradient}
                        linearGradientProps={{
                            colors:colorPallet.blueGradient2
                        }}
                        containerStyle={{
                            width:SCREEN_WITDH*0.8,
                        }}
                        buttonStyle={{
                            borderRadius:25,

                        }}
                    />
                </View>
            </ImageBackground>
        )
    }
}
//TODO still need to style the logout button better, adjust the displayName

const Styles={
  bg:{
      height:'100%',
      width:'100%'
  },
    headerStyle:{
      marginTop:50,
        borderRadius:5
    },
    buttonStyles:{
        paddingTop:'13%',
        flexDirection:'row',
        flexWrap: 'wrap',
        justifyContent:'space-around'
    },
    cardStyle:{
        justifyContent:'center',
        alignItems:'center',
        width:SCREEN_WITDH*0.35,
        height:SCREEN_WITDH*0.35,
        margin:20,
        borderRadius:10
    },
    logOutButtonStyle:{
        justifyContent:'flex-end',
        marginBottom:20,
        flex:1,
        alignItems: 'center'
    }

};
const mapStateToProps = state=>{
  return {user:state.auth.displayName}
};

export default connect(mapStateToProps, {logUserOut})(Home);