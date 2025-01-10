import { useEffect, useState } from "react";
import { apiDeleteUser, apiGetAllUsers } from "../api/users";
import { TiDelete } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";

interface IUser {
  id: string;
  first_name: string;
  email: string;
  role: string;
}

export const AdminPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    const allUsers = await apiGetAllUsers();
    setUsers(allUsers);
  };

  const deleteUser = async (id: string) => {
    const res = await apiDeleteUser(id);
    setUsers([...users.filter((user) => user.id !== id)]);
  };

  return (
    <main>
      <h1 className="shadow-text text-3xl text-center my-5">Naudotojai</h1>
      <section>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Vardas</th>
              <th>El. paštas</th>
              <th>Vaidmuo</th>
              <th>Veiksmas</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <p
                    onClick={() => deleteUser(user.id)}
                    className="p-2 cursor-pointer flex gap-2 items-center"
                  >
                    Ištrinti <TiDelete className="text-rose-500" size={20} />
                  </p>
                  <p className="p-2 cursor-pointer flex gap-2 items-center">
                    Redaguoti{" "}
                    <FaUserEdit className="text-emerald-500" size={20} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};
