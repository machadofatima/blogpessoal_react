import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {

    console.log('Dados da postagem:', postagem);

    return (
        <div className='font-instrument-sans border-[#2E140D] border 
            flex flex-col rounded overflow-hidden justify-between mb-0'>

            <div>
                <div className="flex w-full bg-[#92E3A9] py-2 px-4 items-center gap-4">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={postagem.usuario?.nome} />
                    <h3 className='font-instrument-sans text-lg font-bold text-white text-center'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4'>
                    <h4 className='font-instrument-sans text-lg font-semibold text-[#2E140D] uppercase'>{postagem.titulo}</h4>
                    <p className='text-[#2E140D]'>{postagem.texto}</p> 
                    <p className='text-[#2E140D]'>Tema: {postagem.tema?.descricao}</p>
                    <p className='text-[#2E140D]'>
                        Data: {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'full',
                            timeStyle: 'medium',
                        }).format(new Date(postagem.data))}
                    </p>
                </div>
            </div>
            <div className="flex gap-4">
                <Link to={`/editarpostagem/${postagem.id}`}
                    className='w-full text-white bg-[#2E140D] font-roboto
                    hover:bg-[#917C78] flex items-center justify-center py-2 rounded'>
                    <button className="text-white">Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`} 
                    className='text-white bg-[#917C78] 
                    hover:bg-[#de5959] w-full flex items-center justify-center py-2 rounded'>
                    <button className="text-white">Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem
