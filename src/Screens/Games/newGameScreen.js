import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from "redux-form";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {View, Text, ScrollView, Picker} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {Card, Input} from "react-native-elements";
import colorPallet from "../../components/Constants/colors";
import SuccessButton from '../../components/Buttons/SuccessButton';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import {getTeams} from "../../Store/Actions/Teams";
import {addGame} from "../../Store/Actions/Games/gameActions";
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import SelectMultiple from "react-native-select-multiple";


let players =[];
class NewGame extends React.Component{

    componentWillMount() {
        this.props.getTeams();
    }

    state = {date:'', loading:false, selectedTeam:'', team:'', selectedPlayers:[]};

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

    renderPlayers = ()=>{
      this.props.teams.teams.map(team=>{
          if(this.state.selectedTeam === team.id){
              this.setState({team});
              players = team.teamPlayers;
          }
      })
    };


    onSelectChange=(selectedTeam)=>{
        this.setState({selectedTeam, selectedPlayers:[]});
        this.renderPlayers();
    };

    renderTeams =()=>{
      if(this.props.teams.teams !== null){
         return(
             <View style={{padding: 10}}>
                 <Text style={{padding:20}}>Select your Team</Text>
                 <Picker
                    onValueChange={itemValue=>this.onSelectChange(itemValue)}
                    selectedValue={this.state.selectedTeam}
                    itemStyle={{height:50}}
                    style={{ width:'100%', height:50, paddingTop:10}}>
                        <Picker.Item label=''/>
                     {this.props.teams.teams.map(team=>{
                         return(
                             <Picker.Item key={team.id} label={team.teamName} value={team.id}/>
                         )
                     })}

                 </Picker>
                 <Text style={{paddingTop:20}}>Select players from your squad below</Text>
             </View>
         )
      } else{
          return (
              <PrimaryButton
                title="Load some teams"
                onPress={()=>this.props.navigation.navigate('addTeam')}
              />
          )
      }
    };

    renderSubmit=()=>{
        if(this.state.selectedPlayers.length >0){
            return(
                <SuccessButton
                    title='Create Game'
                    onPress={this.props.handleSubmit(this.onSubmit)}
                />
            )
        }else{
            return(
                <Text>Make sure you have selected your team and players!</Text>
            )
        }
    };

    onSubmit=(formValues)=>{
        this.setState({loading:true});
        formValues.team=this.state.team;
        formValues.selectedPlayers = this.state.selectedPlayers;
        formValues.date = this.state.date;
        //console.log(this.state.date);
        this.props.addGame(formValues, ()=>{
            this.props.navigation.navigate('Games')
        })
    };


    render(){
        const {bg, pickerView}=styles;
        return(
            <LinearGradient style={bg} colors={colorPallet.orangeGradient}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Loading....'}
                    textStyle={{color:'white'}}
                />
                <ScrollView>
                    <KeyboardAwareScrollView>
                        <Card>
                            <Text>Select Game Date</Text>
                            <DatePicker
                                    style={{width:'100%', padding:10}}
                                    date={this.state.date}
                                    placeholder='Select Date'
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    mode='date'
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            <Field name='opposition' label='Opposition' placeholder='Some team' component={this.renderInput}/>
                            {this.renderTeams()}


                            <SelectMultiple

                                items={players}
                                onSelectionsChange={selectedPlayers=>this.setState({selectedPlayers})}
                                selectedItems={this.state.selectedPlayers}
                            />

                            {this.renderSubmit()}
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
    },
    pickerView:{
        height:100,
        paddingTop:10,
        paddingBottom:10
    }
};

const validate = (formValues)=>{
  const errors=[];
  if(!formValues.opposition){
      errors.opposition = 'Please enter an opposition'
  }
  return errors;
};

const form = reduxForm({
    form:'newGameForm',
    validate
})(NewGame);

const mapStateToProps = state =>{
  return {teams:state.teams}
};

export default connect(mapStateToProps, {getTeams, addGame})(form);
