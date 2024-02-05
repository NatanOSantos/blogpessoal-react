import { useContext, useEffect, useState } from "react";
import Tema from "../../models/Tema";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { buscar } from "../../services/Service";
import CardTemas from "./CardTemas";
import { TailSpin } from "react-loader-spinner";
import { ToastAlerts } from "../../utils/ToastAlerts";


function ListaTemas() {
  useEffect(() => {
    document.title = 'blog-Pessoal - Temas';
  }, []);

  const [temas, setTemas] = useState<Tema[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerts('O token expirou, favor logar novamente', 'info');
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerts('Você precisa estar logado', 'erro');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [temas.length]);
  return (
    <>
      {temas.length === 0 && (
        <div className="flex items-center justify-center w-full h-screen">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#FF0000"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {temas.map((tema) => (
              <>
                <CardTemas tema={tema} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaTemas;

