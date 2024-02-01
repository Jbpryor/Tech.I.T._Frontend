import "./login.scss";
import "boxicons/css/boxicons.min.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { login, getAuthStatus, getAuthError } from "../authApiSlice";
import { setCredentials } from "../authSlice";
import { PulseLoader } from "react-spinners";

const EMAIL_REGEX = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

function Login() {
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoUser, setDemoUser] = useState(false);
  const err = useSelector(getAuthError);
  const [errMsg, setErrMsg] = useState("");
  const status = useSelector(getAuthStatus);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const handleDemoUser = () => {
    setEmail("demo@example.com");
    setPassword("fl4Zdi5J");
    setDemoUser(true);
  };

  const isLoading = status === "loading";

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const canContinue = [validEmail, validPassword].every(Boolean) && !isLoading;

  const handleLogin = async (event) => {
    event.preventDefault();

    const response = await dispatch(login({ email, password }));

    if (login.fulfilled.match(response)) {
      const { accessToken, role } = response.payload;
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");

      if (demoUser) {
        navigate("/demoLogin");
      } else if (window.innerWidth > 850) {
        navigate("/dashboard");
      } else if (role === "Admin" || role === "Project Manager") {
        navigate("/projects");
      } else {
        navigate("/issues");
      }
    } else if (login.rejected.match(response)) {
      if (
        !response &&
        response.payload === "Request failed with status code 401"
      ) {
        setErrMsg("Missing email or password");
      } else if (response.error.message === "Network Error") {
        setErrMsg(response.error.message);
      } else {
        const { message } = response.error;
        if (message === "Request failed with status code 401") {
          setErrMsg("Incorrect email or password");
        } else if (message === "Request failed with status code 400") {
          setErrMsg("Missing email or password");
        }
      }
    }
  };

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  return (
    <section className="login-container">
      <div className="login-form">
        <div className="login-content">
          <h1 className="login-title">Login</h1>
          <form
            className="login-form-container"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="field input-field">
              <input
                type="email"
                id="email"
                ref={emailRef}
                placeholder="Email"
                className="email"
                value={email}
                autoComplete="off"
                required
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
            </div>

            <div className="form-link">
              <NavLink to={"/passwordReset"} className="forgot-pass">
                Forgot password?
              </NavLink>
            </div>

            <div className="field login-button">
              <button
                type="button"
                onClick={handleLogin}
                disabled={!canContinue}
                style={{ filter: !canContinue && "brightness(0.5)" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="line"></div>

        <div className="demo-button">
          <button className="field demo" onClick={handleDemoUser}>
            <i className="bx bxs-user-circle demo-icon"></i>
            <span>Login as Demo User</span>
          </button>
        </div>
        <p className={`${errMsg ? "errMsg" : "offscreen"}`} ref={errRef}>
          {errMsg}
        </p>
      </div>
    </section>
  );
}

export default Login;
