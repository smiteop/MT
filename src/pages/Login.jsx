import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { ReactComponent as Facebook } from "../assets/icons8-facebook.svg";
import { ReactComponent as Google } from "../assets/icons8-google.svg";
import { ReactComponent as Linkedin } from "../assets/icons8-linkedin.svg";
import { ReactComponent as Twitter } from "../assets/icons8-twitter-bird.svg";
import { useNavigate } from "react-router-dom";
import icons from "../assets/icon.png";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const goToHome = () => {
    navigate("/home"); // Navigates to About page
  };
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .test(
        "is-valid",
        "Enter a valid Username, Mobile number, or Email",
        (value) =>
          !!value &&
          (/\S+@\S+\.\S+/.test(value) ||
            /^[0-9]{10}$/.test(value) ||
            /^[a-zA-Z0-9_]{3,}$/.test(value))
      )
      .required("Username, Mobile number, or Email is required"),

    pass: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .required("Password is required"),
  });

  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBlock: "6em",
        }}
      >
        <Col md={6}>
          <div className="mb-12 text-center">
            <h1 className="fw-bold mb-3">Sign In</h1>
            <p className="fs-16 lead">
              New user?{" "}
              <a href="/register" className="text-primary fw-bold">
                Create your account
              </a>
              .
            </p>
          </div>
          <Formik
            initialValues={{ mobile: "", pass: "", rememberMe: false }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
              console.log("Submitted values:", values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    className="input-fields"
                    type="text"
                    name="mobile"
                    placeholder="Username or Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.mobile}
                    isInvalid={touched.mobile && !!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    className="input-fields"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="pass"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.pass}
                    isInvalid={touched.pass && !!errors.pass}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pass}
                  </Form.Control.Feedback>
                  <span
                    className="btn btn-icon position-absolute translate-middle top-50"
                    style={{ right: "-1rem", cursor: "pointer" }}
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`fi ${
                        showPassword ? "fi-rr-eye-crossed" : "fi-rr-eye"
                      }`}
                    ></i>
                  </span>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check
                    className="checkboxclk-"
                    type="checkbox"
                    name="rememberMe"
                    label="Keep me signed in"
                    onChange={handleChange}
                    checked={values.rememberMe}
                  />
                </Form.Group>
                <div className="d-grid gap-2 my-4">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="sign-in-btn"
                    onClick={goToHome}
                  >
                    Sign In
                  </Button>
                </div>
                <div className="text-center">Or sign in with</div>
                <div className="button-group">
                  <Button className="socials">
                    <Facebook />
                  </Button>
                  <Button className="socials">
                    <Google />
                  </Button>
                  <Button className="socials">
                    <Twitter />
                  </Button>
                  <Button className="socials">
                    <Linkedin />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        <Col>
          <img src={icons} style={{ width: "300px", height: "499px" }} />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
