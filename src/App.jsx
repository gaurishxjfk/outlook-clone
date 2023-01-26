import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { getEmailsListAsync } from "./features/emailSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmailsListAsync());
  }, []);
  return (
    <Routes>
      <Route exact path="/inbox" element={<Layout />} />
      <Route path="/inbox/mail/:id" element={<Layout />} />
      <Route path="*" element={<Navigate to="/inbox" replace />} />
    </Routes>
  );
}

export default App;
