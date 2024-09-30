import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecogination from "./components/FaceRecogination/FaceRecogination";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import React from "react";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
// import Clarifai from 'clarifai';

// const app = new Clarifai.App({
//   apiKey:'da0cf880a27046f68cb83d346224de3a'
// });

// const returnClarifaiRequestOptions = (imageUrl) => {
//   const PAT = "da0cf880a27046f68cb83d346224de3a";
//   const USER_ID = "clarifai";
//   const APP_ID = "main";
//   // const MODEL_ID = 'face-detection';
//   const IMAGE_URL = imageUrl;
//   const raw = JSON.stringify({
//     user_app_id: {
//       user_id: USER_ID,
//       app_id: APP_ID,
//     },
//     inputs: [
//       {
//         data: {
//           image: {
//             url: IMAGE_URL,
//             // "base64": IMAGE_BYTES_STRING
//           },
//         },
//       },
//     ],
//   });
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       Authorization: "Key " + PAT,
//     },
//     body: raw,
//   };
//   return requestOptions;
// };
const initialState = {
  input: "",
  imageUrl: "",
  boxes: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  //we created the below user so that we can use this in register.js and in any child component
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.id,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  // //below we use componentDidMount()- a lifecycle hook from react so that we dont have to use arrow functions
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then((response)=>response.json())
  //   .then((data)=>console.log(data))
  //   //shorthand way is .then(console.log)
  // }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    // console.log(data)
    // console.log(image);
    // const width = Number(550);
    // const height = Number(330);
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    // const boundingBox = data.region.region_info.bounding_box;
    // const topRow = data.boundingBox.top_row.toFixed(3);
    // const leftCol = data.boundingBox.left_col.toFixed(3);
    // const bottomRow = data.boundingBox.bottom_row.toFixed(3);
    // const rightCol = data.boundingBox.right_col.toFixed(3);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      // boundingBox,
      // topRow,
      // leftCol,
      // bottomRow,
      // rightCol,
    };
  };
  displayFaceBox = (boxes) => {
    //console.log(boxes);
    this.setState({ boxes });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

// onButtonSubmit = () => {
//   this.setState({ imageUrl: this.state.input });
//   // app.models.predict('face-detection',this.state.input)
//   fetch(
//     "https://api.clarifai.com/v2/models/face-detection/outputs",
//     returnClarifaiRequestOptions(this.state.input)
//   )
//     // fetch("https://api.clarifai.com/v2/models/", returnClarifaiRequestOptions(this.state.input))
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//       if (response) {
//         fetch("http://localhost:3001/image", {
//           method: "put",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             id: this.state.user.id,
//           }),
//         })
//           .then((response) => response.json())
//           .then((count) => {
//             this.setState(Object.assign(this.state.user, { entries: count }));
//           })
//           .catch(console.log);
//       }
//       this.displayFaceBox(this.calculateFaceLocation(response));
//       // .catch(err => console.log(err));
//     });
// };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://face-recognition-backend-5lyf.onrender.com/clarifai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: this.state.input }),
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        if (data) {
            fetch("https://face-recognition-backend-5lyf.onrender.com/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((response) => response.json())
              .then((count) => {
                this.setState(Object.assign(this.state.user, { entries: count }));
              })
              .catch(console.log);
          }
        this.displayFaceBox(this.calculateFaceLocation(data)); // Update this based on the response structure
      })
      .catch(error => console.error('Error:', error));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    return (
      <div className="App">
        <ParticlesBg num={100} type="cobweb" bg={true} />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecogination
              boxes={this.state.boxes}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>

//        <div className="App">
// <ParticlesBg  num={100} type="color" bg={true} />
//   <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
//   <div>
//   <Logo />
//   <Rank 
//     name={this.state.user.name}
//     entries={this.state.user.entries}
//   />
//   <ImageLinkForm 
//   onInputChange={ this.onInputChange } 
//   onButtonSubmit={this.onButtonSubmit}
//   />
//   <FaceRecogination boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
//   </div>
// </div> 
    );
  }
}

export default App;

// had to make changes in vite.config.js server: {port: 3000, // Change this to the desired port}, to make port 3000

