import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("ConfirmPassword:", confirmPassword);
    //Authenticate the use, or vasically create a new account using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("User>>>", user);
            toast.success("User Created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard"); //After succesfull sign up navigate user to the dashboard
            // Create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    //Make sure that the doc with the uid doesn't exist
    //Create a doc
    if (!user) return;

    const userRef = doc(db, "users",user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc created!");
        setLoading(false);
      } catch(e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("Doc already exists");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log("Email: ", email);
    console.log("Password: ", password);
    setLoading(true);
    //Sign in a user with an email address and password
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User logged in:", user);
          setLoading(false);
          // createDoc(user);
          navigate("/dashboard"); //After succesfull log in navigate user to the dashboard
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function googleAuth(){
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User>>>",user)
        createDoc(user);
        navigate("/dashboard")
        toast.success("User authenticated")
        setLoading(false);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        setLoading(false);
        
      });
    } catch(e) {
      toast.error(e.message)
      setLoading(false);
    }
   
  }

  return (
    <>
      {loginForm ? ( //Ternary operator
        //Log in Form
        <div className="signup-wrapper">
          <h2 className="title">
            Log in to{" "}
            <span style={{ color: "var(--black)", fontWeight: "bold" }}>
              WalletWise.
            </span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Log in Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">OR</p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Log in Using Google"}
              green={true}
            />
            <p className="p-login">
              Or Don't Have an Account Already?{" "}
              <span className="click" onClick={() => setLoginForm(!loginForm)}>
                Click Here
              </span>
            </p>
          </form>
        </div>
      ) : (
        //Sign Up Form
        <div className="signup-wrapper">
          <h2 className="title">
            Sign up on{" "}
            <span style={{ color: "var(--black)", fontWeight: "bold" }}>
              WalletWise.
            </span>
          </h2>
          <form>
            <Input
              type="text"
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login">OR</p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              green={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Have an Account Already?{" "}
              <span className="click" onClick={() => setLoginForm(!loginForm)}>
                Click Here
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
