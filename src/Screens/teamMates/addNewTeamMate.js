import React from 'react';
import {View, Picker} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {connect} from "react-redux";
import {reduxForm, Field} from "redux-form";
import {Card, Input, Text} from'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SuccessButton from '../../components/Buttons/SuccessButton';
import colorPallet from '../../components/Constants/colors';
import PickerItem from "react-native-web/src/exports/Picker/PickerItem";
import {add_player} from "../../Store/Actions/Players/playerActions";

class AddTeamMate extends React.Component{

    state = {
        loading:false,
        battingStyle:'RightHanded'
    };

    static  navigationOptions = ()=>{
       return {
           headerTitle:'Add New Player'
       }
    };

    renderError =({error, touched})=>{
        if(touched && error){
            return (error)
        }

    };

    renderInput = ({input:{onChange, ...restInput}, label, type, placeholder,  meta})=>{
        let isPassword = false;
        if(type === 'password'){
            isPassword = true;
        }

        return(
            <Input
                label={label}
                placeholder={placeholder}
                onChangeText={onChange}
                {...restInput}
                containerStyle={{paddingTop:25}}
                secureTextEntry={isPassword}
                errorStyle={{ color: 'red' }}
                errorMessage={this.renderError(meta)}
            />
        )

    };

    onSubmit=(formValues)=>{
        this.setState({loading:true});
        formValues.battingStyle =this.state.battingStyle;
        this.props.add_player(formValues,()=>{
            this.props.navigation.navigate('teamMates');
        })
    };


    render(){
        const {bg} = styles;
        return(

            <View>
                <LinearGradient
                    colors={colorPallet.greenGradient}
                    style={bg}
                >
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading....'}
                        textStyle={{color:'white'}}
                    />
                   <KeyboardAwareScrollView>
                       <Card>

                           <Field name='firstName' label='First Name' placeholder='John' component={this.renderInput}/>
                           <Field name='nickName' label='Nick Name' placeholder='Johnno' component={this.renderInput}/>
                           <Field name='lastName' label='Last Name' placeholder='Doe' component={this.renderInput}/>
                           <Picker
                               onValueChange={(itemValue)=>this.setState({battingStyle:itemValue})}
                                selectedValue={this.state.battingStyle}
                               style={{ width:'100%'}}
                           >
                               <Picker.Item label='Right Handed' value='RightHanded'/>
                               <Picker.Item label='Left Handed' value='LeftHanded'/>
                           </Picker>

                           <SuccessButton
                            title='Add player'
                            onPress={this.props.handleSubmit(this.onSubmit)}
                           />
                       </Card>
                   </KeyboardAwareScrollView>
                </LinearGradient>
            </View>
        )
    }
}
const styles ={
    bg:{
        height:"100%",
        width:"100%"
    }
};

const validate = (formValues)=>{
  const errors={};
  if(!formValues.firstName){
      errors.firstName = 'Please enter a first name.'
  }
  if(!formValues.lastName){
      errors.lastName = 'Please enter a last name'
  }
    return errors;
};

const form = reduxForm({
    form:'addNewPlayer',
    validate
})(AddTeamMate);

export default connect(null, {add_player})(form);