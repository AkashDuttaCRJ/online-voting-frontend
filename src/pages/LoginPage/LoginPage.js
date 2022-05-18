// ## Add Everything related to Login Page here ##

// ## This is not required anymore in newer versions of React ##
import React, { useState } from "react";
import "./LoginPage.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from 'react-bootstrap';

const LoginPage = () => {
    const [addclass, setaddclass] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true)
    };
        return (
        <>
        
            <div  className={`containers ${addclass}`} id="container">
            <div className="form-container  sign-up-container">
                <form>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Enter Your VoterID" />
                    <input type="text" placeholder="FULL NAME" />
                    <input type="text" placeholder="ADDRESS" />
                    <input type="number" placeholder="MOBILE NO" />
                    <button className="btn_log" type="submit">REGISTER</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Login</h1>
                    {/* <input type="email" placeholder="EMAIL" /> */}
                    <input type="tel" placeholder="MOBILE NO" />
                    <button className="btn_log" variant="primary" onClick={handleShow} type="submit">LOGIN</button>

                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <button
                            className="btn"
                            id="signIn" onClick={() => setaddclass("")}
                        >
                            GO TO LOGIN
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <button
                            className="btn"
                            id="signUp" onClick={() => setaddclass("right-panel-active")}
                        >
                            GO TO REGISTER
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="text-success fw-bold">Check your phone, <br/>we have send OTP to your number</p>
            <input type="text" className="form-control"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </>
        </>
    )

}

export default LoginPage;