import { ArrowDown, Calendar, Package } from "lucide-react";
import { useEffect, useState } from "react";

const Movimentacoes = () => {
  const [movimentacoes, setMovimentacoes] = useState([])

  async function fetchMovimentacoes() {
    try {
      const response = await fetch('http://localhost:5000/api/medicine-leave');
      const data = await response.json();
      setMovimentacoes(data);
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
    }
  }

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  console.log(movimentacoes);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-foreground">Saídas</h2>
      </div>

      {/* Lista de Movimentações */}
      <div className="space-y-3">
        {movimentacoes.map((mov) => (
          mov.nome_medicamento && mov.nome_medico && (
            <div key={mov.id} className="bg-card p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full bg-red-100 text-red-600`}>
                  <ArrowDown className="h-4 w-4" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">{mov.nome_medicamento}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-800`}>
                      SAÍDA
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-4">
                      <span>Qtd: <strong className="text-foreground">{mov.quantidade_retirada}</strong></span>
                      <span>Responsável: <strong className="text-foreground">{mov.nome_medico}</strong></span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{mov.observacao}</p>
                  
                  {mov.lote && mov.data_validade && (
                    <div className="text-xs text-muted-foreground">
                      Lote: {mov.lote} | Validade: {mov.data_validade}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {mov.data_movimentacao.slice(0, 10)}
                </div>
                <div className="text-muted-foreground">{mov.data_movimentacao.slice(11, 16)}</div>
              </div>
            </div>
          </div>
          )
        ))}
      </div>

      {movimentacoes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma saída encontrada.</p>
        </div>
      )}
    </div>
  );
};

export default Movimentacoes;