import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user");
      const users = await response.json();
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        navigate("/home");
        toast.success("Login successful!");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5"
  };

  const boxStyle = {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "900px",
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  };

  const formStyle = {
    padding: "20px",
    flex: "1 1 50%",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column"
  };

  const welcomeStyle = {
    flex: "1 1 50%",
    background: "linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%)",
    color: "white",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  const buttonStyle = {
    width: "100%",
    margin: "20px 0"
  };

  const footerStyle = {
    textAlign: "center",
    marginTop: "10px"
  };

  const linkStyle = {
    color: "#6e45e2",
    textDecoration: "none"
  };

  return (
    <Container fluid style={containerStyle}>
      <ToastContainer />
      <Box style={boxStyle}>
        <Box style={formStyle}>
          <Typography variant="h4" component="h1" gutterBottom>
            Hello!
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Sign in to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box style={footerStyle}>
              <div>
                <strong>Forgot password is temporarily disabled</strong>
              </div>
              <Box component="label">
                <input type="checkbox" name="remember" /> Remember me
              </Box>
              <Box component="a" href="#" style={linkStyle}>
                Forgot password?
              </Box>
            </Box>
            <Button type="submit" variant="primary" style={buttonStyle}>
              SIGN IN
            </Button>
          </form>
          <Box style={footerStyle}>
            Don't have an account? <a href="/register" style={linkStyle}>Create</a>
          </Box>
        </Box>
        <Box style={welcomeStyle}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1">
            Expense Tracker WebApp done using React JS <br /> Developed & Designed by Kevin Matthew Franklin
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
