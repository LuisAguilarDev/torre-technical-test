import UserCard from "../components/UserCard";
import { useStore } from "../stores/useStore";

const Home = () => {
  const usersArdaTorre = useStore((state) => state.usersArdaTorre);
  const total = usersArdaTorre.length;
  return (
    <div className="max-w-[1080px] mx-auto py-6">
      <div className="flex flex-col gap-4">
        {usersArdaTorre.length > 0 ? (
          <>
            <p>
              Ususarios Encontrados: Mostrando resultados 1 - {total} de
              aproximadamente {total}
            </p>
            {usersArdaTorre.map((user) => {
              return <UserCard key={user.ardaId} user={user} />;
            })}
          </>
        ) : (
          "No se encontraron usuarios"
        )}
      </div>
    </div>
  );
};
export default Home;
