import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logoutUser())}>Logout</button>;
}
