import React from "react";
import './FaceRecognition.css';

const FaceRecognition =({image,box})=>{
    return(
        <div className='center'>
             <img id='inputimage' alt='' src={image} width='500px' height='auto'/>
             <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
       
    )    
}
export default FaceRecognition