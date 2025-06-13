import { useState } from "react";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dados mockados - você integrará com seu backend
  const medicamentos = [
    {
      id: 1,
      nome: "Paracetamol 500mg",
      categoria: "Analgésico",
      fabricante: "EMS",
      lote: "ABC123",
      validade: "2024-12-31",
      estoque: 150,
      estoqueMinimo: 50,
      preco: 0.45
    },
    {
      id: 2,
      nome: "Dipirona 500mg",
      categoria: "Analgésico",
      fabricante: "Medley",
      lote: "DEF456",
      validade: "2024-10-15",
      estoque: 8,
      estoqueMinimo: 30,
      preco: 0.38
    },
    {
      id: 3,
      nome: "Amoxicilina 500mg",
      categoria: "Antibiótico",
      fabricante: "Sandoz",
      lote: "GHI789",
      validade: "2025-03-20",
      estoque: 75,
      estoqueMinimo: 25,
      preco: 1.20
    }
  ];

  const filteredMedicamentos = medicamentos.filter(med =>
    med.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Medicamentos</h2>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Novo Medicamento
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Pesquisar medicamentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Lista de Medicamentos */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-muted-foreground">Medicamento</th>
                <th className="text-left p-4 text-muted-foreground">Categoria</th>
                <th className="text-left p-4 text-muted-foreground">Fabricante</th>
                <th className="text-left p-4 text-muted-foreground">Lote</th>
                <th className="text-left p-4 text-muted-foreground">Validade</th>
                <th className="text-left p-4 text-muted-foreground">Estoque</th>
                <th className="text-left p-4 text-muted-foreground">Preço</th>
                <th className="text-left p-4 text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMedicamentos.map((med) => (
                <tr key={med.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">{med.nome}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{med.categoria}</td>
                  <td className="p-4 text-foreground">{med.fabricante}</td>
                  <td className="p-4 text-foreground">{med.lote}</td>
                  <td className="p-4 text-foreground">{med.validade}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className={`font-medium ${med.estoque <= med.estoqueMinimo ? 'text-red-600' : 'text-foreground'}`}>
                        {med.estoque}
                      </span>
                      <span className="text-xs text-muted-foreground">Mín: {med.estoqueMinimo}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">R$ {med.preco.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-primary hover:bg-primary/10 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-destructive hover:bg-destructive/10 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;