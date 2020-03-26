import React from 'react';
import { View, ImageBackground, TouchableOpacity} from 'react-native';
import {Card, Image, Input, Text} from 'react-native-elements';
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import Spinner from'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {logUserIn, userIsLoggedIn} from "../../Store/Actions/authActions";

import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';

const Logo = require('../../../assets/logo.png');

class loginScreen extends React.Component{

    componentWillMount() {
        this.props.userIsLoggedIn(()=>{
            this.props.navigation.navigate('home')
        })
    }

    state = {
      loading:false
    };

    onRegisterClick = ()=>{
      this.props.navigation.navigate('register')
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
        this.props.logUserIn(formValues, ()=>{
            this.props.navigation.navigate('home')
        })
    };
    componentDidUpdate(prevState) {

        if(prevState.loading){
            this.setState(function(prevState){
                return{loading:false}
            })
        }
    }


    renderLogInError=()=>{
        if(this.props.loginError !== null){
            return(
                <Text style={{color:'red',alignSelf:'center' }}>{this.props.loginError.code}</Text>
            )
        }else{
            return null
        }
    };


    render(){
        const {bg, CardStyle, LogoStyle,textStyle, buttonView} = styles;
        return(

            <ImageBackground source={require('../../../assets/stadium.jpg')} style={bg} >
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading....'}
                    textStyle={{color:'white'}}
                />
                <KeyboardAwareScrollView contentContainerStyle={CardStyle} >
                    <Card>
                        <Image source={Logo} style={LogoStyle}/>
                        <Text style={{alignSelf: 'center'}} h6>Random Cricket Shot Generator</Text>
                        <Text style={{alignSelf: 'center'}} h6 >Sign In</Text>
                        {this.renderLogInError()}
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
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('resetPassword')}} >
                            <Text style={textStyle} >Forgot Password?</Text>
                        </TouchableOpacity>
                        <View style={buttonView}>
                            <SecondaryButton
                                title='Sign up Rather '
                                onPress={this.onRegisterClick}
                            />
                            <PrimaryButton
                                title='Sign In '
                                onPress={this.props.handleSubmit(this.onSubmit)}
                            />

                        </View>
                    </Card>
                </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

const styles = {
  bg:{
      width:'100%',
      height:'100%'
  },
    CardStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    LogoStyle:{
      height:100,
        width:100,
        alignSelf:'center'
    },
    buttonView:{
      paddingTop:25,
     flexDirection:'row'
    },
    textStyle:{
      paddingTop:10,
        color:'#A1A5B3',
        fontSize:10
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

    return errors;
};


const form = reduxForm({
    form:'loginForm',
    validate
})(loginScreen);

const mapStateToProps = state =>{
    return{
        loginStatus:state.auth.isLoggedIn,
        loginError:state.auth.logInErr
    }

};

export default connect(mapStateToProps, {logUserIn, userIsLoggedIn})(form);