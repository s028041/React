import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container, Content, Header, Form, Input, Item, Button, Label} from 'native-base'
import { StackNavigator, TabNavigator } from 'react-navigation';

import * as firebase from 'firebase';
import HomeScreen from './HomeScreen';




// Initialize Firebase
var config = {
  apiKey: "AIzaSyAwNglu4811O9jYhDln0_FPz0HyoOrP5vE",
  authDomain: "react-firebase-c9c8a.firebaseapp.com",
  databaseURL: "https://react-firebase-c9c8a.firebaseio.com",
  projectId: "react-firebase-c9c8a",
  storageBucket: "react-firebase-c9c8a.appspot.com",
  messagingSenderId: "91068272861"
};
firebase.initializeApp(config);



export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login'
    };

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null) {
        console.log(user)
      }
    })
  }
  

  signUpUser = (email,password) => {

    try {
      if(this.state.password.length<6)
      {
        alert("Please enter atleast 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then((user) =>{
        alert("You have successfully registered")
        return;
      })

    }
    catch(error){
      console.log(error.toString())
    }

  }

  loginUser = (email, password) => {
    
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        this.props.navigation.push('Compass')
      })

    }
catch(error) {
  console.log(error.toString())
}
  }

  async loginWithFacebook(){
    const {type,token} = await Expo.Facebook.logInWithReadPermissionsAsync
    ('875510382633487',{permissions: ['public_profile'] })
    if(type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error);
      
      })
    }
  }



  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
            autoCorrent= {false}
            autoCapitalize="none"
            onChangeText = {(email) => this.setState({email})}
            />

            </Item>
            <Item floatingLabel>
            <Label>Password</Label>
            <Input
            secureTextEntry={true}
            autoCorrent= {false}
            autoCapitalize="none"
            onChangeText = {(password) => this.setState({password})}
            />

            </Item>
            <Button style={{marginTop:10}}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email,this.state.password)}
            
            >
            <Text style={{color:'white'}}> Login </Text>
            </Button>
            <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email,this.state.password)}>
            <Text style={{color:'white'}}> Sign Up </Text>
            </Button>
            <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook() }
            >
            <Text style={{color:'white'}}> Login With Facebook </Text>
            </Button>
          </Form>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
});
