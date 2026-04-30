# 📚 Projeto Teste Assistente Code

Conjunto de exercícios em Python para prática de conceitos fundamentais de programação.

## 📁 Estrutura do Projeto

```
teste-assistent-code/
├── num_primo.py       # Verificação de números primos
├── debug.py           # Sistema de cálculo de carrinho de compras
├── refatoracao.py     # Cálculo de estatísticas
├── explicacao_*.md    # Documentação explicativa
└── README.md          # Este arquivo
```

## 🚀 Scripts Disponíveis

### 1. Verificador de Números Primos (`num_primo.py`)

Verifica se um número é primo utilizando algoritmo otimizado.

**Funcionalidades:**
- Detecção de números primos
- Validação de entrada (tipo e intervalo)
- Otimização com raiz quadrada

**Uso:**
```bash
python num_primo.py
```

**Saída esperada:**
```
==================================================
VERIFICADOR DE NÚMEROS PRIMOS
==================================================

  1 -> ✗ Não é primo
  2 -> ✓ Primo
  3 -> ✓ Primo
  4 -> ✗ Não é primo
  5 -> ✓ Primo
 10 -> ✗ Não é primo
 17 -> ✓ Primo
 20 -> ✗ Não é primo
 29 -> ✓ Primo
100 -> ✗ Não é primo
 97 -> ✓ Primo
121 -> ✗ Não é primo

==================================================
```

### 2. Sistema de Carrinho de Compras (`debug.py`)

Calcula o total de uma compra com imposto e desconto.

**Funcionalidades:**
- Entrada de dados do cliente
- Cadastro de 3 itens (quantidade + preço)
- Cálculo de imposto (10% - ICMS)
- Aplicação de cupom de desconto
- Relatório formatado

**Uso:**
```bash
python debug.py
```

**Exemplo de execução:**
```
Qual é seu nome? João
Quantidade do item 1: 2
Preço do item 1? 50.00
Quantidade do item 2: 1
Preço do item 2? 30.00
Quantidade do item 3: 3
Preço do item 3? 10.00
Você tem um cupom de desconto? (Digite o percentual ou 0): 15
```

**Saída esperada:**
```
=================================
 Cliente: João
=================================
 Item 1:        R$ 100.00
 Item 2:        R$ 30.00
 Item 3:        R$ 30.00
-------------------------------
 Subtotal:      R$ 160.00
 Imposto (10%): R$ 16.00
 Desconto (15%): -R$ 24.00
=================================
 TOTAL:         R$ 152.00
=================================
```

### 3. Cálculo de Estatísticas (`refatoracao.py`)

Calcula estatísticas básicas de uma lista de números.

**Funcionalidades:**
- Cálculo de total, média, máximo e mínimo
- Validação de entrada
- Relatório formatado

**Uso:**
```bash
python refatoracao.py
```

## 📋 Documentação

| Arquivo | Descrição |
|---------|------------|
| `explicacao_num_primo.md` | Explicação do algoritmo de verificação de primos |
| `explicacao_debug.md` | Análise do sistema de carrinho de compras |
| `explicacao_refatoracao.md` | Explicação do cálculo de estatísticas |

## 🛠️ Requisitos

- Python 3.8+
- Não requer dependências externas

## 📌 Conceitos Demonstrados

- **Funções** com tipagem estática (`num_primo.py`, `refatoracao.py`)
- **Docstrings** no estilo Google
- **Tratamento de exceções** (TypeError, ValueError)
- **Operações aritméticas** básicas
- **Entrada/saída** via terminal
- **Formatação** de strings
- **Lógica condicional** e loops

## 📄 Licença

Este projeto é para fins educacionais.