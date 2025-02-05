import { useState } from "react";
import { CgEnter } from "react-icons/cg";
import style from "../../styles/LoginStyles.module.css";
import { setActiveStudent } from "../../redux/features/app-slice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

let Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  let stayLogged = false;
 
  const handleLogin = (e) => {
    e.preventDefault();
    let inputData = {
      username: loginData.username,
      password: loginData.password,
    };

    fetch(`/api/users/${inputData.username}`)
      .then((res) => {
        if (res.status === 404) throw new Error("Not Found");
        return res.json();
      })
      .then((user) => {
        if (user.password === inputData.password) {
          stayLogged &&
            localStorage.setItem("currentUser", JSON.stringify(user));
          sessionStorage.setItem("currentUser", JSON.stringify(user));
        } else {
          throw new Error("Not Found");
        }
        user.admin
          ? (router.push("/admin"), setLoginData(""))
          : (router.push("/student"),
            dispatch(setActiveStudent(user)),
            setLoginData(""));
      })
      .catch(({ message }) => {
        setError(true);
      });
  };

  const handleChange = (e) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.name]: e.target.value,
      };
    });
  };

  // handleHash was here but was commented out;
  return (
    
    <div className={style.modalContainer}>
      {/* <button onClick={handleHash}>CLICK TO HASH</button> */}
      {/* <div className={style.picCont}> */}
      {/* </div> */}
      <div className={style.loginContainer}>
        <h1 className={style.loginTitle}>Hacking Transition</h1>
        {error && (
          <span id="blankLoginErrMsg" className={style.errorMsg}>
            Username/Password is Incorrect
          </span>
        )}

        <form className={style.loginForm} onSubmit={handleLogin}>
          <span>
            <label htmlFor="username" className={style.label}>
              Username
            </label>
            <input
              required
              id="formInput"
              className={`${style.input} ${style.username}`}
              type="text"
              placeholder="Username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
            />
          </span>
          <span>
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              required
              id="formInput"
              className={style.input}
              type="password"
              placeholder="Password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
          </span>
          <span>
            <input
              type="checkbox"
              name="stay_logged"
              id="stay_logged"
              value={true}
              className={style.rememberMe}
              onClick={() => {
                stayLogged = !stayLogged;
              }}
            />{" "}
            <label htmlFor="stay_logged" className={style.label}>
              Remember Me
            </label>
          </span>
          <button id="submit" type="submit" className={style.loginBtn}>
            LOG IN <CgEnter />{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
