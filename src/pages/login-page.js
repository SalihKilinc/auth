import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";
import { loginFail, loginSuccess } from "../store/auth/auth-actions";

const API_BASE_URL = "https://carrental-v3-backend.herokuapp.com";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatchAuth } = useStore();
  const navigate = useNavigate();  // sayfalar arasinda gecisi sagliyor

  const handleLogin = async (e) => {   // backende baglandik burayla 
    e.preventDefault();
    const payload = { email, password };

    try {  // backend kismindan gelen datalar icin olusturduk
      setLoading(true);
      const respAuth = await axios.post(`${API_BASE_URL}/login`, payload);  // awit kullandigimiz icin async kullanmaliyiz hata almamak icin
      const token = respAuth.data.token;   //token aldik

      const authHeader = { Authorization: `Bearer ${token}` };  // kullanici girisinde tokeni usera verdik yoksa giremez
      const respUser = await axios.get(`${API_BASE_URL}/user`, {  //header ile kimlik gonderdik
        headers: authHeader,
      });

      //dispatchAuth({type: "LOGIN_SUCCESS", payload: respUser.data});
      dispatchAuth(loginSuccess(respUser.data));

      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
      dispatchAuth(loginFail());
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleLogin}> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading && <Spinner animation="border" size="sm" />} Login 
        </Button>
      </Form>
    </Container>
  ); // button ile iki defa tiklanmanin onune gecen formul yazdik ve loading yukledik
};

export default LoginPage;