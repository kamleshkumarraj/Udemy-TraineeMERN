import { useEffect } from "react";
import { Outlet } from "react-router";
import { useCreateSessionMutation } from "./api/session.api";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { useGetProfileQuery } from "./api/userProfile.api";
import { useDispatch } from "react-redux";
import { setLogin } from "./store/slice/auth.slice";

function App() {
  const [createSession] = useCreateSessionMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { data, error } = await createSession();
      console.log(data);
      console.log(error);
    })();
  }, []);

  const { data, error } = useGetProfileQuery();
  useEffect(() => {
    dispatch(
      setLogin({
        isAuthenticated: true,
        role: "user",
      })
    );
  }, [data]);
  console.log(error)
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
