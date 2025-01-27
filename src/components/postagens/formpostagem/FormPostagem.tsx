import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Tema from '../../../models/Tema';
import Postagem from '../../../models/Postagem';
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { Oval } from 'react-loader-spinner';

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
      alert('Você precisa estar logado');
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

        alert('Postagem atualizada com sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          alert('Erro ao atualizar a Postagemr');
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        alert('Postagem cadastrada com sucesso');
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          alert('Erro ao cadastrar a Postagem');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center font-quicksan">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da Postagem</label>
          <input
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-dark-blue rounded-2xl p-2"
            value={postagem.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-dark-blue rounded-2xl p-2"
            value={postagem.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Tema da Postagem</p>
          <select name="tema" id="tema" className="border p-2 border-dark-blue rounded-2xl bg-pink-100"
          onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <>
              <option value={tema.id}>{tema.descricao}</option>
            </>
            ))}
            
          </select>
        </div>
        <button
          type="submit"
          className="rounded-2xl disabled:bg-gray-blue bg-dark-blue hover:bg-gray-purple
                                        text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoTema}>
          {isLoading ? 
              <Oval
                  visible={true}
                  height="24"
                  width="24"
                  color="#fbcfe8"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                /> : 
              <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                      
          }
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;