import axios from 'axios';
import { Plus, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalBase } from '../components/ModalBase';

const Consultas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalNovaAberto, setModalNovaAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [pacientes, setPacientes] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [inventory, setInventory] = useState([]);

  async function fetchDoctors() {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  }

  async function fetchPacientes() {
    try {
      const response = await fetch('http://localhost:5000/api/patients');
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  }

  async function fetchConsultas() {
    try {
      const response = await fetch('http://localhost:5000/api/meeting');
      const data = await response.json();

      // Agrupar e contar medicamentos por nome (ou outro campo)

      setConsultas(data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  }

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

  const saveConsulta = (consulta: any) => {
    const { id_medicamento } = consulta;
    const medicamento = inventory.find(item => item.id_medicamento == id_medicamento);
    const lote = medicamento.lote;

    consulta = { ...consulta, lote };

    console.log('consulta', consulta);

    axios
      .post('http://localhost:5000/api/meeting', consulta)
      .then(response => {
        console.log('Consulta criada com sucesso:', response.data);
        fetchConsultas();
      })
      .catch(error => {
        console.error('Erro ao criar consulta:', error);
        alert('Erro ao criar consulta - Verifique o Estoque');
      });

    console.log(consulta);
  }


  useEffect(() => {
    fetchConsultas();
    fetchDoctors();
    fetchPacientes();
    fetchMedicamentos();
    console.log('inventory', inventory);
  }, []);

  console.log(doctors);
  console.log(pacientes);

  const filteredConsultas = consultas.filter(
    consulta =>
      consulta.nome_paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.npome_medico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl font-bold text-foreground'>Consultas</h2>
        <button
          onClick={() => setModalNovaAberto(true)}
          className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors'
        >
          <Plus className='h-4 w-4' /> Nova Consulta
        </button>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <input
          type='text'
          placeholder='Pesquisar consultas...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        />
      </div>

      <div className='space-y-4'>
        {filteredConsultas.map(consulta => (
          <div key={consulta.id} className='bg-card p-6 rounded-lg border border-border'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex items-center gap-3'>
                <User className='h-5 w-5 text-primary' />
                <div>
                  <h3 className='font-semibold text-foreground'>{consulta.nome_paciente}</h3>
                  <p className='text-sm text-muted-foreground'>{consulta.nome_medico}</p>
                </div>
              </div>
            </div>

            <div className='mb-4'>
              <p className='text-sm text-muted-foreground'>
                Tipo: {consulta.medico_especialidade}{' '}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ModalBase
        aberto={modalNovaAberto}
        aoFechar={() => setModalNovaAberto(false)}
        titulo='Nova Consulta'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const info = {
              id_paciente: formData.get('id_paciente'),
              id_medico: formData.get('id_medico'),
              id_medicamento: formData.get('id_medicamento'),
              quantidade: formData.get('quantidade'),
            };
            saveConsulta(info);
            setModalNovaAberto(false);
          }}
          className='space-y-2'
        >
          <label>Paciente</label>
          <select name='id_paciente' className='w-full border p-2 rounded'>
            <option value=''>Selecione um paciente</option>
            {pacientes?.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <label>Médico</label>
          <select name='id_medico' className='w-full border p-2 rounded'>
            <option value=''>Selecione um médico</option>
            {doctors.map(m => (
              <option key={m.id} value={m.id}>
                {m.nome}
              </option>
            ))}
          </select>
          <label>Medicamento</label>
          <select name='id_medicamento' className='w-full border p-2 rounded'>
            <option value=''>Selecione um medicamento</option>
            {inventory.map(m => (
              <option key={m.id} value={m.id_medicamento}>
                {m.nome_medicamento}
              </option>
            ))}
          </select>
          <label>Quantidade</label>
          <input
            className='w-full border p-2 rounded'
            type='number'
            name='quantidade'
            placeholder='Quantidade'
          />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar
          </button>
        </form>
      </ModalBase>

      <ModalBase
        aberto={modalEditarAberto}
        aoFechar={() => setModalEditarAberto(false)}
        titulo='Editar Consulta'
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            setModalEditarAberto(false);
          }}
          className='space-y-2'
        >
          <label className='block text-sm font-medium'>Paciente</label>
          <input
            className='w-full border p-2 rounded'
            defaultValue={consultaSelecionada?.paciente}
          />
          <label className='block text-sm font-medium'>Médico</label>
          <input className='w-full border p-2 rounded' defaultValue={consultaSelecionada?.medico} />
          <label className='block text-sm font-medium'>Data</label>
          <input
            className='w-full border p-2 rounded'
            defaultValue={consultaSelecionada?.data}
            type='date'
          />
          <label className='block text-sm font-medium'>Hora</label>
          <input
            className='w-full border p-2 rounded'
            defaultValue={consultaSelecionada?.hora}
            type='time'
          />
          <button type='submit' className='bg-primary text-white px-4 py-2 rounded'>
            Salvar Alterações
          </button>
        </form>
      </ModalBase>

      <ModalBase
        aberto={modalExcluirAberto}
        aoFechar={() => setModalExcluirAberto(false)}
        titulo='Excluir Consulta'
      >
        <p className='mb-4'>
          Tem certeza que deseja excluir a consulta de{' '}
          <strong>{consultaSelecionada?.paciente}</strong>?
        </p>
        <div className='flex justify-end gap-2'>
          <button onClick={() => setModalExcluirAberto(false)} className='px-4 py-2 rounded border'>
            Cancelar
          </button>
          <button className='px-4 py-2 rounded bg-destructive text-white'>Excluir</button>
        </div>
      </ModalBase>
    </div>
  );
};

export default Consultas;
