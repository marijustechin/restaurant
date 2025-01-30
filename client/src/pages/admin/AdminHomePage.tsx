import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router";

export const AdminHomePage = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.role !== "ADMIN") {
      navigate("/");
    }
  });

  return (
    <main>
      <h1>Admino page cia bus</h1>
    </main>
  );
};
