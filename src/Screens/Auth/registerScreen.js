import React from 'react';
import {View, ImageBackground} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Card, Image, Text, Input, CheckBox, Overlay} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome'
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';
import {register} from "../../Store/Actions/authActions";


//assets
const backGroundImage = require('../../../assets/stadium.jpg');
const Logo = require('../../../assets/logo.png');

class RegisterScreen extends React.Component{

    state = {
      loading:false,
      checked:false,
        error:false,
        errorMessage:'',
        serverError:false
    };

    //TODO find a way to change state while rendering!! then this is complete and navigate to login

    closeAlert=()=>{
      this.setState({error:false})
    };


    checkedButton = ()=>{
        if(this.state.checked){
            this.setState({checked:false});
        }else{
            this.setState({checked:true})
        }
    };

    signInRather =()=>{
      this.props.navigation.navigate('login');
    };

    onSubmit=(formValues)=>{
        if(!this.state.checked){
            this.setState({error:true, errorMessage:'You must agree to our terms & conditions!'})
        }else{
            this.setState({loading:true});
            this.props.register(formValues, ()=>{
                this.props.navigation.navigate('login');
            });
        }


    };



    renderError =({error, touched})=>{
        if(touched && error){
            return (error)
        }

    };


    loadingStatus(){
       if(this.state.loading){
           this.setState({loading:false, serverError:true});
       }
    }

    renderSignUpErr=()=>{
      if(this.props.signUpErr !== null && this.state.serverError){
         this.loadingStatus();

          return(
              <Text style={{alignSelf:'center',color:'red' }}>{this.props.signUpErr.message}</Text>
          )
      }else{
          return null
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

    render(){
        const {bg,LogoStyle, CardStyle, buttonView} = styles;
        return (
                <ImageBackground  source={backGroundImage} style={bg}>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading....'}
                        textStyle={{color:'white'}}
                    />
                    <Overlay
                        isVisible={this.state.error}
                        windowBackgroundColor="rgba(0,0,0, .5)"
                        overlayBackgroundColor="red"
                        color='white'
                        width="auto"
                        height="auto"
                        onBackdropPress={this.closeAlert}
                    >
                        <Text style={{color:'white'}}>{this.state.errorMessage}<Icon onPress={this.closeAlert} size={20} color='white' name='times'/></Text>

                    </Overlay>
                    <KeyboardAwareScrollView
                        contentContainerStyle={CardStyle}
                    >

                        <Card>
                            <Image source={Logo} style={LogoStyle}/>
                            <Text style={{alignSelf: 'center'}} h6>Random Cricket Shot Generator</Text>
                            {this.renderSignUpErr()}
                            <Field
                                label='First Name'
                                placeholder='John'
                                component={this.renderInput}
                                name='firstName'
                            />
                            <Field
                                label='Last Name'
                                placeholder='Doe'
                                name='lastName'
                                component={this.renderInput}
                            />
                            <Field
                                label='Email'
                                placeholder='johndoe@email.com'
                                name='email'
                                component={this.renderInput}
                            />
                            <Field
                                label='Password'
                                placeholder='********'
                                name='password'
                                type='password'
                                component={this.renderInput}
                            />
                            <CheckBox
                                title='Agree to Terms & Conditions'
                                checked ={this.state.checked}
                                onPress={this.checkedButton}
                            />



                            <View style={buttonView}>
                                <SecondaryButton
                                title='Have an account?'
                                onPress={this.signInRather}
                                />
                                <PrimaryButton
                                    title='Sign Up'
                                    onPress={this.props.handleSubmit(this.onSubmit)}
                                />
                            </View>

                        </Card>

                    </KeyboardAwareScrollView>
                </ImageBackground>

        )
    }
}

const styles ={
    bg:{
        width:'100%',
        height:'100%'
    },
    LogoStyle:{
        height:100,
        width:100,
        alignSelf:'center'
    },
    CardStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonView:{
        flexDirection:'row'
    }
};

const validate = (formValues)=> {
    const errors={};
    if(!formValues.email){
        errors.email = "Please check your email!"
    }
    if(!formValues.password){
        errors.password = "Please check your password!"
    }
    if(!formValues.firstName){
        errors.firstName = 'Please check your first name!'
    }
    if(!formValues.lastName){
        errors.lastName = 'Please check your last name!'
    }

    return errors;
};

const form = reduxForm({
    form:'signUp',
    validate
})(RegisterScreen);

const mapStateToProps =state=>{
    return {signUpErr: state.auth.signUpErr}
};


export default connect(mapStateToProps, {register})(form);