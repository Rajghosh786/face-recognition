import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='center'>
        <div className='form background center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}
          >Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;


/*my code
import React from "react";
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
        <p>This magic Brain will detect your faces in your pictures. Give it a try.</p>
            <div className="center">
                <div className="center background pa4 br3 shadow-5">
                    <input className="w-70 f4 pa2 center" type="text" onChange={ onInputChange }/>  
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={ onButtonSubmit }>Detect</button>
                </div>
            </div>
        </div>
        
    )
}

export default ImageLinkForm*/