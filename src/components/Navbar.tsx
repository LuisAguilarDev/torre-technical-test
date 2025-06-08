import { useArdaTorre } from "../hooks/useArdaTorre";
import { useStore } from "../stores/useStore";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { getByName } = useArdaTorre();
  const setState = useStore((state) => state.setState);

  const onSearch = async (text: string) => {
    setState({ usersArdaTorre: await getByName(text) });
  };
  return (
    <nav className="h-14 w-full flex items-center px-4">
      <div className="p-4">
        <span className="text-text-primary text-2xl!">torre</span>
        <span className="text-brand text-2xl!">.ai</span>
      </div>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Navbar;
