import { UserEditForm } from "../components/UserEditForm";

export const UserProfilePage = () => {
  return (
    <div className="mx-auto">
      <div className="flex">
        <div>Užsakymai</div>
        <div>
          <UserEditForm />
        </div>
      </div>
    </div>
  );
};
