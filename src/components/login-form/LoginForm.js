import React, { useState, useEffect } from "react";
import {
  TextBox,
  Button as NormalButton,
  Button as TextBoxButton,
} from "devextreme-react/text-box";
import { useAuth } from "../../contexts/auth";
import "./LoginForm.scss";
import { toastDisplayer } from "../toastDisplayer/toastdisplayer";
import { Button, CheckBox } from "devextreme-react";
import { signin, eyeopen, eyeclose } from "../../assets/icon";
// import * as signalR from '@microsoft/signalr';
export default function LoginForm() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState(null);
  const [usernameError, setusernameError] = useState(false);
  const [password, setpassword] = useState(null);
  const [passwordError, setpasswordError] = useState(false);
  const [rememberMe, setrememberMe] = useState(false);
  const [showpwd, setshowpwd] = useState(true);
  const [passwordMode, setPasswordMode] = useState("password");

  const handlePWDChange = (e) => {
    setpassword(e.value);
    return setpasswordError(false);
  };

  const handleUsernameChange = (e) => {
    setusername(e.value);
    return setusernameError(false);
  };

  const handleSignin = async (e) => {
    setusernameError(false);
    setpasswordError(false);

    if (!username || !password) {
      if (!username) {
        setusernameError(true);
        return toastDisplayer("error", "Enter Username");
      }
      if (!password) {
        setpasswordError(true);
        return toastDisplayer("error", "Enter Password");
      }
    }
    setLoading(true);
    const result = await signIn(username, password);

    if (!result.isOk) {
      setLoading(false);
      return toastDisplayer("error", "Invalid User..!!");
    }

    if (result.isOk) {
      if (rememberMe) {
        const usernameObj = {
          value: username,
          expiration: new Date().getTime() + 24 * 60 * 60 * 1000,
        };
        localStorage.setItem("username", JSON.stringify(usernameObj));
      }
    }
  };

  useEffect(() => {
    const Storedusername = localStorage.getItem("username");

    if (Storedusername) {
      setusername(JSON.parse(Storedusername).value);
    }
  }, []);
  return (
    <>
      <div className="background-container-loginPage">
        <form
          className="login-form"
          method="post"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSignin();
            }
          }}
        >
          <div
            className={`box${usernameError ? " error" : ""}`}
            title={"Username"}
          >
            <TextBox
              className="dx-field-value"
              placeholder="Enter username"
              width={"100%"}
              height={56}
              label="Username"
              showClearButton={true}
              valueChangeEvent="keyup"
              onValueChanged={handleUsernameChange}
              value={username ? username : ""}
            />
            {/* <div className="box-label" style={{ maxWidth: "150px" }}>
                  Username
                </div> */}
          </div>
          <div
            className={`box${passwordError ? " error" : ""}`}
            title={"Password"}
            // style={{ marginTop: "1rem" }}
          >
            <TextBox
              // style={{ marginTop: "40px" }}
              className="dx-field-value"
              placeholder="Enter Password"
              label="Password"
              width={"100%"}
              height={56}
              mode={passwordMode}
              valueChangeEvent="keyup"
              onValueChanged={handlePWDChange}
              value={password ? password : ""}
            >
              <TextBoxButton
                name="password"
                location="after"
                options={{
                  icon: `${showpwd ? eyeopen : eyeclose}`,
                  stylingMode: "text",
                  onClick: () => {
                    setshowpwd(!showpwd);
                    setPasswordMode((prevPasswordMode) =>
                      prevPasswordMode === "text" ? "password" : "text"
                    );
                  },
                }}
              />
            </TextBox>
          </div>
          <CheckBox
            text={"Remember me"}
            value={rememberMe}
            onValueChange={() => setrememberMe(!rememberMe)}
            enableThreeStateBehavior={false}
            className="remember-me"
          />
          <div className="btn-section">
            <Button
              // style={{ marginTop: "2rem" }}
              text="Sign in"
              type="default"
              width={"100%"}
              height={44}
              onClick={handleSignin}
              disabled={!loading ? false : true}
            />
          </div>
        </form>
      </div>
    </>
  );
}
