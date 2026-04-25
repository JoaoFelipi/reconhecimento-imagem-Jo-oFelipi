# 🔄 Refatoração - Clean Code

## Comparação: Antes vs Depois

### ❌ CÓDIGO ANTES (Ruim)
```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

### ✅ CÓDIGO DEPOIS (Otimizado)
```python
from typing import Tuple

def calcular_estatisticas(numeros: list[int]) -> Tuple[int, float, int, int]:
    """Calcula estatísticas básicas..."""
    if not numeros:
        raise ValueError("A lista não pode estar vazia")

    total = sum(numeros)
    media = total / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)

    return total, media, maximo, minimo

def exibir_relatorio_estatistico(
    total: int,
    media: float,
    maximo: int,
    minimo: int
) -> None:
    """Exibe um relatório formatado..."""
    print("\n" + "=" * 50)
    print("RELATÓRIO DE ESTATÍSTICAS")
    print("=" * 50)
    print(f"Total:   {total}")
    print(f"Média:   {media:.2f}")
    print(f"Máximo:  {maximo}")
    print(f"Mínimo:  {minimo}")
    print("=" * 50 + "\n")

def main() -> None:
    """Função principal que orquestra a execução."""
    numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, media, maximo, minimo = calcular_estatisticas(numeros)
    exibir_relatorio_estatistico(total, media, maximo, minimo)

if __name__ == "__main__":
    main()
```

---

## 📋 Problemas Identificados no Código Original

| Problema | Severidade | Impacto |
|----------|-----------|---------|
| Nomes de variáveis uma letra | 🔴 Crítico | Código incompreensível |
| Nomes de funções genéricos | 🔴 Crítico | Difícil manutenção |
| Sem type hints | 🟠 Alto | Erros em tempo de execução |
| Sem docstrings | 🟠 Alto | Difícil para outros compreender |
| Loops desnecessários | 🟡 Médio | Ineficiência |
| Sem tratamento de erros | 🟡 Médio | Falhas silenciosas |
| Output não formatado | 🟡 Médio | Difícil leitura |
| Sem separação de responsabilidades | 🟡 Médio | Código frágil |

---

## 🎯 Melhorias Aplicadas (Clean Code)

### 1️⃣ **Nomenclatura Descritiva**

#### Variáveis
```python
# ❌ Antes: nomes genéricos
t, m, mx, mn, l

# ✅ Depois: nomes significativos
total, media, maximo, minimo, numeros
```

| Antes | Depois | Significado |
|-------|--------|-------------|
| `c` | `calcular_estatisticas` | Função que calcula |
| `l` | `numeros` | Lista de números |
| `t` | `total` | Soma total |
| `m` | `media` | Média aritmética |
| `mx` | `maximo` | Valor máximo |
| `mn` | `minimo` | Valor mínimo |
| `x` | `numeros` | Variável de entrada |
| `a,b,c2,d` | `total, media, maximo, minimo` | Resultado claro |

**Princípio:** Nomes de variáveis devem revelar a intenção e significado.

---

### 2️⃣ **Type Hints**

```python
# ❌ Antes
def c(l):
    return t,m,mx,mn

# ✅ Depois
def calcular_estatisticas(numeros: list[int]) -> Tuple[int, float, int, int]:
    return total, media, maximo, minimo
```

**Benefícios:**
- ✨ Autocompletar em IDEs
- ✨ Detecção de erros antes de executar
- ✨ Código autodocumentado
- ✨ Facilita refatorações futuras

---

### 3️⃣ **Docstrings Completas**

```python
def calcular_estatisticas(numeros: list[int]) -> Tuple[int, float, int, int]:
    """
    Calcula estatísticas básicas de uma lista de números.

    Computa o total, média, valor máximo e valor mínimo
    de uma sequência numérica.

    Args:
        numeros: Lista de números inteiros.

    Returns:
        Tupla contendo (total, média, máximo, mínimo).

    Raises:
        ValueError: Se a lista estiver vazia.
        TypeError: Se a lista não contiver números.

    Exemplos:
        >>> calcular_estatisticas([23, 7, 45, 2, 67, 12, 89, 34, 56, 11])
        (346, 34.6, 89, 2)
    """
```

**Seções obrigatórias:**
- Descrição breve
- Descrição detalhada
- Args (parâmetros)
- Returns (retorno)
- Raises (exceções)
- Exemplos (doctests)

---

### 4️⃣ **Eliminação de Loops Desnecessários**

#### ❌ Antes - Ineficiente
```python
t=0
for i in range(len(l)):
    t=t+l[i]
m=t/len(l)

mx=l[0]
mn=l[0]
for i in range(len(l)):
    if l[i]>mx:
        mx=l[i]
    if l[i]<mn:
        mn=l[i]
```

**Problemas:**
- Loop manual para somar (2 iterações)
- Loop manual para achar max/min
- Complexidade desnecessária

#### ✅ Depois - Pythônico
```python
total = sum(numeros)           # Usa built-in
media = total / len(numeros)   # Simples
maximo = max(numeros)          # Usa built-in
minimo = min(numeros)          # Usa built-in
```

**Benefícios:**
- ⚡ Mais rápido (otimizado em C)
- 📖 Mais legível
- 🐛 Menos bugs
- 🔧 Mais Pythônico

---

### 5️⃣ **Tratamento de Erros**

```python
# ✅ Novo: valida entrada
if not numeros:
    raise ValueError("A lista não pode estar vazia")
