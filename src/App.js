import React from 'react'
import  Navigation from './Components/Navigation/Navigation'
import Particles from 'react-particles-js';
import './App.css';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

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
      imageUrl:''
    }
  }
  OnInputChange=(event)=>{
    this.setState({input:event.target.value})
  }
  OnButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input})
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
      
        <FaceRecognition image={this.state.imageUrl}/>
        
      </div>
    );
  }
  
}

export default App;
