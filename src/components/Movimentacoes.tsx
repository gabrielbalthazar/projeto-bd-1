import { useState } from "react";
import { Search, ArrowUp, ArrowDown, Package, Calendar } from "lucide-react";

const Movimentacoes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  
  // Dados mockados - você integrará com seu backend
  const movimentacoes = [
    {
      id: 1,
      tipo: "entrada",
      medicamento: "Paracetamol 500mg",
      quantidade: 100,
      data: "2024-01-15",
      hora: "10:30",
      responsavel: "Ana Santos",
      observacao: "Compra mensal - Fornecedor ABC",
      lote: "PAR001",
      validade: "2024-12-31"
    },
    {
      id: 2,
      tipo: "saida",
      medicamento: "Paracetamol 500mg",
      quantidade: 20,
      data: "2024-01-15",
      hora: "14:30",
      responsavel: "Dr. João Santos",
      observacao: "Consulta - Maria Silva",
      consulta_id: 1
    },
    {
      id: 3,
      tipo: "saida",
      medicamento: "Dipirona 500mg",
      quantidade: 10,
      data: "2024-01-15",
      hora: "14:30",
      responsavel: "Dr. João Santos",
      observacao: "Consulta - Maria Silva",
      consulta_id: 1
    },
    {
      id: 4,
      tipo: "entrada",
      medicamento: "Amoxicilina 500mg",
      quantidade: 50,
      data: "2024-01-14",
      hora: "16:00",
      responsavel: "Carlos Lima",
      observacao: "Reposição de estoque",
      lote: "AMX002",
      validade: "2025-03-20"
    },
    {
      id: 5,
      tipo: "saida",
      medicamento: "Amoxicilina 500mg",
      quantidade: 21,
      data: "2024-01-15",
      hora: "15:00",
      responsavel: "Dra. Ana Costa",
      observacao: "Consulta - José Oliveira",
      consulta_id: 2
    }
  ];

  const filteredMovimentacoes = movimentacoes.filter(mov => {
    const matchesSearch = mov.medicamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mov.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mov.observacao.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTipo = filtroTipo === "todos" || mov.tipo === filtroTipo;
    
    return matchesSearch && matchesTipo;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Movimentações</h2>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar movimentações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="todos">Todos os tipos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
        </select>
      </div>

      {/* Lista de Movimentações */}
      <div className="space-y-3">
        {filteredMovimentacoes.map((mov) => (
          <div key={mov.id} className="bg-card p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  mov.tipo === 'entrada' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {mov.tipo === 'entrada' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">{mov.medicamento}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      mov.tipo === 'entrada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mov.tipo === 'entrada' ? 'ENTRADA' : 'SAÍDA'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-4">
                      <span>Qtd: <strong className="text-foreground">{mov.quantidade}</strong></span>
                      <span>Responsável: <strong className="text-foreground">{mov.responsavel}</strong></span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{mov.observacao}</p>
                  
                  {mov.lote && mov.validade && (
                    <div className="text-xs text-muted-foreground">
                      Lote: {mov.lote} | Validade: {mov.validade}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {mov.data}
                </div>
                <div className="text-muted-foreground">{mov.hora}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMovimentacoes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma movimentação encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default Movimentacoes;