import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const UserProfilePage = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.id === 0) navigate("/prisijungimas");
  });

  return (
    <main>
      <p>User ID: {activeUser.id}</p>
      <p>User role: {activeUser.role}</p>
    </main>
  );
};
