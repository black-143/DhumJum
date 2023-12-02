import React, { useState } from "react";
import "./App.css";
import AdminDashBoard from "./components/admin-dashboard/admin-dashboard";
import SignIn from "./components/sign-in/sign-in";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [responseData, setResponseData] = useState();
  const handleAuthentication = (data) => {
    setAuthenticated(true);
    setResponseData(data);
  };

  return (
    <div className="App">
      {!authenticated ? (
        <SignIn onAuthentication={handleAuthentication} />
      ) : (
        <AdminDashBoard responseData={responseData} />
      )}
    </div>
  );
}

export default App;
