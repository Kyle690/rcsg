import React from 'react';
import {View, ImageBackground, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {Card, Image, Text, Rating } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get('window').width;
const bgImage = require('../../../assets/stadium_2.jpg');
class ViewShot extends React.Component{
    state = {shot:''};

    static navigationOptions = {
        headerTitle:'View Shot'
    };

    componentWillMount() {
        const shot = this.props.navigation.getParam('shot', 'No Info');
        this.setState({shot:shot});

    };

    render(){
        const {imageView, difficultyView, titleView, descriptionView}=Styles;
        return(
            <ImageBackground source={bgImage} style={{height:'100%', width:'100%'}}>
                <ScrollView>
                    <Card>
                        <Image style={imageView}
                               resizeMode='contain'
                               source={{uri:this.state.shot.imageUrl}}
                               PlaceholderContent={<ActivityIndicator/>}
                        />
                        <View style={titleView}>
                        <Text h4>{this.state.shot.title}</Text>
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={parseInt(this.state.shot.difficulty/2)}
                            />
                        </View>
                        <Text style={descriptionView}>{this.state.shot.description}</Text>
                    </Card>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const Styles ={
  imageView:{
      width:SCREEN_WIDTH * 0.75,
      height:SCREEN_WIDTH * 0.75,
      alignSelf:'center'
  },
    titleView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20
    },
    difficultyView:{
      fontSize:14,
        color:'grey',
        justifyContent:'center',
        alignSelf: 'center'
  },
    descriptionView:{
      paddingTop: 20
    }
};
export default ViewShot;