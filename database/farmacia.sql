-- Tabela de Pacientes
CREATE TABLE Paciente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cartao_sus TEXT UNIQUE NOT NULL
);

-- Tabela de Médicos
CREATE TABLE Medico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    crm TEXT UNIQUE NOT NULL,
    especialidade TEXT CHECK (especialidade IN ('pediatra', 'clinico geral')) NOT NULL
);

-- Tabela Atende
CREATE TABLE Atende (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_medico INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL,
    FOREIGN KEY (id_medico) REFERENCES Medico(id),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id)
);

-- Tabela de Prescrição
CREATE TABLE Prescricao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_emissao DATE NOT NULL,
    id_medico INTEGER NOT NULL,
    id_paciente INTEGER NOT NULL,
    id_atende INTEGER NOT NULL,
    FOREIGN KEY (id_atende) REFERENCES Atende(id),
    FOREIGN KEY (id_medico) REFERENCES Medico(id),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id)
);

-- Tabela de Medicamento
CREATE TABLE Medicamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    dosagem TEXT NOT NULL,
    principio_ativo TEXT NOT NULL,
    data_validade DATE NOT NULL
);

-- Tabela de Estoque (Entidade Fraca)
CREATE TABLE Estoque (
    lote TEXT NOT NULL,
    id_medicamento INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    codigo_lote_chave_parcial TEXT,
    PRIMARY KEY (lote, id_medicamento),
    FOREIGN KEY (id_medicamento) REFERENCES Medicamento(id)
);

-- Tabela de Saída de Medicamento
CREATE TABLE Saida_Medicamento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_movimentacao DATE NOT NULL,
    quantidade_retirada INTEGER NOT NULL,
    id_medicamento INTEGER NOT NULL,
    lote TEXT NOT NULL,
    FOREIGN KEY (id_medicamento) REFERENCES Medicamento(id),
    FOREIGN KEY (lote, id_medicamento) REFERENCES Estoque(lote, id_medicamento)
);

-- Tabela Gera
CREATE TABLE Gera (
    id_saida_medicamento INTEGER NOT NULL,
    id_prescricao INTEGER NOT NULL,
    PRIMARY KEY (id_saida_medicamento, id_prescricao),
    FOREIGN KEY (id_saida_medicamento) REFERENCES Saida_Medicamento(id),
    FOREIGN KEY (id_prescricao) REFERENCES Prescricao(id)
);
