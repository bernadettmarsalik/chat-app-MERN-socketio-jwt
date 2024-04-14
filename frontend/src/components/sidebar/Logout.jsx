import { CiLogout } from "react-icons/ci";
import useLogout from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto tooltip" data-tip="Log Out">
      <button type="button" className="btn btn-circle">
        {!loading ? (
          <CiLogout className=" cursor-pointer w-6 h-6" onClick={logout} />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </button>
    </div>
  );
};

export default Logout;
