import { PageTitle } from '../../components/PageTitle';

export const MenusPage = () => {
  return (
    <main>
      <PageTitle>Patiekalai</PageTitle>
      <div className="flex gap-3">
        <button className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300">
          + Pridėti patiekalą
        </button>
        <button className="border border-slate-300 bg-slate-200 rounded-lg py-1 px-2 hover:bg-slate-300">
          + Pridėti kategoriją
        </button>
      </div>
    </main>
  );
};
