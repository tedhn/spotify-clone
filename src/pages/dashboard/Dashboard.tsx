import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "@/store";

const Dashboard = () => {
	const navigate = useNavigate();

	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch({ type: "logoutSaga" });
		navigate("/");
	};

	return (
		<div className='w-full col-span-10 bg-darkgrey'>
			<div className='p-8 text-lg font-bold'>
				Good Evening , {user.display_name}
			</div>
			<button onClick={logout}>Log out</button>
		</div>
	);
};

export default Dashboard;
