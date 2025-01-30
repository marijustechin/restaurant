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
    <main className="max-w-md mx-auto">
      <p>Naudotojo ID: {activeUser.id}</p>
      <p>Vardas: {activeUser.first_name}</p>
      <p>El. paštas: {activeUser.email}</p>
      <p>Vaidmuo: {activeUser.role}</p>
      <p>Adresas: {activeUser.address}</p>
      <p>Tel. Nr.: {activeUser.phone_number}</p>
    </main>
  );
};
