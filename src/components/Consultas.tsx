import { useState } from "react";
import { Plus, Search, Calendar, User, FileText } from "lucide-react";

const Consultas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados mockados - você integrará com seu backend
  const consultas = [
    {
      id: 1,
      paciente: "Maria Silva",
      medico: "Dr. João Santos",
      data: "2024-01-15",
      hora: "14:30",
      tipo: "Consulta Geral",
      status: "Finalizada",
      prescricoes: [
        { medicamento: "Paracetamol 500mg", quantidade: 20, posologia: "1 comp. 8/8h" },
        { medicamento: "Dipirona 500mg", quantidade: 10, posologia: "1 comp. se dor" }
      ]
    },
    {
      id: 2,
      paciente: "José Oliveira",
      medico: "Dra. Ana Costa",
      data: "2024-01-15",
      hora: "15:00",
      tipo: "Retorno",
      status: "Finalizada",
      prescricoes: [
        { medicamento: "Amoxicilina 500mg", quantidade: 21, posologia: "1 comp. 8/8h por 7 dias" }
      ]
    },
    {
      id: 3,
      paciente: "Ana Ferreira",
      medico: "Dr. Carlos Lima",
      data: "2024-01-16",
      hora: "09:00",
      tipo: "Consulta Geral",
      status: "Agendada",
      prescricoes: []
    }
  ];

  const filteredConsultas = consultas.filter(consulta =>
    consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consulta.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consulta.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Consultas</h2>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Nova Consulta
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pesquisar consultas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Lista de Consultas */}
      <div className="space-y-4">
        {filteredConsultas.map((consulta) => (
          <div key={consulta.id} className="bg-card p-6 rounded-lg border border-border">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">{consulta.paciente}</h3>
                  <p className="text-sm text-muted-foreground">{consulta.medico}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  {consulta.data} às {consulta.hora}
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  consulta.status === 'Finalizada' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {consulta.status}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Tipo: {consulta.tipo}</p>
            </div>

            {consulta.prescricoes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-foreground">Prescrições</h4>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  {consulta.prescricoes.map((prescricao, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium text-foreground">
                        {prescricao.medicamento}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        Qtd: {prescricao.quantidade} | {prescricao.posologia}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultas;