import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastAlerts } from "../../utils/ToastAlerts";
import { AuthContext } from "../contexts/AuthContext";


function Navbar() {

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext)

  let component: ReactNode

  function logout() {
    handleLogout();
    ToastAlerts('O usuário foi desconectado com sucesso!', 'sucesso')
    navigate('/login')
  }

  if (usuario.token !== "") {
    component = (
      <div className='w-full bg-indigo-900 text-white flex justify-center p-5'>

        <div className="container flex justify-between text-lg">

          <Link to='/home' className="text-2xl font-bold hover:text-blue-300">Blog Pessoal</Link>

          <div className="flex gap-4">
            <Link to='/postagens' className="hover:text-blue-300">Postagens</Link>
            <Link to='/temas' className="hover:text-blue-300">Temas</Link>
            <Link to='/cadastroPostagem' className="hover:text-blue-300">Faça sua postagem</Link>
            <Link to='/cadastrartema' className="hover:text-blue-300">Cadastrar Tema</Link>
            <Link to='/perfil' className="hover:text-blue-300">Perfil</Link>
            <Link to='' className="">Login</Link>
            <Link to='' onClick={logout} className="hover:text-red-300">Sair</Link>
          </div>

        </div>

      </div>
    )
  }

  return (
    <>
      {component}
    </>

  )
}

export default Navbar