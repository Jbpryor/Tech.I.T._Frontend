import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "../src/App/store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { fetchUsers } from "./components/Users/userSlice.jsx";
// import { fetchIssues } from "./components/Issues/issueSlice.jsx";
// import { fetchProjects } from "./components/Projects/projectSlice.jsx";
// import { fetchReports } from "./components/Reports/reportSlice.jsx";

// store.dispatch(fetchUsers());
// store.dispatch(fetchIssues());
// store.dispatch(fetchProjects());
// store.dispatch(fetchReports());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
