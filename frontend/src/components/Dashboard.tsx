import { Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  // Dados mockados - você integrará com seu backend
  const stats = {
    totalMedicamentos: 156,
    entradas: 45,
    saidas: 32,
    estoqueMinimo: 8
  };

  const medicamentosEstoqueMinimo = [
    { nome: "Paracetamol 500mg", estoque: 12, minimo: 50 },
    { nome: "Dipirona 500mg", estoque: 8, minimo: 30 },
    { nome: "Amoxicilina 500mg", estoque: 5, minimo: 25 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
      
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total de Medicamentos</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalMedicamentos}</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
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
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Estoque Mínimo</p>
              <p className="text-3xl font-bold text-orange-600">{stats.estoqueMinimo}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Alertas de Estoque Mínimo */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <h3 className="text-xl font-semibold text-foreground">Alertas de Estoque Mínimo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2 text-muted-foreground">Medicamento</th>
                <th className="text-left p-2 text-muted-foreground">Estoque Atual</th>
                <th className="text-left p-2 text-muted-foreground">Estoque Mínimo</th>
                <th className="text-left p-2 text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {medicamentosEstoqueMinimo.map((med, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="p-2 text-foreground">{med.nome}</td>
                  <td className="p-2 text-foreground">{med.estoque}</td>
                  <td className="p-2 text-foreground">{med.minimo}</td>
                  <td className="p-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      Crítico
                    </span>
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

export default Dashboard;