import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Postagem from '../../../models/Postagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import { Oval } from 'react-loader-spinner';

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert('Postagem apagada com sucesso');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      } else {
        alert('Erro ao deletar a postagem.');
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate('/postagens');
  }

  return (
    <div className="container w-1/3 mx-auto font-quicksand">
      <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-dark-blue text-light-pink font-semibold text-2xl">Postagem</header>
        <div className="p-4">
          <p className="text-xl h-full">{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className="text-dark-blue bg-light-pink hover:bg-pink-purple w-full py-2"
            onClick={retornar}>
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-dark-blue hover:bg-gray-blue flex items-center justify-center"
            onClick={deletarPostagem}>
            {isLoading ? (
              <Oval
                visible={true}
                height="24"
                width="24"
                color="#fbcfe8"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;