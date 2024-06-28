import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Redux/authReducer";
import CRM from "../../assets/images/CRM infographic.png";
import "./style.css";

export default function ResetPassword() {
  const { email, token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown value
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await dispatch(
        resetPassword({ email, token, password, password_confirmation: passwordConfirmation })
      );

      if (resetPassword.fulfilled.match(response)) {
        const successMessage = response.payload.message;
        setSuccess(successMessage);

        // Start a countdown timer before navigation
        let timer = 5; // Set the timer duration in seconds (adjust as needed)
        const intervalId = setInterval(() => {
          if (timer === 0) {
            clearInterval(intervalId);
            navigate('/login');
          } else {
            setCountdown(timer);
            timer--;
          }
        }, 1000); // Update the countdown every 1 second
      } else if (resetPassword.rejected.match(response)) {
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
              <div className="forgot-page-txt">
                <h4 className="form-heading">Resetar la Contraseña</h4>
                <h3>Por favor ingrese la nueva contraseña</h3>
              </div>
              <div className="form-section">
                <div className="form">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Nueva Contraseña
                      </label>
                      <input
                        type="password"
                        className={`form-control ${error ? "is-invalid" : ""}`}
                        id="password"
                        placeholder="Ingresar nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="passwordConfirmation"
                        className="form-label"
                      >
                        Confirmar Nueva Contraseña 
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="passwordConfirmation"
                        placeholder="Confirmar nueva contraseña"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                        disabled={isLoading}
                        required
                      />
                    </div>
                    {success && (
                      <div className="mt-3 text-success">
                        {success} Redirecting in {countdown} seconds...
                      </div>
                    )}
                    {error && <div className="mt-3 text-danger">{error}</div>}
                    <button
                      type="submit"
                      className=" mt-5 btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Resetting..." : "Resetear Contraseña"}
                    </button>
                  </form>

                  <h4 className="mt-4">
                    Ir <Link to="/login">Iniciar Sesión !</Link>
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
