import {
  Plus,
  Search,
  User
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModalBase } from '../components/ModalBase';

const Consultas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalNovaAberto, setModalNovaAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  // const consultas = [
  //   {
  //     id: 1,
  //     paciente: 'Maria Silva',
  //     medico: 'Dr. João Santos',
  //     data: '2024-01-15',
  //     hora: '14:30',
  //     tipo: 'Consulta Geral',
  //     status: 'Finalizada',
  //     prescricoes: [
  //       {
  //         medicamento: 'Paracetamol 500mg',
  //         quantidade: 20,
  //         posologia: '1 comp. 8/8h',
  //       },
  //       {
  //         medicamento: 'Dipirona 500mg',
  //         quantidade: 10,
  //         posologia: '1 comp. se dor',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     paciente: 'José Oliveira',
  //     medico: 'Dra. Ana Costa',
  //     data: '2024-01-15',
  //     hora: '15:00',
  //     tipo: 'Retorno',
  //     status: 'Finalizada',
  //     prescricoes: [
  //       {
  //         medicamento: 'Amoxicilina 500mg',
  //         quantidade: 21,
  //         posologia: '1 comp. 8/8h por 7 dias',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     paciente: 'Ana Ferreira',
  //     medico: 'Dr. Carlos Lima',
  //     data: '2024-01-16',
  //     hora: '09:00',
  //     tipo: 'Consulta Geral',
  //     status: 'Agendada',
  //     prescricoes: [],
  //   },
  // ];
  const [consultas, setConsultas] = useState([]);
  
  // Dados mockados - você integrará com seu backend
  // const consultas = [
  //   {
  //     id: 1,
  //     paciente: "Maria Silva",
  //     medico: "Dr. João Santos",
  //     data: "2024-01-15",
  //     hora: "14:30",
  //     tipo: "Consulta Geral",
  //     status: "Finalizada",
  //     prescricoes: [
  //       { medicamento: "Paracetamol 500mg", quantidade: 20, posologia: "1 comp. 8/8h" },
  //       { medicamento: "Dipirona 500mg", quantidade: 10, posologia: "1 comp. se dor" }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     paciente: "José Oliveira",
  //     medico: "Dra. Ana Costa",
  //     data: "2024-01-15",
  //     hora: "15:00",
  //     tipo: "Retorno",
  //     status: "Finalizada",
  //     prescricoes: [
  //       { medicamento: "Amoxicilina 500mg", quantidade: 21, posologia: "1 comp. 8/8h por 7 dias" }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     paciente: "Ana Ferreira",
  //     medico: "Dr. Carlos Lima",
  //     data: "2024-01-16",
  //     hora: "09:00",
  //     tipo: "Consulta Geral",
  //     status: "Agendada",
  //     prescricoes: []
  //   }
  // ];

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const response = await fetch("http://localhost:5000/api/meeting");
        const data = await response.json();

        // Agrupar e contar medicamentos por nome (ou outro campo)

        setConsultas(data);
      } catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
      }
    }

    fetchConsultas();
  }, []);

  console.log(consultas);

  const filteredConsultas = consultas.filter(consulta =>
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
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        />
      </div>

      <div className='space-y-4'>
        {filteredConsultas.map((consulta) => (
          <div
            key={consulta.id}
            className='bg-card p-6 rounded-lg border border-border'
          >
            <div className='flex justify-between items-start mb-4'>
              <div className='flex items-center gap-3'>
                <User className='h-5 w-5 text-primary' />
                <div>
                  <h3 className="font-semibold text-foreground">{consulta.nome_paciente}</h3>
                  <p className="text-sm text-muted-foreground">{consulta.nome_medico}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Tipo: {consulta.medico_especialidade} </p>
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
          onSubmit={(e) => {
            e.preventDefault();
            setModalNovaAberto(false);
          }}
          className='space-y-2'
        >
          <input
            className='w-full border p-2 rounded'
            placeholder='Nome do paciente'
          />
          <input
            className='w-full border p-2 rounded'
            placeholder='Nome do médico'
          />
          <input
            className='w-full border p-2 rounded'
            placeholder='Data (AAAA-MM-DD)'
          />
          <input
            className='w-full border p-2 rounded'
            placeholder='Hora (HH:MM)'
          />
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded'
          >
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
          onSubmit={(e) => {
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
          <input
            className='w-full border p-2 rounded'
            defaultValue={consultaSelecionada?.medico}
          />
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
          <button
            type='submit'
            className='bg-primary text-white px-4 py-2 rounded'
          >
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
          <button
            onClick={() => setModalExcluirAberto(false)}
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

export default Consultas;
