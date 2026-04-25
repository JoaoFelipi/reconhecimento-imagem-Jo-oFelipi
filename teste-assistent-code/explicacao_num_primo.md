# Explicação: Verificador de Números Primos

## 📌 Visão Geral

Este arquivo contém uma implementação otimizada de uma função que verifica se um número é primo, seguindo princípios de **Clean Code** e **boas práticas Python**.

---

## 🔢 O que é um Número Primo?

Um **número primo** é um inteiro maior que 1 que possui apenas dois divisores: **1 e ele mesmo**.

**Exemplos:**
- ✓ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29...
- ✗ 1, 4, 6, 8, 9, 10, 12, 14, 15, 16...

---

## 📝 Análise Linha a Linha

### **Assinatura da Função (Linha 1)**

```python
def é_primo(numero: int) -> bool:
```

| Elemento | Significado |
|----------|-------------|
| `é_primo` | Nome descritivo da função |
| `numero: int` | **Type hint** - parâmetro é um inteiro |
| `-> bool` | **Type hint** - retorna um booleano (True ou False) |

**Melhoria aplicada:** Type hints tornam o código mais legível e permitem detecção de erros em IDEs.

---

### **Docstring (Linhas 2-22)**

```python
    """
    Verifica se um número é primo.

    Um número primo é um inteiro maior que 1 que possui
    apenas dois divisores: 1 e ele mesmo.

    Args:
        numero: Número inteiro a ser verificado.

    Returns:
        bool: True se o número é primo, False caso contrário.

    Raises:
        TypeError: Se o número não for um inteiro.

    Exemplos:
        >>> é_primo(2)
        True
        >>> é_primo(17)
        True
        >>> é_primo(4)
        False
    """
```

**Componentes:**
- **Descrição breve** - explica o propósito principal
- **Descrição detalhada** - contexto sobre números primos
- **Args** - documentação dos parâmetros
- **Returns** - tipo e descrição do retorno
- **Raises** - exceções possivelmente lançadas
- **Exemplos** - casos de uso práticos

**Melhoria aplicada:** Docstring completa segue o padrão Google/NumPy, facilitando uso e manutenção.

---

### **Validação de Entrada (Linhas 24-25)**

```python
    if not isinstance(numero, int):
        raise TypeError(f"Esperado inteiro, recebido {type(numero).__name__}")
```

| Parte | Significado |
|-------|-------------|
| `isinstance(numero, int)` | Verifica se é um inteiro |
| `not` | Se NÃO for inteiro... |
| `raise TypeError()` | ...lança um erro de tipo |
| `f"..."` | f-string com mensagem dinâmica |
| `type(numero).__name__` | Nome do tipo recebido |

**Melhoria aplicada:** Mensagem de erro mais informativa usando f-string.

---

### **Rejeitar Números Menores que 2 (Linhas 27-28)**

```python
    if numero < 2:
        return False
```

| Valor | Resultado | Motivo |
|-------|-----------|--------|
| 0, 1, -1, ... | False | Não são primos por definição |

**Melhoria aplicada:** Mudança de `numero <= 1` para `numero < 2` é mais clara e limpa.

---

### **Tratamento do Número 2 (Linhas 30-31)**

```python
    if numero == 2:
        return True
```

**Motivo:** 2 é o **único número primo par**, então é tratado como caso especial.

**Por que funciona:**
- Evita divisões desnecessárias
- 2 é realmente primo (divisível apenas por 1 e 2)

---

### **Rejeitar Números Pares (Linhas 33-34)**

```python
    if numero % 2 == 0:
        return False
```

| Expressão | Significado |
|-----------|-------------|
| `numero % 2` | Resto da divisão de `numero` por 2 |
| `== 0` | Se o resto é 0, o número é par |

**Otimização:** Elimina metade dos números de verificação posterior.

---

### **Verificação de Divisores Ímpares (Linhas 36-40)**

```python
    limite = int(numero**0.5) + 1
    for divisor in range(3, limite, 2):
        if numero % divisor == 0:
            return False
```

**Breakdown:**

