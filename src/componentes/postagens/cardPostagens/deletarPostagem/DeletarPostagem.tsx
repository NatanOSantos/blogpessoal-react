import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import { RotatingLines } from "react-loader-spinner";
import Postagem from "../../../../models/Postagem";
import { buscar, deletar } from "../../../../services/Service";
import { ToastAlerts } from "../../../../utils/ToastAlerts";


function DeletarPostagem() {

  const navigate = useNavigate();

  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerts('O token Expirou!', '')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerts('Você precisa estar logado!', '')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/postagens")
  }

  async function DeletarPostagem() {

    setIsLoading(true)

    try {
      await deletar(`/postagens/${id}`, {
        headers: { 'Authorization': token }
      })
      ToastAlerts('A Postagem foi excluída com sucesso!', 'sucesso')
      retornar()
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerts('O Token Expirou!', '')
        handleLogout();
      } else {
        ToastAlerts('Erro ao excluir a postagem.', 'erro')
      }

    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar postagem</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a postagem a seguir?</p>
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Postagem
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{postagem.titulo}</p>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                                   onClick={DeletarPostagem}>
                         {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Sim</span>
                        
                    }
                    </button>
                </div>
            </div>
        </div>
  )
}

export default DeletarPostagem