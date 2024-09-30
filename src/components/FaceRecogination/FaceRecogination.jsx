import React from 'react';
import './FaceRecogination.css';

const FaceRecogination = ({ imageUrl, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: boxes.topRow, right: boxes.rightCol, bottom: boxes.bottomRow, left: boxes.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecogination;


//my code
// import React from "react";
// import './FaceRecogination.css';

// const FaceRecogination = ({imageUrl,boxes/*boxes = []*/})=>{
//     return(
//         <div className="center ma">
//             <div className="absolute mt2">
//             <img onClick={e =>{console.log(e.target.width,e.target.height)}} id="inputImage" alt="" src={imageUrl} width ='550px' height='auto'/>
//             <div className="bounding-box"  style={{top: boxes.topRow, right: boxes.rightCol, bottom: boxes.bottomRow, left: boxes.leftCol}}></div>
//             </div>
//             {/* {boxes.map(box =>
//                 <div key={`box${box.topRow}${box.rightCol}`}
//                 className='bounding-box'
//                 style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
//                 </div>
//         )} */}

//         </div>
//     )
// }

// export default FaceRecogination