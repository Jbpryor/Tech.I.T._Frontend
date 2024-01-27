import "./login.scss";
import "boxicons/css/boxicons.min.css";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../authApiSlice";
import { setCredentials } from "../authSlice";
// import useAuth from "../../../Hooks/useAuth";
// import { PulseLoader } from 'react-spinners'

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [demoUser, setDemoUser] = useState(false);
  // const [errMsg, setErrMsg] = useState("");

  const handleDemoUser = () => {
    setEmail("demo@example.com");
    setPassword("fl4Zdi5J");
    setDemoUser(true);
  };

  const handleFacebookLogin = () => {};

  const handleGoogleLogin = () => {};

  // const handleForgotPassword = () => {};

  // const handleLogin = () => {
  //   demoUser ? navigate("/demoLogin") : navigate("/");
  // };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
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

  // if (isLoading) return <div>... Loading</div>;

  return (
    <section className="login-container">
      <div className="login-form">
        <div className="login-content">
          <div className="login-title">Login</div>
          <form className="login-form-container" onSubmit={event => event.preventDefault()}>
            <div className="field input-field">
              <input
                type="email"
                id="email"
                ref={userRef}
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
              <NavLink
                to={"/passwordReset"}
                className="forgot-pass"
                // onClick={handleForgotPassword}
              >
                Forgot password?
              </NavLink>
            </div>

            <div className="field login-button">
              <button type="button" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field facebook" onClick={handleFacebookLogin}>
            <i className="bx bxl-facebook facebook-icon"></i>
            <span>Login with Facebook</span>
          </a>
        </div>

        <div className="media-options">
          <a href="#" className="field google" onClick={handleGoogleLogin}>
            <img src="images/google.png" alt="" className="google-img"></img>
            <span>Login with Google</span>
          </a>
        </div>

        <div className="media-options">
          <a href="#" className="field demo" onClick={handleDemoUser}>
            <i className="bx bxs-user-circle demo-icon"></i>
            <span>Login as Demo User</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
