import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { Oval } from 'react-loader-spinner';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem atualizada com sucesso', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem cadastrada com sucesso','sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem','erro');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" className="font-semibold">Título da Postagem</label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            className="border-2 border-[#2E140D] rounded-lg p-3 bg-[#F9F9F9]"
            value={postagem.titulo}
            onChange={(e) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="texto" className="font-semibold">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-[#2E140D] rounded-lg p-3 bg-[#F9F9F9]"
            value={postagem.texto}
            onChange={(e) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tema" className="font-semibold">Tema da Postagem</label>
          <select
            name="tema"
            id="tema"
            className="border-2 border-[#2E140D] rounded-lg p-3 bg-[#F5F5F5]"
            onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" disabled selected>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option key={tema.id} value={tema.id}>{tema.descricao}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-lg disabled:bg-gray-400 bg-[#917C78] hover:bg-[#92E3A9] hover:text-[#000000] text-white font-bold w-1/2 mx-auto py-3 flex justify-center"
          disabled={carregandoTema}
        >
          {isLoading ? (
            <Oval
              visible={true}
              height="24"
              width="24"
              color="white"
              ariaLabel="oval-loading"
            />
          ) : (
            <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;