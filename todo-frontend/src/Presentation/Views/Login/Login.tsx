import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Domain/context/authContext';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const {
        actions: {signIn},
      } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    await signIn(email, password);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url("https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?cs=srgb&dl=pexels-min-an-1629212.jpg&fm=jpg")` }}>
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}  className="form" >
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;






// import { useState } from 'react'

// import './Login.css'

// const Login = ({onLogin, onCloseModal, isLoginError}: any) => {
//      const [formData, setFormData] = useState({email: "", password: ""});
//      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   
//    const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         const newFormData = { ...formData, [name]: value }
//         setFormData(newFormData);   
//     }

//    const handleCredentials = async (e: any) => {
//         e.preventDefault();
//         if (!formData.email || !formData.password) return;
        
//         // const user = await login(formData);
//         // console.log(user)
//     }

//   return (
//     <section className='login_container'>
//             <h2 className='login_title'>Login</h2>
//             <form onSubmit={handleCredentials} className='login_form'>
//                 <div className='dv_login_input'>
//                     <label htmlFor="emailId">Email: </label>
//                     <input className='input_login' type="text" onChange={handleChange} value={formData.email} name="email" id="emailId" required/>
//                 </div>

//                 <div className='dv_login_input'>
//                     <label htmlFor="passwordId">Password: </label>
//                     <div>
//                         <input className='input_login' type={isPasswordVisible ? 'text' : 'password'} onChange={handleChange} value={formData.password} name="password" id="passwordId" required /> 
//                             <button className='btn_eye_container' type='button'>
//                                 <i className='bx bx-low-vision btn_eye' onClick={()=>setIsPasswordVisible(!isPasswordVisible)}></i>
//                             </button>
//                     </div>
                    

                   
//                 </div>

//                 <div className='btns_cancel_login'>
//                     <button type='submit'> Login </button>
//                     <button onClick={onCloseModal}> Cancel </button>
//                 </div>
//                 {(isLoginError) && (
//                                     <div className='p_credencial_error'>
//                                         <p>Invalid credentials!</p>
//                                     </div>
//                 )}
                
//             </form>

            
//     </section>
//   )
// }

// export default Login
