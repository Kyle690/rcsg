import React from 'react';
import {ImageBackground, View, Image} from 'react-native';
import {Text, Card, Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import Spinner from 'react-native-loading-spinner-overlay';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import {forgotPassword} from "../../Store/Actions/authActions";

//import components
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../components/Buttons/SecondaryButton';



//images
const bgImage = require('../../../assets/stadium.jpg');
const Logo = require('../../../assets/logo.png');

class resetPasswordScreen extends React.Component{

    state={
        loading:false,
        success:false
    };

    renderError =({error, touched})=>{
        if(touched && error){
            return (error)
        }

    };

    renderInput=({input:{onChange, ...restInput}, label,placeholder,  meta})=>{
        return(
            <Input
                label={label}
                placeholder={placeholder}
                onChangeText={onChange}
                {...restInput}
                containerStyle={{paddingTop:25}}
                errorStyle={{ color: 'red' }}
                errorMessage={this.renderError(meta)}
            />
        )
    };

    onSubmit=(formValues)=>{
        this.setState({loading:true});
        this.props.forgotPassword(formValues, (response)=>{
            if(response.status === 1){
                this.setState({success:true, loading:false})
            }
        });
    };


    componentDidUpdate(prevState) {

        if(prevState.loading){
            this.setState(function(prevState){
                return{loading:false}
            })
        }
    }

    renderServerError =()=>{
      if(this.props.resetError !==null){
          return (
              <Text style={{color:'red',alignSelf:'center' }}>there is an error</Text>
          )
      }else if(this.state.success){
          return (
              <Text style={{color:'green',alignSelf:'center' }}>Check your email for a reset link!</Text>
          )
      }
      return null;
    };


    render(){
        const {bg,LogoStyle, CardStyle, textStyle, buttonView}= styles;
        return(
           <ImageBackground source={bgImage} style={bg}>
               <Spinner
                   visible={this.state.loading}
                   textContent={'Loading....'}
                   textStyle={{color:'white'}}/>
               <KeyboardAwareScrollView contentContainerStyle={CardStyle}>
                   <Card>
                       <Image source={Logo} style={LogoStyle} />
                       <Text style={textStyle} h5>Random Cricket Shot Generator</Text>
                       <Text style={textStyle}>Reset Password</Text>
                       {this.renderServerError()}
                       <Field name='resetEmail' label='Email' placeholder='yourname@email.com' component={this.renderInput}/>

                       <View style={buttonView}>
                            <SecondaryButton
                                title='Sign in Rather'
                                onPress={()=>this.props.navigation.navigate('login')}
                            />
                            <PrimaryButton
                                title='Reset Password'
                                onPress={this.props.handleSubmit(this.onSubmit)}
                            />
                       </View>
                   </Card>
               </KeyboardAwareScrollView>
           </ImageBackground>
        )
    }
}

const styles={
    bg:{
        height:'100%',
        width:"100%"
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
    textStyle:{
        alignSelf: 'center',
        paddingTop:10
    },
    buttonView:{
        flexDirection:'row'
    }

};

const validate =(formValues)=>{
    const errors={};
    if(!formValues.resetEmail){
        errors.resetEmail = "Please check your email!"
    }
    return errors;
};


const form = reduxForm({
    form:'forgotPassword',
    validate
})(resetPasswordScreen);

const mapStateToProps = state =>{
    return {resetError: state.auth.resetPasswordErr}
};

export default connect(mapStateToProps, { forgotPassword})(form);