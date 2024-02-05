import { Link } from "react-router-dom"
import Postagem from "../../../models/Postagem"
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagens({ postagem }: CardPostagensProps) {

    function formatarData(data: string) {
        const dataLocal = new Date(data); // Cria um objeto Date com a data fornecida
        const dataLocalFormatada = format(dataLocal, "EEEE', 'd 'de' MMMM 'de' yyyy 'às' HH:mm:ss", { locale: ptBR }); // Formata a data local

        return dataLocalFormatada;
    }



    return (
        <>
            <div id="card" className="flex flex-col border-slate-800 border rounded overflow-hidden m-1">
                <div id="usuario" className="flex bg-indigo-400 text-white p-5 font-bold text-2xl">
                    <div className="pr-4">
                        {postagem.usuario?.foto ? (
                            <img src={postagem.usuario.foto} alt="Foto do usuário"/>
                        ) : (
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Foto do usuário não disponível"
                                className="w-10 h-10 rounded-full"
                            />
                        )}
                    </div>
                    <p>{postagem.usuario?.nome}</p>
                </div>

                <div id="postagem_dados" className="p-5">
                    <p className="font-bold text-lg">{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                    <p>{postagem.tema?.descricao}</p>
                    <p>Data de publicação: {formatarData(postagem.data)}</p>

                </div>

                <div id="botoes" className="flex">
                    <Link to={`/editarpostagem/${postagem.id}`}
                        className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                        <button>Editar</button>
                    </Link>

                    <Link to={`/deletarpostagem/${postagem.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center'>
                        <button>Deletar</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CardPostagens