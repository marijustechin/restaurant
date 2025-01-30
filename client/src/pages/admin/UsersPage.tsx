import { useEffect, useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import UserService from '../../services/UserService';
import { IUser } from '../../types/User';

export const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await UserService.getAllUsers();
    setUsers(res.data);
  };

  const handleDeleteUser = (id: string) => {
    console.log('user delete id: ', id);
  };

  return (
    <div>
      <PageTitle>Naudotojai</PageTitle>

      <div className="relative overflow-x-auto p-3">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Vardas
              </th>
              <th scope="col" className="px-6 py-3">
                El. paštas
              </th>
              <th scope="col" className="px-6 py-3">
                Adresas
              </th>
              <th scope="col" className="px-6 py-3">
                Telefonas
              </th>
              <th scope="col" className="px-6 py-3">
                Vaidmuo
              </th>
              <th scope="col" className="px-6 py-3">
                Veiksmai
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.email}
                className="border-b border-slate-300 last:border-none"
              >
                <td scope="col" className="px-6 py-4">
                  {user.id}
                </td>
                <td scope="col" className="px-6 py-4">
                  {user.first_name}
                </td>
                <td scope="col" className="px-6 py-4">
                  {user.email}
                </td>
                <td scope="col" className="px-6 py-4">
                  {user.address}
                </td>
                <td scope="col" className="px-6 py-4">
                  {user.phone_number}
                </td>
                <td scope="col" className="px-6 py-4">
                  {user.role}
                </td>
                <td scope="col" className="px-6 py-4">
                  <div
                    onClick={() => handleDeleteUser(user.id)}
                    className="cursor-pointer p-2"
                  >
                    ❌ Ištrinti
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
