import React from 'react';
import {Button} from "react-native-elements";

class SecondaryButton extends React.Component{
  render(){
      const {buttonStyle, ContainerStyle} = styles;
      return(
          <Button
              title={this.props.title}
              containerStyle={ContainerStyle}
              buttonStyle={buttonStyle}
              onPress={this.props.onPress}
              icon={this.props.icon}
              iconRight={this.props.iconRight}

          />
      )
  }
}

const styles={
  buttonStyle:{
    backgroundColor:'#808080',
      borderRadius:10
  },
  ContainerStyle:{
    padding:10
  },
    iconContainerStyle:{
        padding:10
    }
};
export default SecondaryButton;