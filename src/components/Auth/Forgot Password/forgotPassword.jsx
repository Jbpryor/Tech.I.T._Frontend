import "./forgotPassword.scss";
import "boxicons/css/boxicons.min.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../authApiSlice";

const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/

function ForgotPassword() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  const canContinue = Boolean(validEmail);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    const response = await dispatch(resetPassword({ email }));

    if (resetPassword.fulfilled.match(response)) {
      setEmail("");

      navigate("/login");
    } else if (resetPassword.rejected.match(response)) {
      if (
        !response &&
        response.payload === "Request failed with status code 401"
      ) {
        setErrMsg("Missing email");
      } else if (response.error.message === "Network Error") {
        setErrMsg(response.error.message);
      } else {
        const { message } = response.error;
        if (message === "Request failed with status code 401") {
          setErrMsg("Incorrect email");
        } else if (message === "Request failed with status code 400") {
          setErrMsg("Missing email");
        } else if (message === "Request failed with status code 409") {
          setErrMsg("Incorrect email")
        }
      }
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <section className="forgotPassword-container">
      <div className="forgotPassword-form">
        <div className="forgotPassword-content">
          <h1 className="forgotPassword-title">Forgot Password</h1>
          <p className="forgotPassword-text">
            This will email you a temporary password.
          </p>

          <form
            className="forgotPassword-form-container"
            onSubmit={(event) => event.preventDefault()}
          >
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
              <button
                type="button"
                onClick={handlePasswordReset}
                disabled={!canContinue}
                style={{ filter: !canContinue && "brightness(0.5)" }}
              >
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
        <p className={`${errMsg ? "errMsg" : "offscreen"}`}>{errMsg}</p>
      </div>
    </section>
  );
}

export default ForgotPassword;
