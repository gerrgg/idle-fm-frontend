import { useDispatch } from "react-redux";

export default function LogoutButton() {
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(logoutUser())}>Logout</button>;
}
