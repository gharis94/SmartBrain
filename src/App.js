import React from 'react'
import  Navigation from './Components/Navigation/Navigation'
import Particles from 'react-particles-js';
import './App.css';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: "8faae42c2f7144769545033fe9e975ee"
 });

const particlesOption={
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super()
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
  }
  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height)
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  displayFaceBox=(box)=>{
    this.setState({box:box})
  }
  OnInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  OnButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err))
    
  }
  render(){
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOption} 
  
        />
        <Navigation />
        <Logo />
        <Rank/>
        <ImageLinkForm  OnInputChange={this.OnInputChange} OnButtonSubmit={this.OnButtonSubmit}/>
      
        <FaceRecognition box={this.state.box} image={this.state.imageUrl}/>
        
      </div>
    );
  }
  
}

export default App;
