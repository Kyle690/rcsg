import React from 'react';
import {Button} from "react-native-elements";

class PrimaryButton extends React.Component{
    render(){
        const {buttonStyle, buttonContainerStyle,iconContainerStyle}= styles;
        return(

            <Button
                title={this.props.title}
                containerStyle={buttonContainerStyle}
                buttonStyle={buttonStyle}
                icon={this.props.icon}
                iconRight={this.props.iconRight}
                iconContainerStyle={iconContainerStyle}
                onPress={this.props.onPress}
                loading={this.props.loading}

            />
        )
    }
}
const styles ={
    buttonStyle:{
        backgroundColor:'#3E9AE6',
        borderRadius:10
    },
    buttonContainerStyle:{
    padding:10
    },
    iconContainerStyle:{
        margin:20
    }



};

export default PrimaryButton;