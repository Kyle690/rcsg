import React from 'react';
import {View, Text, ScrollView, Picker} from 'react-native';
import {connect}from'react-redux';
import {Field, reduxForm} from "redux-form";
import {LinearGradient} from "expo-linear-gradient";
import {Card, Input} from "react-native-elements";
import SuccessButton from '../../components/Buttons/SuccessButton';
import colorPallet from "../../components/Constants/colors";
import {editTeam, deleteTeam, saveTeam} from "../../Store/Actions/Teams";
import {get_players} from "../../Store/Actions/Players/playerActions";
import Spinner from "react-native-loading-spinner-overlay";
import DangerButton from '../../components/Buttons/dangerButton';
import SelectMultiple from "react-native-select-multiple";

const playersArray =[];
class EditTeam extends React.Component{

    state={loading:false, playersChecked:[], teamType:'', teamId:''};

    componentWillMount() {
        const team = this.props.navigation.getParam('team', 'NO_info');
        this.props.get_players();
        this.props.editTeam(team);
        this.setState({playersChecked:team.teamPlayers, teamType:team.type, teamId:team.id})
    }

    static navigationOptions =()=>{
      return {headerTitle:'Edit Team'}
    };

    buildArray=()=>{
        //  console.log(playersArray.length);
        if(this.props.players.players.length >0 && playersArray.length !== this.props.players.players.length) {

            this.props.players.players.map(player=>{
                const id = player.id;
                const name = player.firstName + ' '+player.lastName;
                playersArray.push({ label:name,value:id})
            });



        }
    };

    onSelectChange = (playersChecked)=>{
        this.setState({playersChecked})
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

    onSubmit =(formValues)=>{
        this.setState({loading:true});
        formValues.teamPlayers = this.state.playersChecked;
        formValues.type = this.state.teamType;
        this.props.saveTeam(formValues, ()=>{
            this.props.navigation.navigate('allTeams');
        })
    };

    onDelete =()=>{
        this.setState({loading:true});
        this.props.deleteTeam(this.state.teamId,()=>{
            this.props.navigation.navigate('allTeams');
        })
    };
    render(){
        this.buildArray();
        return(
            <LinearGradient colors={colorPallet.blueGradient} style={{height:'100%', width:'100%'}}>
                <ScrollView>
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading....'}
                        textStyle={{color:'white'}}
                    />
                    <Card title={this.props.team.teamName}>
                        <Field name='teamName' label='Team Name' component={this.renderInput}/>

                        <Picker
                            itemStyle={{height:50, color:colorPallet.iosBlue}}
                            onValueChange={(itemValue)=>this.setState({teamType:itemValue})}
                            selectedValue={this.state.teamType}
                            style={{ width:'100%', height:50, paddingTop:10}}>
                            <Picker.Item label='Action' value='Action'/>
                            <Picker.Item label='LMS' value='LMS'/>
                            <Picker.Item label='Club' value='Club'/>

                        </Picker>

                        <SelectMultiple
                            items={playersArray}
                            selectedItems={this.state.playersChecked}
                            onSelectionsChange={this.onSelectChange}
                        />
                        <SuccessButton
                            style={{paddingTop: 15}}
                            title='Save'
                            onPress={this.props.handleSubmit(this.onSubmit)}
                        />
                        <DangerButton
                            title='Delete Team'
                            onPress={this.onDelete}
                        />
                    </Card>
                </ScrollView>
            </LinearGradient>
        )
    }
}
const validate = (formValues)=>{
    const errors ={};
    if(!formValues.teamName){
        errors.teamName = 'Please enter a team name.'
    }
    return errors;
};

const form = reduxForm({
    form:'editTeamForm',
    validate,
    enableReinitialize: true
})(EditTeam);

const mapStateToProps = state=>{
  return {
      players:state.players,
      initialValues: state.teams.editTeam,
      team: state.teams.editTeam
  }
};

export default connect(mapStateToProps, {editTeam, get_players, saveTeam, deleteTeam})(form);