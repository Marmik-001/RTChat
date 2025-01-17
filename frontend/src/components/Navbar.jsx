import { Link, Links } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, signout } = useAuthStore();
  return (
    <div>
      <nav className="   p-4 flex justify-between">
        <div>
          <Link to="/">
          <h1 className="text-2xl font-bold">Logo</h1>
          </Link>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li className="px-4 py-2 rounded-md bg-red-500 border-2 border-white">
              <Link to="/settings">Settings</Link>
            </li>
            {authUser && (
              <ul className="flex flex-row">
              
                <li className="px-4 py-2 rounded-md bg-red-500 border-2 border-white">
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={signout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md border-2 border-white mx-2"
                  >
                    Signout
                  </button>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
