import { Link, useLocation } from "react-router";
import { useArdaTorre } from "../hooks/useArdaTorre";
import { useStore } from "../stores/useStore";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { getByName } = useArdaTorre();
  const setState = useStore((state) => state.setState);
  const location = useLocation();
  console.log(location);
  const onSearch = async (text: string) => {
    const data = await getByName(text);
    console.log({ data });
    setState({ usersArdaTorre: data, searched: true });
  };
  return (
    <nav className="h-14 w-full flex items-center px-4 justify-between">
      <Link to="/" className="p-4">
        <span className="text-text-primary text-2xl!">torre</span>
        <span className="text-brand text-2xl!">.ai</span>
      </Link>
      {location.pathname === "/" && <SearchBar onSearch={onSearch} />}
      <div className="flex gap-4">
        <Link
          to="/skill-gap"
          className="hover:text-brand font-semibold px-4 py-2 transition"
        >
          Skills Gap
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
