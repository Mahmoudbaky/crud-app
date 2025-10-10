import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  onAdd: () => void;
}

export default function Header({ query, setQuery, onAdd }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const user = localStorage.getItem("loggedInUser");
  return (
    <>
      {/* ! ******************** Header ******************** */}
      <div className="bg-white rounded-lg p-4 md:px-6 md:py-0 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <img src="/img/Vector (10).png" className="w-4" alt="" />
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-[#C4C4C4] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-left"
              />
            </div>

            <img src="/img/Vector.png" className="w-4" alt="" />
            {/* <Link to="/signup" className="px-4 py-2 border border-[#C4C4C4] rounded-lg text-gray-700 hover:bg-gray-50 text-sm">Sign In</Link> */}
            <Button
              onClick={handleLogout}
              className="px-4 py-2 border bg-white border-[#C4C4C4] rounded-lg text-red-500 hover:bg-gray-50 text-sm"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 md:px-6 md:py-2 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Students List
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex gap-3">
              <img
                src="/img/Vector (1).png"
                className="w-4 object-contain"
                alt=""
              />
              <Button
                onClick={onAdd}
                className="bg-[#FEAF00] hover:bg-yellow-500 text-white px-4 md:px-6 py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors flex-1 sm:flex-initial"
              >
                ADD STUDENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
