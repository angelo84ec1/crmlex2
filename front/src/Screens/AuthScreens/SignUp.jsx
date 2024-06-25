import React from 'react'
import EmailIcon from '../../assets/images/email-icons.svg'
import PassIcon from '../../assets/images/passsword-icons.svg'
import User from '../../assets/images/user-icon.svg'
import CRM from '../../assets/images/CRM infographic.png'
import './style.css'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerUser } from '../../Redux/authReducer'
import { useTranslation } from 'react-i18next'
import { resetError } from '../../Redux/authReducer'

export default function SignUp() {
  const dispatch = useDispatch()
  const [userCreds, setUserCreds] = React.useState({})
  const { t } = useTranslation()

  const { message, regStatus, error } = useSelector(state => state.Auth)
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
  const handleOnChange = (e) => {
    setUserCreds(s => ({ ...s, [e.target.name]: e.target.value }))
    // console.log(userCred)


  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser({ ...userCreds, role: 'Cliente' }))

    // document.getElementById('pass').value = ''
    // document.getElementById('email').value = ''
    // setCretents([{ title: "", description: "" }])

  }
  React.useEffect(() => {
    setTimeout(() => {
      dispatch(resetError())
    }, 4000);
  }, [error,message]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">

          <div className="col-lg-6">
            <div className="logo">
              <h3>CRM</h3>
            </div>
            <div className="signup-input">
              <div className="sign-txt signup-txt">
                <h4 className="signup-heading">{t('sign_up')}</h4>
                <h3>{t('if_you_have_account')}</h3>
                <h3>{t('you_can')} <Link to="/login">{t('login_here')}!</Link></h3>
              </div>

              <div className="form-section">
                <div className="form">
                  <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                      <img className="input-icons" src={User} alt="Email" />
                      <label htmlFor="username" className="form-label">username</label>
                      <input onChange={handleOnChange} type="text" name='name' className="form-control" id="username" aria-describedby="emailHelp"
                        placeholder="Ingrese su nombre de usuario" />
                    </div>
                    <div className="mb-3">
                      <img className="input-icons" src={EmailIcon} alt="Email" />
                      <label htmlFor="email" className="form-label">{t('email')}</label>
                      <input onChange={handleOnChange} type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp"
                        placeholder={t('enter_email')} />
                    </div>
                    <div className="mb-3">
                      {/* <img className="input-icons" src={EmailIcon} alt="Email" /> */}
                      <label htmlFor="phone" className="form-label">{t('phone')}</label>
                      <input onChange={handleOnChange} name='phone' className="form-control" id="phone" aria-describedby="emailHelp"
                        placeholder={t('enter_phone')} />
                    </div>

                    <div className="mb-3">
                      <img className="input-icons" src={PassIcon} alt="Password" />
                      <label htmlFor="password" className="form-label">{t('password')}</label>
                      <input onChange={handleOnChange} type="password" id="pass" name='password' className="form-control"
                        placeholder={t('enter_password')} />
                      {/* <div onClick={() => showpassword()}
                      >
                        <a className="pass-icon" id="pass_hide_icon" href=""><i className="fa-regular fa-eye-slash"></i></a>
                        <a style="display: none;" className="pass-icon" id="pass_show_icon" href=""><i className="fa-regular fa-eye"></i></a>
                      </div> */}
                    </div>

                    {/* <span
                      style={{ color: 'red', display: `${regStatus === 'failed' ? 'block' : 'none'}` }}
                    >{error.error}</span> */}
                    <span
                      style={{ color: 'red', display: `${error != null ? 'block' : 'none'}` }}
                    >{error != null && error.error}</span>
                    <span
                      style={{ color: 'green', display: `${message != '' ? 'block' : 'none'}` }}
                    >{message}</span>
                    {/* <span
                      style={{  display: `${regStatus === 'succeeded' ? 'block' : 'none'}` }}
                    >{message}</span> */}
                    <button type="submit"
                      style={{ marginTop: '1rem' }}
                      className="btn btn-primary">
                      {
                        regStatus === 'idle' || regStatus === 'failed' ? `${t('sign_up')}` : <CircularProgress color="inherit" />
                      }

                    </button>
                  </form>
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
