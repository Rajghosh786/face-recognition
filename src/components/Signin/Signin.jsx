import React from 'react';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://face-recognition-backend-5lyf.onrender.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;


//my code
// import React from "react";

// //we will turn this signIn component into a smart component now by giving its input a functionality we change (const SignIn=({onRouteChange})=>) to (class SignIn extends React.Component) aur isme dalenge render method return ko pura render me daaal denge
// //ek se zayda smart components kar sakte hai and usme state bhi bana sakte hai lekin child components ke state wahi tak rahe tohi acha h
// class SignIn extends React.Component{
// //to create this.state constructor and super is must
//     constructor(props){
//         super(props);
//         this.state={
//             signInEmail:"",
//             signInPassword:"",
//         }
//     }
//     onEmailChange=(event)=>{
//          this.setState({signInEmail:event.target.value})
//     }
//     onPasswordChange=(event)=>{
//         this.setState({signInPassword:event.target.value})
//    }
//    onSubmitSignIn=()=>{
//     //yeh wale function me hum backend ko data bhej rahe h
//     //fetch by default get method rehta hai lekin humko post chahiye isliye hum second parameter me object pass kar rahe hai 
//     fetch("http://localhost:3000/signin",{
//         method:'post',
//         headers:{'Content-Type':'application/json'},
//         body:JSON.stringify({
//             email:this.state.signInEmail,
//             password:this.state.signInPassword,
//         })
//     })
//     .then(response => response.json())
//     .then(user => {
//         if(user.id){
//             //this.prop.loadUser(user)
//             this.props.onRouteChange("home")
//         }
//     })
//    }
//     render(){
//         const{ onRouteChange }=this.props
//         return(  
//             <article className="br3 ba b--black-100 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">        
//                 <main className="pa4 black-80">
//                     <div className="measure">
//                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                         <legend className="f1 fw6 ph0 mh0">Sign In</legend>
//                         <div className="mt3">
//                             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                             <input 
//                             onChange={this.onEmailChange}
//                             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                             type="email" 
//                             name="email-address"  
//                             id="email-address"
//                             />
//                         </div>
//                         <div className="mv3">
//                             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                             <input 
//                             onChange={this.onPasswordChange}
//                             className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                             type="password" 
//                             name="password"  
//                             id="password"
//                             />
//                         </div>
//                         {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
//                         </fieldset>
//                         <div className="">
//                         <input 
//                         onClick={this.onSubmitSignIn}
//                         className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
//                         type="submit" 
//                         value="Sign in"/>
//                         </div>
//                         <div className="lh-copy mt3">
//                         <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
//                         {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
//                         </div>
//                     </div>
//                 </main>   
//             </article>  
//             )
//     }
// }
// export default SignIn

// const SignIn=({onRouteChange})=>{
//     return(  
//     <article className="br3 ba b--black-100 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">        
//         <main className="pa4 black-80">
//             <div className="measure">
//                 <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                 <legend className="f1 fw6 ph0 mh0">Sign In</legend>
//                 <div className="mt3">
//                     <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                     <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
//                 </div>
//                 <div className="mv3">
//                     <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                     <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
//                 </div>
//                 {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
//                 </fieldset>
//                 <div className="">
//                 <input 
//                 onClick={() => onRouteChange("home")}
//                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
//                 type="submit" 
//                 value="Sign in"/>
//                 </div>
//                 <div className="lh-copy mt3">
//                 <p onClick={()=>onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
//                 {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
//                 </div>
//             </div>
//         </main>   
//     </article>  
//     )
// }