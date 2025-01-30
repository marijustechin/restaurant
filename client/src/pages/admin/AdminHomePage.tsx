import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import { PageTitle } from '../../components/PageTitle';

export const AdminHomePage = () => {
  const activeUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser.role !== 'ADMIN') {
      navigate('/');
    }
  });

  return (
    <div>
      <PageTitle>Suvestinė</PageTitle>
      <div>
        <div>Box1</div>
        <div>Box1</div>
        <div>Box1</div>
        <div>Box1</div>
        <div>Box1</div>
        <div>Box1</div>
        <div>Box1</div>
      </div>
    </div>
  );
};
