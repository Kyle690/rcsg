import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {View} from 'react-native';
import {Button, Card, Text,Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import {connect} from 'react-redux';
import {reduxForm, Field} from "redux-form";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Spinner from'react-native-loading-spinner-overlay';

import {getProfileData, saveProfileData} from "../../Store/Actions/profileActions";


import colorPallet from '../../components/Constants/colors';
import SuccessButton from "../../components/Buttons/SuccessButton";
class MyProfile extends React.Component{

    componentWillMount() {
        this.props.getProfileData();
    }

    state={
        loading:false
    };

    static navigationOptions =({navigation})=> {

        return{
            headerTitle: 'Profile',
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
        this.props.saveProfileData(formValues,
            ()=>{
                this.props.navigation.navigate('home')
            });
    };


    render(){
        const {bg}=styles;

        return(
            <View style={bg}>
                <LinearGradient
                    colors={['#289AFF','#144E80','#1F74BF']}
                    style={bg}
                >
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading....'}
                        textStyle={{color:'white'}}
                    />
                    <KeyboardAwareScrollView>
                        <Card>
                            <Text style={{alignSelf: 'center'}} h6>Random Cricket Shot Generator</Text>
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
                            <SuccessButton
                                title='Update'
                                onPress={this.props.handleSubmit(this.onSubmit)}
                            />
                        </Card>
                    </KeyboardAwareScrollView>
                </LinearGradient>

            </View>
        )
    }
}

const styles={
    bg:{
        height:'100%',
        width:'100%'
    }
};


const validate = (formValues)=> {
    const errors={};
    if(!formValues.email){
        errors.email = "Please check your email!"
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
    form:'profileForm',
    validate,
    enableReinitialize: true
})(MyProfile);


const mapStateToProps = state =>{
    return {initialValues:state.profile}
};

export default connect(mapStateToProps, {getProfileData, saveProfileData})(form);