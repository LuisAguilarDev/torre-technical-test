import gsap from "gsap";
import UserCard from "../components/UserCard";
import { useStore } from "../stores/useStore";
import { SplitText } from "gsap/all";
import IntroText from "../components/IntroText";
gsap.registerPlugin(SplitText);
const Home = () => {
  const usersArdaTorre = useStore((state) => state.usersArdaTorre);
  const searched = useStore((state) => state.searched);
  const total = usersArdaTorre.length;

  return (
    <div
      className={`max-w-[1080px] h-full mx-auto py-6 flex flex-col gap-4 items-center searched ${
        searched ? "" : "mt-40"
      }`}
    >
      {!searched ? (
        <div className="w-full flex flex-col gap-4 items-center justify-center mx-auto">
          <IntroText />
        </div>
      ) : (
        <div className="flex flex-col gap-4 px-4 w-full">
          {usersArdaTorre.length > 0 ? (
            <>
              <p>Coincidencias encontradas en Torre: {total} profesionales.</p>
              {usersArdaTorre.map((user) => {
                return <UserCard key={user.ardaId} user={user} />;
              })}
            </>
          ) : (
            "No encontramos resultados por ahora. ¿Probamos con otra búsqueda?"
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
