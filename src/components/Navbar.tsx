import { useArdaTorre } from "../hooks/useArdaTorre";
import { useStore } from "../stores/useStore";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { getByName } = useArdaTorre();
  const setState = useStore((state) => state.setState);

  const onSearch = async (text: string) => {
    setState({ usersArdaTorre: await getByName(text), searched: true });
  };
  return (
    <nav className="h-14 w-full flex items-center px-4">
      <div className="p-4">
        <span className="text-text-primary text-2xl!">torre</span>
        <span className="text-brand text-2xl!">.ai</span>
      </div>
      <SearchBar onSearch={onSearch} />
      <div className="flex gap-4">
        <button className="hover:text-brand font-semibold px-4 py-2 transition">
          Career Path
        </button>
        <button className="hover:text-brand font-semibold px-4 py-2 transition">
          Skills Gap
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
