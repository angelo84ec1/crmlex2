import React from 'react'
import EmailIcon from '../../assets/images/email-icons.svg'
import CRM from '../../assets/images/CRM infographic.png'
import PassIcon from '../../assets/images/passsword-icons.svg'
// import Facebook from '../../assets/images/Facebook.svg'
// import Apple from '../../assets/images/apple-icon.svg'
// import Google from '../../assets/images/google-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../Redux/authReducer'
import './style.css'
import { CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function Login() {

  const dispatch = useDispatch()
  const { isAuthenticated, status } = useSelector(state => state.Auth)
  const navigate = useNavigate()
  const {t}=useTranslation()
  const [userCreds, setUserCreds] = React.useState([])

  React.useEffect(() => {
    if (isAuthenticated)
      navigate('/')


  }, [isAuthenticated])


  const handleOnChange = (e) => {
    setUserCreds(s => ({ ...s, [e.target.name]: e.target.value }))
    // console.log(userCred)


  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(userCreds))

    // document.getElementById('pass').value = ''
    // document.getElementById('email').value = ''
    // setCretents([{ title: "", description: "" }])

  }

  // function showpassword() {
  //   var inputpass = document.getElementById("pass");
  //   var showpass = document.getElementById("pass_show_icon");
  //   var hidepass = document.getElementById("pass_hide_icon");
  //   if (inputpass.type === 'password') {
  //     inputpass.type = "text";
  //     showpass.style.display = "block";
  //     hidepass.style.display = "none";
  //   }
  //   else {
  //     inputpass.type = "password";
  //     showpass.style.display = "none";
  //     hidepass.style.display = "block";
  //   }
  // }
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="logo">
              <h3>CRM</h3>
            </div>
            <div className="sign-input">
              <div className="sign-txt">
                <h4 className="form-heading">{t('sign_in')}</h4>
                <h3>{t('if_you_dont_have_account')}</h3>
                <h3>{t('you_can')} <Link to="/signUp">{t('register_here')} !</Link></h3>
              </div>
              <div className="form-section">
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <img className="input-icons" src={EmailIcon} alt="Email" />
                      <label htmlFor="email" className="form-label">{t('email')}</label>
                      <input type="email" required name='email' onChange={handleOnChange} className="form-control" id="email" aria-describedby="emailHelp"
                        placeholder={t('enter_email')} />
                    </div>
                    <div className="mb-3">
                      <img className="input-icons" src={PassIcon} alt="Pass" />
                      <label htmlFor="Password" className="form-label">{t('password')}</label>
                      <input type="password" required name='password' onChange={handleOnChange} id="pass" className="form-control"
                        placeholder={t('enter_password')} />
                      <span
                      style={{color:'red',display:`${status==='failed'?'block':'none'}`}}
                      >Inicie sesión con las credenciales correctas! </span>
                      {/* <div onclick="showpassword()">
                                <a className="pass-icon" id="pass_hide_icon" href=""><i className="fa-regular fa-eye-slash"></i></a>
                                <a style="display: none;" className="pass-icon" id="pass_show_icon" href=""><i
                                  className="fa-regular fa-eye"></i></a>
                              </div> */}
                    </div>

                    <div className="check-box mb-4" style={{ marginTop: '5px' }}>
                      {/* <input className="checkbox" type="checkbox" name="" id="" /> <span>Rememebr me</span> */}
                      <Link to="/forgetPassword">{t('forget_password')} ?</Link>
                    </div>
                    <button type="submit"

                      className="btn btn-primary">
                      {
                        status === 'idle'||status === 'failed' ? `${t('login')}` : <CircularProgress color="inherit" />
                      }

                    </button>
                  </form>
                  {/* <div className="socail-icons">
                    <p>or continue with</p>
                    <div className="icon">
                      <ul>
                        <li>
                          <a href=""><img src={Facebook} alt="facebook" /></a>
                        </li>
                        <li>
                          <a href=""><img className="s-icon" src={Apple} alt="apple" /></a>
                          <li>
                            <a href=""><img className="s-icon" src={Google} alt="google" /></a>
                          </li>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 imgs">
            <div className="main-img-div">
              <div className="main-image">
                <div className="img-background">
                  <div className="side-img">
                    <img src={CRM} alt="CRM" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}
