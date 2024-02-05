import { ChangeEvent, useContext, useEffect, useState } from "react";
import Tema from "../../models/Tema";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { ToastAlerts } from "../../utils/ToastAlerts";


function FormularioTema() {
  const [tema, setTema] = useState<Tema>({} as Tema);

  useEffect(() => {
    if (id !== undefined) {
      document.title = 'BlogPessoal - Editar tema';
    }
    document.title = 'BlogPessoal - Criar tema';
  }, []);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });

    console.log(JSON.stringify(tema));
  }

  async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      try {
        await atualizar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerts('Tema atualizado com sucesso', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerts('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          ToastAlerts('Erro ao atualizar o Tema', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/temas`, tema, setTema, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerts('Tema cadastrado com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerts('O token expirou, favor logar novamente', 'erro');
          handleLogout();
        } else {
          ToastAlerts('Erro ao cadastrado o Tema', 'erro');
        }
      }
    }

    retornar();
  }

  function retornar() {
    navigate('/temas');
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerts('Você precisa estar logado', 'erro');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="md:container flex flex-col items-center justify-center mx-auto mb-20">
      <h1 className="mt-16 mb-8 text-4xl text-center">
        {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
      </h1>

      <form className="flex flex-col md:w-1/2 w-11/12 gap-4" onSubmit={gerarNovoTema}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do tema</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="p-3 border-2 rounded-xl "
            value={tema.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="block w-1/2 py-3 mx-auto mt-5 bg-primary-400 rounded-xl text-slate-100 hover:bg-primary-800"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioTema;


