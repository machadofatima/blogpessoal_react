import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

interface CardTemasProps{
    tema: Tema
}

function CardTemas( { tema }: CardTemasProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-[#2F2D2C] text-white font-bold text-2xl'>Tema</header>
    
        <p className='p-6 text-2xl bg-[#DED7D2] h-full'>{tema.descricao}</p>
    
        <div className="flex">
            <Link 
                to={`/editartema/${tema.id}`}
                className='w-full  text-white bg-[#917C78] hover:bg-[#92E3A9] hover:text-[#2F2D2C] 
                    flex items-center justify-center py-2'>
                <button className="text-inherit">Editar</button>
            </Link>
    
            <Link 
                to={`/deletartema/${tema.id}`}
                className='w-full bg-[#594A42] text-white hover:bg-[#de5959]  hover:text-white 
                    flex items-center justify-center'>
                <button className="text-inherit">Deletar</button>
            </Link>
        </div>
    </div>
    
    )
}

export default CardTemas