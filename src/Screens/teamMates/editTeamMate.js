import React from 'react';
import {View, Picker, ScrollView} from 'react-native';
import {Card, Input} from "react-native-elements";
import {LinearGradient} from "expo-linear-gradient";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import colorPallet from'../../components/Constants/colors';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import SuccessButton from '../../components/Buttons/SuccessButton';
import DangerButton from '../../components/Buttons/dangerButton';
import PickerItem from "react-native-web/src/exports/Picker/PickerItem";
import {edit_player, savePlayer, deletePlayer} from "../../Store/Actions/Players/playerActions";
import Spinner from "react-native-loading-spinner-overlay";


class EditTeamMate extends React.Component{
    componentWillMount() {
       const player =  this.props.navigation.getParam('player', 'NO_info');
       this.props.edit_player(player);

    }
    state = {loading:false, battingStyle: ''};

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.battingStyle ===''){
            this.setState({battingStyle:this.props.playerInfo.battingStyle})
        }
    }

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

    static navigationOptions = ()=>{
        return {
            headerTitle:'Edit Player'
        }
    };

    onSubmit =(formValues)=>{
        this.setState({loading:true});
        formValues.battingStyle= this.state.battingStyle;
        this.props.savePlayer(formValues, ()=>{
            this.props.navigation.navigate('teamMates');
        });
    };

    onDelete =()=>{
        this.setState({loading:true});
      const id = this.props.playerInfo.id;
      this.props.deletePlayer(id, ()=>{
          this.props.navigation.navigate('teamMates');
      })
    };

    render(){
        const {bg}=styles;

        return(
            <LinearGradient style={bg} colors={colorPallet.greenGradient}>
                <ScrollView>
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
                                <PickerItem label='' />
                                <Picker.Item label='Right Handed' value='RightHanded'/>
                                <Picker.Item label='Left Handed' value='LeftHanded'/>
                            </Picker>
                            <SuccessButton
                                title='Save details'
                                onPress={this.props.handleSubmit(this.onSubmit)}
                            />
                            <DangerButton
                                title='Delete Player'
                                onPress={this.onDelete}
                            />

                        </Card>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </LinearGradient>
        )
    }
}
const styles ={
    bg:{
        height:'100%',
        width:'100%'
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
    form:'editTeamMate',
    validate,
    enableReinitialize: true
})(EditTeamMate);

const mapStateToProps = state =>{
  return {
      initialValues: state.players.editPlayer,
      playerInfo:state.players.editPlayer
  }
};

export default connect(mapStateToProps, {edit_player, savePlayer, deletePlayer})(form);