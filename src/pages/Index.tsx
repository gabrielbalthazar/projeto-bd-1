import { useState } from "react";
import { Database, Pill, FileText, ArrowUpDown, Plus, Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import Medicamentos from "../components/Medicamentos";
import Consultas from "../components/Consultas";
import Movimentacoes from "../components/Movimentacoes";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "medicamentos":
        return <Medicamentos />;
      case "consultas":
        return <Consultas />;
      case "movimentacoes":
        return <Movimentacoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Sistema de Controle de Medicamentos
            </h1>
          </div>
          <p className="text-muted-foreground">Posto de Saúde</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "dashboard"
                  ? "bg-background text-foreground border-t border-l border-r border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Database className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("medicamentos")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "medicamentos"
                  ? "bg-background text-foreground border-t border-l border-r border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Pill className="h-4 w-4" />
              Medicamentos
            </button>
            <button
              onClick={() => setActiveTab("consultas")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "consultas"
                  ? "bg-background text-foreground border-t border-l border-r border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="h-4 w-4" />
              Consultas
            </button>
            <button
              onClick={() => setActiveTab("movimentacoes")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === "movimentacoes"
                  ? "bg-background text-foreground border-t border-l border-r border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ArrowUpDown className="h-4 w-4" />
              Movimentações
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;