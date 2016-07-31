/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView
} from 'react-native';

class Blink extends Component {
  constructor(props) {
    // do with the props as usual
    super(props);
    // initial state
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 1000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

// classes need to start with upper case letter!
// Sometimes hot reload does not make everything work!
    // EG when I change what this.state contains
class NameChange extends Component {
    constructor(props) {
      // do with the props as usual
      super(props);
      // initial state
      this.state = {name: 'Ed X'};

      // Toggle the state every second
      setInterval(() => {
        if (this.state.name == 'Ed X'){
          this.setState({ name :'Jiaxin L' });
        } else {
          this.setState({ name : 'Ed X' });
        }
      }, 1000);
    }

    render() {
      let display = this.state.name;
      return (
        <Text>Hi {display}</Text>
      );
    }
}

class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {text: '', res:'results good!'};
  }
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <ScrollView>
      {/* Large Container of multiple sub views */}
        {/* text input */}
        <View style={{padding: 10}}>
          <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={(input) => this.setState({text: input})}
            onSubmitEditing={() => this.setState( {res:'submitted!'} ) }
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.res}
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
        </View>
        {/* flexbox testing */}
        <View style={ {height: 50, flexDirection: 'row', justifyContent: 'flex-end'} }>
          <View style={{width: 50, backgroundColor: 'red'}} />
        </View>
        <View style={{
          height: 50, flexDirection: 'row', justifyContent: 'center'
        }}>
          <View style={{width: 50, backgroundColor: 'powderblue'}} />
          <View style={{width: 50, backgroundColor: 'skyblue'}} />
          <View style={{width: 50, backgroundColor: 'steelblue'}} />
        </View>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            Shake or press menu button for dev menu
          </Text>
          <Image source={pic} style={{width: 193, height: 110}}/>
          <Greeting name='Rexxar' />
          <Greeting name='Jaina' />
          <Greeting name='Valeera' />
          <Blink text='blink text'/>
          <NameChange/>
          <Text style={styles.red}>just red</Text>
          <Text style={styles.bigblue}>just bigblue</Text>
          <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>
          <Text style={[styles.red, styles.bigblue]}>red, then bigblue</Text>
       </View>
      </ScrollView>

    );
  }
}

// the last style in the array has precedence, so you can use this to inherit styles.
// One common pattern is to make your component accept a style prop which in turn is used to style subcomponents. You can use this to make styles "cascade" they way they do in CSS.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  bigblue: {
  color: 'blue',
  fontWeight: 'bold',
  fontSize: 30,
  },
  red: {
    color: 'red',
 },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
