import React from 'react';
import _ from 'lodash';
import SelectMultiple from 'react-native-select-multiple';
import {View, Text, ScrollView, Picker} from 'react-native';
import {connect} from 'react-redux';
import {reduxForm, Field} from "redux-form";
import Spinner from 'react-native-loading-spinner-overlay';
import {Card, Input, CheckBox, Rating} from 'react-native-elements';
import {LinearGradient} from "expo-linear-gradient";
import colorPallet from '../../components/Constants/colors';
import {get_players} from "../../Store/Actions/Players/playerActions";
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SuccessButton from '../../components/Buttons/SuccessButton';
import {addTeam} from "../../Store/Actions/Teams";

const playersArray = [];

class NewTeam extends React.Component{


    componentWillMount() {
        this.props.get_players();
    }

    state={loading:false, playersChecked:[], teamType:'Action'};

    static navigationOptions = ()=>{
        return { headerTitle:'Create Team'}
    };


    buildArray=()=>{
      //  console.log(playersArray.length);
        if(this.props.players.players.length >0 && playersArray.length !== this.props.players.players.length) {

            this.props.players.players.map(player=>{
                const id = player.id;
                const name = player.firstName + ' '+player.nickName+" "+player.lastName;
                playersArray.push({ label:name,value:id})
            });



        }
    };

    renderPlayers =()=>{
      if(this.props.players.players.length > 0){
        return (
            <View style={{paddingTop: 15}}>

                <SuccessButton
                    title='Save'
                    onPress={this.props.handleSubmit(this.onSubmit)}
                />
            </View>
        )


      }else{
       return(
           <View>
               <PrimaryButton
                title='Add players'
                onPress={()=>this.props.navigation.navigate('addTeamMate')}
               />
           </View>
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

    onSelectChange = (playersChecked)=>{
        this.setState({playersChecked})
    };
    onSubmit=(formValues)=>{
        this.setState({loading:true});
        formValues.teamPlayers = this.state.playersChecked;
        formValues.type = this.state.teamType;
        this.props.addTeam(formValues, ()=>{
            this.props.navigation.navigate('allTeams');
        })
    };

    render(){
        const {bg} = styles;
        this.buildArray();
        return(
            <LinearGradient style={bg} colors={colorPallet.blueGradient}>
                <ScrollView>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading....'}
                        textStyle={{color:'white'}}
                    />
                    <Card>
                        <Field name='teamName' label='Team Name' component={this.renderInput}/>
                        <Text style={{color:'grey', paddingTop:15}}>Select Team Type</Text>
                        <Picker
                            itemStyle={{height:50, color:colorPallet.iosBlue}}
                            onValueChange={(itemValue)=>this.setState({teamType:itemValue})}
                            selectedValue={this.state.teamType}
                            style={{ width:'100%', height:50, paddingTop:10}}>
                            <Picker.Item label='Action' value='Action'/>
                            <Picker.Item label='LMS' value='LMS'/>
                            <Picker.Item label='Club' value='Club'/>

                        </Picker>
                        <Text style={{paddingTop:15,paddingBottom:15}}>Select your Squad</Text>

                        <SelectMultiple
                            items={playersArray}
                            selectedItems={this.state.playersChecked}
                            onSelectionsChange={this.onSelectChange}
                        />
                        {this.renderPlayers()}
                    </Card>
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
  const errors ={};
  if(!formValues.teamName){
      errors.teamName = 'Please enter a team name.'
  }
  return errors;
};

const form = reduxForm({
 form:'newTeam',
    validate

})(NewTeam);

const mapStateToProps = state =>{
  return {players:state.players}
};
export default connect(mapStateToProps, {get_players, addTeam})(form);