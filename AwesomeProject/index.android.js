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
  ScrollView,
  ListView
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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      text: '',
      res:'results good!',
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]),
      movieTitle : 'loading from backend...',
      movieYear : 'loading from backend...',
      movieTitle2 : 'loading from backend...'
    };
    // getMoviesFromApiAsync returns a promise. When it is done, it returns responseJson.movies, the final return value (of the chain of thens).
    // this is used to update the state of movieTitle
    this.getMoviesFromApiAsync().done( (movies) => this.setState( {movieTitle: movies[1].title}));
    // using async call, with the .done()
    this.getMoviesFromApi().done( (movies) => this.setState( {movieYear: movies[1].releaseYear}) );
    // using await (await has to be called in an async function)
    this.setMovieTitleAwait();
  }

  async setMovieTitleAwait()
  {
    var m = (movies) => {this.setState( {movieTitle2: movies[0].title})} // creates an arrow function
    m(await this.getMoviesFromApi()); // calls it, populates the "movies" input with the return from getMoviesFromApi, awaits for the result
    //await seems to wait for a PROMISE function to finish, then grab the return in the promise 
  }
  // using the promise system
  // fetch returns a promise.
  // We call .then on the promise, aka what to do after the promise has been resolved
  // which then also returns a promise that can be chained
  getMoviesFromApiAsync() {
    return fetch('http://facebook.github.io/react-native/movies.json') //fetch returns a promise
      .then((response) => response.json()) // Body.json() returns another promise
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ES7 we can await a async function
  // kind of like syntatic surga on top of promises
  async getMoviesFromApi() {
    try {
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      // https://developer.mozilla.org/en-US/docs/Web/API/Request
      let response = await fetch('http://facebook.github.io/react-native/movies.json');
      let responseJson = await response.json();
      return responseJson.movies;
    } catch(error) {
      console.error(error);
    }
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

          {/* testing backend calls */}
          <Text> {this.state.movieTitle} </Text>
          <Text> {this.state.movieYear} </Text>
          <Text> {this.state.movieTitle2} </Text>

        </View>
       { /* ScrollView works best to present a small amount of things of a limited
            size. All the elements and views of a ScrollView are rendered, even if
            they are not currently shown on the screen.
            Use a listview if you want a long list of items
              This only renders elements that are currently showing on the screen*/}

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View>
              <View style={{height:100, width: 50, backgroundColor: 'powderblue'}} />
              <Text>{rowData}</Text>
            </View>}
        />
      </ScrollView>

    );
  }
}

// the last style in the array has precedence, so you can use this to inherit styles.
// One common pattern is to make your component accept a style prop which in turn is used to style subcomponents. You can use this to make styles "cascade" they way they do in CSS.
const styles = StyleSheet.create({
  container: {
    // removed flex: 1 !!! if this has flex 1, a sibling listview can't dsiplay all contents!
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
