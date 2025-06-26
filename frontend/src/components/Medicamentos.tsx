import axios from 'axios';
import { Edit, Package, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalBase } from '../components/ModalBase'; // Ajuste o caminho se necessário

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalInclusaoAberto, setModalInclusaoAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] = useState<any>(null);

  const [inventory, setInventory] = useState([]);

  async function fetchMedicamentos() {
    try {
      const response = await fetch('http://localhost:5000/api/inventory');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  }

  const saveMedicamento = (medicamento: any) => {
    axios
      .post('http://localhost:5000/api/medicine', medicamento)
      .then(response => {
        console.log('Medicamento criado com sucesso:', response.data);
        fetchMedicamentos();
      })
      .catch(error => {
        console.error('Erro ao criar medicamento:', error);
      });

    console.log(medicamento);
  };

  const updateMedicamento = (medicamento: any) => {
    console.log('medicamento', medicamento);
    axios
      .put(`http://localhost:5000/api/medicine/${medicamento.id_medicamento}`, medicamento)
      .then(response => {
        console.log('Medicamento atualizado com sucesso:', response.data);
        setModalEdicaoAberto(false);
        fetchMedicamentos();
      })
      .catch(error => {
        console.error('Erro ao atualizar medicamento:', error);
      });
  };

  const deleteMedicamento = (id: number) => {
    console.log(medicamentoSelecionado);
    axios
      .delete(`http://localhost:5000/api/medicine/${id}`)
      .then(response => {
        console.log('Medicamento excluido com sucesso:', response.data);
        setModalExclusaoAberto(false);
        fetchMedicamentos();
      })
      .catch(error => {
        console.error('Erro ao excluir medicamento:', error);
      });
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  console.log(inventory);

  // const filteredMedicamentos = inventory.filter(
  //   med =>
  //     med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     med.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-foreground'>Medicamentos</h2>
        <button
          onClick={() => {
            setMedicamentoSelecionado(null);
            setModalInclusaoAberto(true);
          }}
          className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'
        >
          <Plus className='h-4 w-4' />
          Novo Medicamento
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <input
          type='text'
          placeholder='Pesquisar medicamentos...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        />
      </div>

      {/* Lista de Medicamentos */}
      <div className='bg-card rounded-lg border border-border overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-muted'>
              <tr>
                <th className='text-left p-4 text-muted-foreground'>Medicamento</th>
                <th className='text-left p-4 text-muted-foreground'>Lote</th>
                <th className='text-left p-4 text-muted-foreground'>Validade</th>
                <th className='text-left p-4 text-muted-foreground'>Quantidade</th>
                <th className='text-left p-4 text-muted-foreground'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {inventory
                .filter(
                  med =>
                    med.nome_medicamento &&
                    med.nome_medicamento.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(med => (
                  <tr key={med.id} className='border-b border-border hover:bg-muted/50'>
                    <td className='p-4'>
                      <div className='flex items-center gap-3'>
                        <Package className='h-5 w-5 text-primary' />
                        <span className='font-medium text-foreground'>{med.nome_medicamento}</span>
                      </div>
                    </td>
                    <td className='p-4 text-foreground'>{med.lote}</td>
                    <td className='p-4 text-foreground'>{med.data_validade}</td>
                    <td className='p-4'>
                      <div className='flex flex-col'>
                        <span
                          className={`font-medium ${
                            med.estoque <= 20 ? 'text-red-600' : 'text-foreground'
                          }`}
                        >
                          {med.quantidade}
                        </span>
                      </div>
                    </td>
                    <td className='p-4'>
                      <div className='flex gap-2'>
                        <button
                          className='p-2 text-primary hover:bg-primary/10 rounded'
                          onClick={() => {
                            setMedicamentoSelecionado(med);
                            setModalEdicaoAberto(true);
                          }}
                        >
                          <Edit className='h-4 w-4' />
                        </button>
                        <button
                          className='p-2 text-destructive hover:bg-destructive/10 rounded'
                          onClick={() => {
                            setMedicamentoSelecionado(med);
                            setModalExclusaoAberto(true);
                          }}
                        >
                          <Trash2 className='h-4 w-4' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Inclusão */}
      <ModalBase
        aberto={modalInclusaoAberto}
        aoFechar={() => setModalInclusaoAberto(false)}
        titulo='Novo Medicamento'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const medicamento = {
              nome: formData.get('nome'),
              data_validade: formData.get('validade'),
              quantidade: parseInt(formData.get('quantidade')),
              dosagem: formData.get('dosagem'),
              principio_ativo: formData.get('principio_ativo'),
              lote: formData.get('lote'),
              codigo_lote_chave_parcial: formData.get('chave_parcial'),
            };
            saveMedicamento(medicamento);
            setModalInclusaoAberto(false);
          }}
        >
          <input
            name='nome'
            className='w-full border p-2 mb-2 rounded'
            placeholder='Nome do medicamento'
          />
          <input
            name='validade'
            className='w-full border p-2 mb-2 rounded'
            placeholder='Data de validade'
          />
          <input
            name='quantidade'
            className='w-full border p-2 mb-2 rounded'
            placeholder='Quantidade'
          />
          <input name='dosagem' className='w-full border p-2 mb-2 rounded' placeholder='Dosagem' />
          <input
            name='principio_ativo'
            className='w-full border p-2 mb-2 rounded'
            placeholder='Principio ativo'
          />
          <input name='lote' className='w-full border p-2 mb-2 rounded' placeholder='Lote' />
          <input
            name='chave_parcial'
            className='w-full border p-2 mb-2 rounded'
            placeholder='Chave parcial'
          />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar
          </button>
        </form>
      </ModalBase>

      {/* Modal de Edição */}
      <ModalBase
        aberto={modalEdicaoAberto}
        aoFechar={() => setModalEdicaoAberto(false)}
        titulo='Editar Medicamento'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const medicamento = {
              id_medicamento: medicamentoSelecionado?.id_medicamento,
              nome: formData.get('nome'),
              data_validade: formData.get('validade'),
              quantidade: parseInt(formData.get('quantidade')),
              dosagem: formData.get('dosagem'),
              principio_ativo: formData.get('principio_ativo'),
              lote: formData.get('lote'),
              codigo_lote_chave_parcial: formData.get('chave_parcial'),
            };
            updateMedicamento(medicamento);
            setModalEdicaoAberto(false);
          }}
        >
          <label className='block text-sm font-medium'>Nome</label>
          <input
            name='nome'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.nome_medicamento}
          />
          <label className='block text-sm font-medium'>Validade</label>
          <input
            name='validade'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.data_validade}
          />
          <label className='block text-sm font-medium'>Quantidade</label>
          <input
            name='quantidade'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.quantidade}
          />
          <label className='block text-sm font-medium'>Dosagem</label>
          <input
            name='dosagem'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.dosagem}
          />
          <label className='block text-sm font-medium'>Principio ativo</label>
          <input
            name='principio_ativo'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.principio_ativo}
          />
          <label className='block text-sm font-medium'>Codigo</label>
          <input
            name='chave_parcial'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.codigo_lote_chave_parcial}
          />
          <label className='block text-sm font-medium'>Lote</label>
          <input
            name='lote'
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.lote}
          />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar Alterações
          </button>
        </form>
      </ModalBase>

      {/* Modal de Exclusão */}
      <ModalBase
        aberto={modalExclusaoAberto}
        aoFechar={() => setModalExclusaoAberto(false)}
        titulo='Excluir Medicamento'
      >
        <p className='mb-4'>
          Tem certeza que deseja excluir <strong>{medicamentoSelecionado?.nome_medicamento}</strong>
          ?
        </p>
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setModalExclusaoAberto(false)}
            className='px-4 py-2 rounded border'
          >
            Cancelar
          </button>
          <button
            onClick={() => deleteMedicamento(medicamentoSelecionado?.id_medicamento || 0)}
            className='px-4 py-2 rounded bg-destructive text-white'
          >
            Excluir
          </button>
        </div>
      </ModalBase>
    </div>
  );
};

export default Medicamentos;