```

**Protege contra:**
- ✓ Lista vazia (evita divisão por zero)
- ✓ Erro claro para o usuário
- ✓ Falha rápida (fail-fast)

---

### 6️⃣ **Separação de Responsabilidades**

#### ❌ Antes - Tudo misturado
```python
def c(l):
    # calcula E retorna
    return t,m,mx,mn

# no código principal
a,b,c2,d=c(x)
print("total:",a)      # exibe
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

#### ✅ Depois - Cada função faz uma coisa
```python
def calcular_estatisticas(numeros: list[int]) -> Tuple[...]:
    """Calcula estatísticas."""
    # UMA responsabilidade: calcular

def exibir_relatorio_estatistico(total: int, ...) -> None:
    """Exibe as estatísticas."""
    # UMA responsabilidade: exibir

def main() -> None:
    """Orquestra o programa."""
    # Coordena as funções

if __name__ == "__main__":
    main()
```

**Princípio Single Responsibility (SRP):**
- 🎯 Cada função tem UM propósito
- 🧪 Mais fácil testar
- 🔧 Mais fácil manter
- ♻️ Mais reutilizável

---

### 7️⃣ **Output Formatado e Legível**

#### ❌ Antes - Desorganizado
```
total: 346
media: 34.6
maior: 89
menor: 2
```

#### ✅ Depois - Profissional
```
==================================================
RELATÓRIO DE ESTATÍSTICAS
==================================================
Total:   346
Média:   34.60
Máximo:  89
Mínimo:  2
==================================================
```

**Melhorias:**
- Título descritivo
- Alinhamento consistente
- Separadores visuais
- Formatação numérica (`.2f` para 2 casas decimais)

---

### 8️⃣ **Padrão Main Guard**

```python
if __name__ == "__main__":
    main()
```

**Por que?**
- ✅ Código pode ser importado sem executar
- ✅ Padrão Python profissional
- ✅ Facilita testes

---

## 📊 Comparação de Qualidade

| Métrica | Antes | Depois |
|---------|-------|--------|
| **Linhas** | 20 | 75 (mas com documentação) |
| **Complexidade ciclomática** | 5 | 3 |
| **Type hints** | 0% | 100% |
| **Docstrings** | 0% | 100% |
| **Tratamento de erros** | ❌ | ✅ |
| **Legibilidade** | 1/10 | 9/10 |
| **Manutenibilidade** | 1/10 | 9/10 |
| **Testabilidade** | 2/10 | 9/10 |

---

## 🧪 Testabilidade - Antes vs Depois

### ❌ Antes - Difícil testar
```python
# Não dá pra testar sem capturar stdout
x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)  # Não dá pra verificar o valor facilmente
```

### ✅ Depois - Fácil testar
```python
# Testes unitários simples
def test_calcular_estatisticas():
    resultado = calcular_estatisticas([23, 7, 45, 2, 67, 12, 89, 34, 56, 11])
    assert resultado == (346, 34.6, 89, 2)

def test_lista_vazia():
    with pytest.raises(ValueError):
        calcular_estatisticas([])

# A exibição é independente
def test_exibir(capsys):
    exibir_relatorio_estatistico(346, 34.6, 89, 2)
    captured = capsys.readouterr()
    assert "RELATÓRIO" in captured.out
```

---

## 🎓 Princípios Clean Code Aplicados

| Princípio | Aplicado? | Como |
|-----------|-----------|------|
| **DRY (Don't Repeat Yourself)** | ✅ | Sem loops repetidos, usando built-ins |
| **SOLID** | ✅ | Uma responsabilidade por função |
| **KISS (Keep It Simple)** | ✅ | Código claro e direto |
| **YAGNI (You Ain't Gonna Need It)** | ✅ | Sem funcionalidades extras |
| **Nomes significativos** | ✅ | Variáveis e funções descritivas |
| **Funções pequenas** | ✅ | Cada função faz uma coisa bem |
| **Comment vs Code** | ✅ | Código fala por si (docstrings) |
| **Error handling** | ✅ | Tratamento de casos especiais |
| **Type hints** | ✅ | Código tipado e seguro |

---

## 🚀 Resultado Final

O código refatorado é:

✨ **Legível** - Compreensível à primeira leitura  
✨ **Manutenível** - Fácil de modificar e estender  
✨ **Testável** - Funções isoladas e testáveis  
✨ **Profissional** - Segue padrões da indústria  
✨ **Escalável** - Pronto para crescer sem problemas  
✨ **Robusto** - Trata erros e casos especiais  

---

## 📚 Referências Clean Code

- Robert C. Martin - "Clean Code: A Handbook of Agile Software Craftsmanship"
- PEP 8 - Python Enhancement Proposal (Style Guide)
- PEP 20 - The Zen of Python
- Google Python Style Guide

**Código refatorado e pronto para produção! 🎉**
