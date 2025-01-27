import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Postagem from '../../../models/Postagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import { Oval } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';

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
      ToastAlerta('Você precisa estar logado','info');
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

      ToastAlerta('Postagem apagada com sucesso','successo');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      } else {
        ToastAlerta('Erro ao deletar a postagem.','erro');
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate('/postagens');
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Postagem</h1>
      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>
      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-[#917C78] text-white font-bold text-2xl">
          Postagem
        </header>
        <div className="p-8 text-3xl bg-slate-200 h-full">
          <p>{postagem.titulo}</p>
          <p>{postagem.texto}</p>
        </div>
        <div className="flex">
          <button
            className="w-full text-white bg-[#2E140D] font-roboto hover:bg-[#917C78] flex items-center justify-center py-2 rounded"
            onClick={retornar}>
            Não
          </button>
          <button
            className="text-white bg-[#917C78] hover:bg-[#de5959] w-full flex items-center justify-center py-2 rounded"
            onClick={deletarPostagem}>
            {isLoading ? (
              <Oval
                visible={true}
                height="24"
                width="24"
                color="white"
                ariaLabel="oval-loading"
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
