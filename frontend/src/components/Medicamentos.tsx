import { Edit, Package, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalBase } from '../components/ModalBase'; // Ajuste o caminho se necessário

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalInclusaoAberto, setModalInclusaoAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [medicamentoSelecionado, setMedicamentoSelecionado] =
    useState<any>(null);

  const [inventory, setInventory] = useState([]);

  // Dados mockados - você integrará com seu backend
  const medicamentos = [
    {
      id: 1,
      nome: 'Paracetamol 500mg',
      categoria: 'Analgésico',
      fabricante: 'EMS',
      lote: 'ABC123',
      validade: '2024-12-31',
      nome: 'Paracetamol 500mg',
      categoria: 'Analgésico',
      fabricante: 'EMS',
      lote: 'ABC123',
      validade: '2024-12-31',
      estoque: 150,
      estoqueMinimo: 50,
      preco: 0.45,
    },
    {
      id: 2,
      nome: 'Dipirona 500mg',
      categoria: 'Analgésico',
      fabricante: 'Medley',
      lote: 'DEF456',
      validade: '2024-10-15',
      estoque: 8,
      estoqueMinimo: 30,
      preco: 0.38,
    },
    {
      id: 3,
      nome: 'Amoxicilina 500mg',
      categoria: 'Antibiótico',
      fabricante: 'Sandoz',
      lote: 'GHI789',
      validade: '2025-03-20',
      estoque: 75,
      estoqueMinimo: 25,
      preco: 1.2,
    },
  ];

  useEffect(() => {
    async function fetchMedicamentos() {
      try {
        const response = await fetch('http://localhost:5000/api/inventory');
        const data = await response.json();

        // Agrupar e contar medicamentos por nome (ou outro campo)

        setInventory(data);
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error);
      }
    }

    fetchMedicamentos();
  }, []);

  console.log(inventory);

  const filteredMedicamentos = medicamentos.filter(
    med =>
      med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onSubmit={(e) => {
            e.preventDefault();
            setModalInclusaoAberto(false);
          }}
        >
          <input
            className='w-full border p-2 mb-2 rounded'
            placeholder='Nome do medicamento'
          />
          <input
            className='w-full border p-2 mb-2 rounded'
            placeholder='Data de validade'
          />
          <input
            className='w-full border p-2 mb-2 rounded'
            placeholder='Estoque'
          />
          <input
            className='w-full border p-2 mb-2 rounded'
            placeholder='Lote'
          />
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded'
          >
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
          onSubmit={(e) => {
            e.preventDefault();
            setModalEdicaoAberto(false);
          }}
        >
          <label className='block text-sm font-medium'>Nome</label>
          <input
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.nome}
          />
          <label className='block text-sm font-medium'>Validade</label>
          <input
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.validade}
          />
          <label className='block text-sm font-medium'>Estoque</label>
          <input
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.estoque}
          />
          <label className='block text-sm font-medium'>Lote</label>
          <input
            className='w-full border p-2 mb-2 rounded'
            defaultValue={medicamentoSelecionado?.lote}
          />
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded'
          >
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
          Tem certeza que deseja excluir{' '}
          <strong>{medicamentoSelecionado?.nome}</strong>?
        </p>
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setModalExclusaoAberto(false)}
            className='px-4 py-2 rounded border'
          >
            Cancelar
          </button>
          <button className='px-4 py-2 rounded bg-destructive text-white'>
            Excluir
          </button>
        </div>
      </ModalBase>
    </div>
  );
};

export default Medicamentos;
