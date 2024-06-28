import React, { useState, useEffect } from "react";
import EmailIcon from "../../assets/images/email-icons.svg";
import CRM from "../../assets/images/CRM infographic.png";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../Redux/authReducer";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setIsLoading(true); 

    try {
      const response = await dispatch(forgetPassword({ email }));

      if (forgetPassword.fulfilled.match(response)) {
        const successMessage = response.payload.message;
        setSuccess(successMessage); 
      } else if (forgetPassword.rejected.match(response)) {
        const errorMessage = response.payload.data || "An error occurred.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSuccess(null);
  }, [email]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div className="logo">
              <h3>CRM</h3>
            </div>
            <div className="sign-input">
              <div className="forgot-page-txt ">
                <h4 className="form-heading">Olvidaste la Contraseña?</h4>
                <h3>
                  Ingresa el email asociado a tu cuenta
                  <br />
                  Presiona el botón enviar reseteo contraseña
                  <br />
                  Revisa tu correo y presiona en el link 
                </h3>
              </div>
              <div className="form-section">
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-5">
                      <img
                        className="input-icons"
                        src={EmailIcon}
                        alt="Email"
                      />
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          error ? 'is-invalid' : ''
                        }`}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading} 
                      />
                      {error && (
                        <div className="invalid-feedback">{error}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      className=" mt-5 btn btn-primary"
                      disabled={isLoading} 
                    >
                      {isLoading ? "Sending..." : "Enviar reseteo de contraseña"}
                    </button>
                    {success && (
                      <div className="mt-3 text-success">{success}</div>
                    )}
                  </form>
                  <h4 className="mt-4">
                    Presiona <Link to="/login">Iniciar Sesión!</Link>
                  </h4>
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
  );
}
