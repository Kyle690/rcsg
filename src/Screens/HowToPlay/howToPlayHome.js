import React from 'react';
import {View, Text, ScrollView, ImageBackground, TouchableOpacity} from 'react-native';
import {Button, ListItem, Card} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import colorPallet from '../../components/Constants/colors';

const bgImage = require('../../../assets/stadium_6.jpg');

const howToList =[
    {
        title:'Concept of the game',
        info:''
    },
    {
        title:'Add Players'
    }
];

class HowToPlay extends React.Component{

    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'How To Play',
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

    renderHowToList =()=>{
        return howToList.map((item, i)=>{
            return(
                <TouchableOpacity key={i} onPress={()=>this.props.navigation.navigate('howToTopic',{topic:item})} >
                    <Card >
                        <ListItem
                            title={item.title}
                        />
                    </Card>
                </TouchableOpacity>
            )
        })
    };


    render(){
        const {bg}=Styles;
        return(
            <ImageBackground style={bg} source={bgImage}>
                <ScrollView>
                    {this.renderHowToList()}
                </ScrollView>
            </ImageBackground>
        )
    }
}

const Styles={
    bg:{
        height:'100%',
        width:'100%'
    }

};

export default HowToPlay;