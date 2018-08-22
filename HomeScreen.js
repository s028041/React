import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Compass'
        };
  state = {
    isReady: false,
    v:null, //vektorius
  };

  _setupMagnetometerAsync = async () => {
    Expo.Magnetometer.addListener(v =>{
      this.setState({ v });
    });
  };

  componentDidMount() {
    this._setupMagnetometerAsync();
  }


  render() {
    const {navigate} = this.props.navigation;

    let theta = "0rad";
    if (this.state.v) {
      let {x,y,z} = this.state.v;
      theta = Math.atan(-x/y);

      if (-x > 0 && y > 0) {
      } else if (y>0) {
        theta += Math.PI;
      } else {
        theta += Math.PI * 2;
      }
    }

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(theta)}</Text>
        <ImageBackground
        source ={require('./Compass.jpg')}
        style = {{
          height:320,
          width:320,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image 
        source = {require('./CompassNeedle.png')}
        style={{
          height: 280,
          width: 280,
          opacity: 0.65,
          transform: [{rotate: theta}]
        }}
        />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
