import { useEffect } from "react"
import { Outlet } from "react-router"
import { useCreateSessionMutation } from "./api/session.api"
import Footer from "./components/common/Footer"
import Header from "./components/common/Header"

function App() {
    const [createSession] = useCreateSessionMutation();
    useEffect(() => {
      (async () => {
        const {data, error} = await createSession();
        console.log(data);
        console.log(error);
      })();
    },[])
    return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
