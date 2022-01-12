import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesComp from './components/background/ParticlesComp'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

import 'tachyons'



const initialState = {
  input: '',
  imageUrl: '',
  box: [{}],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

const { REACT_APP_IMAGE_URL, REACT_APP_IMAGE } = process.env

class App extends React.Component {

  constructor() {
    super();
    this.state = initialState
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarfaiFace = data.outputs[0].data.regions//[0].region_info.bounding_box;
    console.log(clarfaiFace);

    const image = document.getElementById('inputimage');
    const width = Number(image.width)
    const height = Number(image.height)

    const faces = clarfaiFace.map(obj => ({
      leftCol: obj.region_info.bounding_box.left_col * width,
      topRow: obj.region_info.bounding_box.top_row * height,
      rightCol: width - (obj.region_info.bounding_box.right_col * width),
      bottomRow: height - (obj.region_info.bounding_box.bottom_row * height)

    }))
    console.log(faces)
    return faces
    // return {
    //   leftCol: clarfaiFace.left_col * width,
    //   topRow: clarfaiFace.top_row * height,
    //   rightCol: width - (clarfaiFace.right_col * width),
    //   bottomRow: height - (clarfaiFace.bottom_row * height)
    // }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
    console.log(this.state.box)
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch(REACT_APP_IMAGE_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(REACT_APP_IMAGE, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            // .then('baktigim yer' , console.log)
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }
      )
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }


  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    console.log('box==>', box)
    return (
      <div className="App">
        <ParticlesComp />  {/* this is for background. Js pack is called particles */}
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
