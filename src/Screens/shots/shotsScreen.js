import React from 'react';
import {View, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import {Button, Card, Image, Text, Rating} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colorPallet from '../../components/Constants/colors';
import {connect} from "react-redux";
import {getShots} from "../../Store/Actions/Shots/shotsActions";

const SCREEN_WIDTH = Dimensions.get('window').width;

const bgImage = require('../../../assets/stadium_5.jpeg');
class Shots extends React.Component{

    componentWillMount() {
        this.props.getShots();
    }

    state = {loading:true};
    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'Shots',
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
            )
        }

    };

    renderShots=()=>{

        if(this.props.shots.shots !== null){
            return this.props.shots.shots.map(shot=>{

                return(
                    <TouchableOpacity key={shot.id} onPress={()=>{this.props.navigation.navigate('viewShot',{shot:shot})}}  >
                        <Card
                            containerStyle={{width:SCREEN_WIDTH*0.4}}
                            title={shot.title}
                            //featuredTitle={shot.title}
                            imageProps={{resizeMode:'contain'}}
                            imageStyle={{width:SCREEN_WIDTH*0.4, height:SCREEN_WIDTH*0.4}}
                            image={{uri:shot.imageUrl}}>
                        </Card>
                    </TouchableOpacity>
                )
            })

        }else if(this.props.shots.shots === null){
            return (
                <Card title={this.props.shots.error}/>
            )
        }else{
            return (
                <Card title='Loading....'/>
            )
        }
    };


    render(){
        const {bg, shotsView} = styles;
        return(
            <ImageBackground style={bg} source={bgImage}>
                <ScrollView>
                    <View style={shotsView}>
                        {this.renderShots()}
                    </View>
                </ScrollView>

            </ImageBackground>
        )
    }
}
const styles={
  bg:{
      height:'100%',
      width:'100%'
  },
    cardView:{
      flexDirection:'row',
        justifyContent:'space-around'
    },
    descriptionView:{
      justifyContent: 'center',
        alignItems:'center'
    },
    shotsView:{
        flexDirection:'row',
        height:'100%',
        flexWrap: 'wrap',
        justifyContent:'space-around'
    }
};
const mapStateToProps = state =>{
  return {shots:state.shots}
};

export default connect(mapStateToProps,{getShots})(Shots);