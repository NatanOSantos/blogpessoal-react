import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Usuario from "../../models/Usuario"
import { useNavigate } from "react-router-dom"
import { cadastrarUsuario } from "../../services/Service"
import { ToastAlerts } from "../../utils/ToastAlerts"
import { RotatingLines } from "react-loader-spinner"


function Cadastro() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar()
    }
  }, [usuario])

  function retornar() {
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
    console.log(usuario)
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      setIsLoading(true)

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
        ToastAlerts('Usuário cadastrado com sucesso!', 'sucesso')
      } catch (error) {
        ToastAlerts('Erro ao cadastrar usuário.', 'erro')
      }
    } else {
      ToastAlerts('Dados estão incosistentes. Verifique as informações do cadastro', 'info')
      setUsuario({ ...usuario, senha: '' })
      setConfirmaSenha('')
    }
    setIsLoading(false)
  }

  return (
    <div className="grid text-white bg-gray-700 lg:grid-cols-2 place-items-center h-screen font-semibold grid-cols-1">
      <div className="fundoLogin hidden lg:block">

      </div>
      <form className="flex flex-col items-center justify-center gap-4 w-2/3" onSubmit={cadastrarNovoUsuario}>
        <h1 className="text-5xl">Cadastrar</h1>

        <div className="flex flex-col w-full">
          <label>Nome</label>
          <input id="nome" name="nome" className="border-2 border-solid p-1 text-black hover:border-gray-400" placeholder="Nome" type="text"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col w-full">
          <label>Usuário</label>
          <input id="usuario" name="usuario" className="border-2 border-solid p-1 text-black hover:border-gray-400" placeholder="Usuário" type="text"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col w-full">
          <label>Foto</label>
          <input id="foto" name="foto" className="border-2 border-solid p-1 text-black hover:border-gray-400" placeholder="Foto" type="text"
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col w-full">
          <label>Senha</label>
          <input id="senha" name="senha" className="border-2 border-solid p-1 text-black hover:border-gray-400" placeholder="Senha" type="password"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} />
        </div>

        <div className="flex flex-col w-full">
          <label>Confirmar Senha</label>
          <input id="confirmarSenha" name="confirmarSenha" className="border-2 border-solid p-1 text-black hover:border-gray-400" placeholder="Confirmar Senha" type="password"
            value={confirmaSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)} />
        </div>

        <div className="grid grid-cols-2 gap-10 w-full text-lg">
          <button className="rounded text-white border-white border-solid border-2 px-4 py-2 hover:bg-slate-900" onClick={retornar}>Cancelar</button>
          <button type="submit" className="flex justify-center rounded text-slate-900 bg-white border-white border-solid border-2 px-4 py-2 hover:bg-slate-900  hover:text-white">
            {isLoading ? <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
              <span>Cadastrar</span>
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro