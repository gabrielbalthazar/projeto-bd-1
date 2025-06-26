import axios from 'axios';
import { AlertTriangle, Package, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalBase } from '../components/ModalBase';

const Dashboard = () => {
  // Dados mockados - você integrará com seu backend
  const stats = {
    totalMedicamentos: 156,
    entradas: 45,
    saidas: 32,
    estoqueMinimo: 8,
  };

  const medicamentosEstoqueMinimo = [
    { nome: 'Paracetamol 500mg', estoque: 12, minimo: 50 },
    { nome: 'Dipirona 500mg', estoque: 8, minimo: 30 },
    { nome: 'Amoxicilina 500mg', estoque: 5, minimo: 25 },
  ];

  const [inventory, setInventory] = useState([]);
  const [novoMedicoModalAberto, setModalNovoMedicoAberto] = useState(false);
  const [novoPacienteModalAberto, setModalNovoPacienteAberto] = useState(false);

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

  const saveDoctor = (doctor: any) => {
    axios
      .post('http://localhost:5000/api/doctors', doctor)
      .then(response => {
        console.log('Doctor criado com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar doctor:', error);
      });

    console.log(doctor);
  };

    const savePaciente = (pacientes: any) => {
    axios
      .post('http://localhost:5000/api/patients', pacientes)
      .then(response => {
        console.log('Paciente criado com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao criar pacientes:', error);
      });

    console.log(pacientes);
  };

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  console.log(inventory);

  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-foreground'>Dashboard</h2>

      {/* Cards de Estatísticas */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-card p-6 rounded-lg border border-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-sm'>Total de Medicamentos</p>
              <p className='text-3xl font-bold text-foreground'>
                {inventory.reduce((total, item) => total + item.quantidade, 0)}
              </p>
            </div>
            <Package className='h-8 w-8 text-primary' />
          </div>
        </div>

        {/* <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Entradas (Mês)</p>
              <p className="text-3xl font-bold text-green-600">{stats.entradas}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Saídas (Mês)</p>
              <p className="text-3xl font-bold text-red-600">{stats.saidas}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
        </div> */}

        <div className='bg-card p-6 rounded-lg border border-border'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-muted-foreground text-sm'>Estoque Mínimo</p>
              <p className='text-3xl font-bold text-orange-600'>20</p>
            </div>
            <AlertTriangle className='h-8 w-8 text-orange-600' />
          </div>
        </div>
      </div>

      {/* Alertas de Estoque Mínimo */}
      <div className='bg-card p-6 rounded-lg border border-border'>
        <div className='flex items-center gap-2 mb-4'>
          <AlertTriangle className='h-5 w-5 text-orange-600' />
          <h3 className='text-xl font-semibold text-foreground'>Alertas de Estoque Mínimo</h3>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-border'>
                <th className='text-left p-2 text-muted-foreground'>Medicamento</th>
                <th className='text-left p-2 text-muted-foreground'>Estoque Atual</th>
                <th className='text-left p-2 text-muted-foreground'>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((med, index) => (
                <tr key={index} className='border-b border-border'>
                  <td className='p-2 text-foreground'>{med.nome_medicamento}</td>
                  <td className='p-2 text-foreground'>{med.quantidade}</td>
                  <td className='p-2'>
                    {med.quantidade <= 20 ? (
                      <span className='px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'>
                        Crítico
                      </span>
                    ) : (
                      <span className='px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'>
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => setModalNovoMedicoAberto(true)}
        className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'
      >
        <Plus className='h-4 w-4' /> Novo Médico
      </button>
      <button
        onClick={() => setModalNovoPacienteAberto(true)}
        className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'
      >
        <Plus className='h-4 w-4' /> Novo Paciente
      </button>

      <ModalBase
        aberto={novoMedicoModalAberto}
        aoFechar={() => setModalNovoMedicoAberto(false)}
        titulo='Nova Consulta'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const doctor = {
              nome: formData.get('nome'),
              crm: formData.get('crm'),
              especialidade: formData.get('especialidade'),
            };
            saveDoctor(doctor);
            setModalNovoMedicoAberto(false);
          }}
          className='space-y-2'
        >
          <input name='nome' className='w-full border p-2 rounded' placeholder='Nome do médico' />
          <input name='crm' className='w-full border p-2 rounded' placeholder='CRM' />
          <input name='especialidade' className='w-full border p-2 rounded' placeholder='especialidade' />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar
          </button>
        </form>
      </ModalBase>
      <ModalBase
        aberto={novoPacienteModalAberto}
        aoFechar={() => setModalNovoPacienteAberto(false)}
        titulo='Nova Consulta'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const paciente = {
              nome: formData.get('nome'),
              cartao_sus: formData.get('cartao_sus'),
            };
            savePaciente(paciente);
            setModalNovoPacienteAberto(false);
          }}
          className='space-y-2'
        >
          <input name='nome' className='w-full border p-2 rounded' placeholder='Nome do Paciente' />
          <input name='cartao_sus' className='w-full border p-2 rounded' placeholder='Cartão SUS' />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar
          </button>
        </form>
      </ModalBase>
    </div>
  );
};

export default Dashboard;