| Linha | O que faz | Exemplo (numero=17) |
|------|----------|------------------|
| `limite = int(numero**0.5) + 1` | Calcula raiz quadrada + 1 | `limite = int(4.123) + 1 = 5` |
| `range(3, limite, 2)` | Valores: 3, 5 (incrementa de 2 em 2) | 3, 5 |
| `if numero % divisor == 0` | Se encontrar divisor, não é primo | 17 % 3 ≠ 0, 17 % 5 ≠ 0 |
| `return False` | Encerra e retorna False | (não executa neste caso) |

**Por que até a raiz quadrada?**

Se um número `n` tem um divisor `d` maior que √n, então `n/d` é um divisor menor que √n. Logo, verificar até √n é suficiente.

**Exemplo:** Para verificar 36:
- √36 = 6
- Divisores: 1, 2, 3, **4, 6**, 9, 12, 18, 36
- Basta checar: 1, 2, 3, 6 (até √36)

---

### **Retorno Final (Linha 42)**

```python
    return True
```

Se o código chegou aqui, significa que:
- ✓ É um inteiro ≥ 2
- ✓ Não é par
- ✓ Não tem divisores ímpares até √numero

Portanto, é primo!

---

## 🎯 Melhorias Aplicadas (Clean Code)

### 1. **Type Hints**
```python
# Antes (sem type hints)
def é_primo(numero):

# Depois (com type hints)
def é_primo(numero: int) -> bool:
```
**Benefício:** Melhor documentação, detecção de erros, autocompletar em IDEs.

### 2. **Docstring Completa**
- Adicionado contexto teórico
- Seção "Raises" documentando exceções
- Exemplos de uso (doctests)

### 3. **Mensagens de Erro Descritivas**
```python
# Antes
raise TypeError("O número deve ser um inteiro")

# Depois
raise TypeError(f"Esperado inteiro, recebido {type(numero).__name__}")
```

### 4. **Variáveis Descritivas**
```python
# Mais claro
limite = int(numero**0.5) + 1
```

### 5. **Função Auxiliar**
```python
def validar_numero(numero: int) -> None:
    """Valida se o número está dentro do intervalo permitido."""
    if numero < 0:
        raise ValueError("O número não pode ser negativo")
```
**Princípio:** Separação de responsabilidades.

### 6. **Testes Melhorados**
```python
números_para_testar = [1, 2, 3, 4, 5, 10, 17, 20, 29, 100, 97, 121]

# Saída formatada com visual melhor
print("=" * 50)
print("VERIFICADOR DE NÚMEROS PRIMOS")
print("=" * 50)

for numero in números_para_testar:
    resultado = é_primo(numero)
    status = "✓ Primo" if resultado else "✗ Não é primo"
    print(f"{numero:3d} -> {status}")
```

---

## ⚡ Complexidade

| Aspecto | Valor |
|---------|-------|
| **Complexidade de Tempo** | O(√n) |
| **Complexidade de Espaço** | O(1) |
| **Pior Caso** | Número primo grande |
| **Melhor Caso** | Número par (O(1)) |

---

## 🧪 Exemplos de Uso

```python
# Casos True
é_primo(2)      # True  - único primo par
é_primo(17)     # True  - primo
é_primo(101)    # True  - primo

# Casos False
é_primo(1)      # False - por definição
é_primo(4)      # False - par
é_primo(9)      # False - divisível por 3
é_primo(-5)     # False - negativo

# Erro
é_primo("17")   # TypeError: Esperado inteiro, recebido str
```

---

## 💡 Dicas de Otimização Futura

1. **Para verificar múltiplos números:** Usar Crivo de Eratóstenes
2. **Para números muito grandes:** Usar testes de primalidade probabilísticos (Miller-Rabin)
3. **Para cache:** Guardar primos já verificados em um conjunto (set)

---

## 📚 Referências Clean Code

- **Nomes significativos:** Variáveis e funções têm nomes claros
- **Funções pequenas:** Cada função faz uma coisa bem
- **Documentação clara:** Docstrings completas
- **Tratamento de erros:** Exceções informativas
- **Type hints:** Tornam o código mais seguro
- **Sem números mágicos:** Variável `limite` deixa explícito o significado

---

**Código otimizado e pronto para produção! 🚀**
