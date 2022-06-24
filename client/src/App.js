import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import { check } from "./http/userAPI";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { Col, Spinner } from "react-bootstrap";

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Col className="d-flex justify-content-center align-items-center">
        <Spinner animation={"grow"}/> 
      </Col>
      )
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
      
  );
})

export default App;

