import "./forgotPassword.scss";
import "boxicons/css/boxicons.min.css";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const canContinue = Boolean(email)

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(resetPassword({ email, password }));

      if (resetPassword.fulfilled.match(response)) {
        const { accessToken, role } = response.payload;
        setEmail("");

        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      // if (!error.status) {
      //     setErrMsg("No Server Response");
      //   } else if (error.status === 400) {
      //     setErrMsg("Missing Email or Password");
      //   } else if (error.status === 401) {
      //     setErrMsg("Unauthorized");
      //   } else {
      //     setErrMsg(error.data?.message);
      //   }
    }
  };

  const handleCancel = () => {
    navigate("/login")
  }


  return (
    <section className="forgotPassword-container">
      <div className="forgotPassword-form">
        <div className="forgotPassword-content">
          <h1 className="forgotPassword-title">Forgot Password</h1>
          <p>This will email you a temporary password.</p>

          <form className="forgotPassword-form-container" onSubmit={event => event.preventDefault()}>
            <div className="field input-field">
              <input
                type="email"
                id="email"
                ref={userRef}
                placeholder="Enter email"
                className="email"
                value={email}
                autoComplete="off"
                required
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>
            <div className="field continue-button">
              <button type="button" onClick={handlePasswordReset} disabled={!canContinue} style={{ filter: !canContinue && "brightness(0.5)"}}>
                Continue
              </button>
            </div>
            <div className="field cancel-button">
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
