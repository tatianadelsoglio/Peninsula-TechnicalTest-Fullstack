import { Routes, Route } from "react-router-dom";
import { AccountPage } from "../components/pages/AccountPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountPage/>} />
    </Routes>
  );
};
