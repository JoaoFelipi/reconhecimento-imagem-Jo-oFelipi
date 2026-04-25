# 🐛 Análise de Erros - Debug

## Resumo Executivo

O código possui **5 erros críticos** que impedem sua execução. Abaixo está a análise detalhada de cada um.

---

## ❌ Erros Identificados

### **Erro 1: Falta de Aspas na String**
**Linha:** 5  
**Código:**
```python
item1 = float(input(Preço do item 1? ))
```

**Problema:**
- ❌ `Preço do item 1?` não está entre aspas
- Python interpreta como variável/identificador, não como string
- Causa: `SyntaxError: invalid syntax`

**Correção:**
```python
item1 = float(input("Preço do item 1? "))
```

**Tipo de Erro:** `SyntaxError` - Erro de Sintaxe

---

### **Erro 2: Conversão de Tipo Não Realizada**
**Linha:** 23  
**Código:**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

**Problema:**
- ❌ `input()` retorna uma **string**, não um número
- Linha 43: `if desconto_cupom > 0:` tenta comparar string com int
- Linha 24: `desconto = subtotal * (desconto_cupom / 100)` tenta fazer operação matemática com string
- Causa: `TypeError` na comparação/operação

**Correção:**
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

**Tipo de Erro:** `TypeError` - Erro de Tipo

---

### **Erro 3: F-string Incompleta**
**Linha:** 39  
**Código:**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```

**Problema:**
- ❌ Falta o prefixo `f` antes das aspas
- A string é interpretada como texto literal, não como f-string
- `{total_item2:.2f}` é exibido como texto, não como valor da variável
- Causa: Saída incorreta (não é um erro que trava, mas é lógico)

**Saída Esperada:** ` Item 2:        R$ 150.50`  
**Saída Atual:** ` Item 2:        R$ {total_item2:.2f}`

**Correção:**
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

**Tipo de Erro:** `LogicError` - Erro Lógico (saída incorreta)

---

### **Erro 4: Indentação Incorreta**
**Linha:** 41-42  
**Código:**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Problema:**
- ❌ Linha 42 não está indentada dentro do bloco `if`
- O `print()` deveria estar indentado com 4 espaços (ou 1 tab)
- Causa: `IndentationError: expected an indented block`

**Correção:**
```python
if desconto_cupom > 0:
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Tipo de Erro:** `IndentationError` - Erro de Indentação

---

### **Erro 5: String Sem Aspas (Duplicado do Erro 1)**
**Linha:** 5  
**Código:**
```python
item1 = float(input(Preço do item 1? ))
```

**Descrição:** Mesmo problema da Linha 5. Embora presente apenas uma vez, é essencial corrigir.

---

## 📊 Tabela Resumida

| Linha | Tipo de Erro | Severidade | Descrição |
|-------|--------------|-----------|-----------|
| 5 | SyntaxError | 🔴 Crítico | Falta aspas em string |
| 23 | TypeError | 🔴 Crítico | input() não convertido para número |
| 39 | Logic Error | 🟠 Alto | F-string sem prefixo `f` |
| 41-42 | IndentationError | 🔴 Crítico | Bloco if não indentado |
| **Total** | **4 Erros** | - | - |

---

## 🔧 Impacto dos Erros

### Ordem de Execução:
1. **Linha 5** → ❌ SyntaxError (Program crashes immediately)
2. Se corrigido → **Linha 23** → TypeError ao tentar comparar string com int
3. Se corrigido → **Linha 39** → Saída incorreta (não quebra, mas é ilógica)
4. Se corrigido → **Linha 41-42** → IndentationError

### Sem correções:
- ❌ O programa **NÃO executa** (múltiplos erros bloqueantes)

### Com todas as correções:
- ✅ O programa executa perfeitamente
- ✅ Calcula corretamente o desconto
- ✅ Exibe a saída formatada corretamente

---

## 💡 Lições Aprendidas

1. **Sempre use aspas para strings** - Sem aspas, Python não reconhece como texto
2. **Converta tipos de entrada** - `input()` sempre retorna string
3. **Use f-strings corretamente** - Não esqueça do prefixo `f`
4. **Mantenha a indentação consistente** - Especialmente em blocos if/for/while
5. **Teste o código gradualmente** - Identifique erros logo no desenvolvimento

---

## ✅ Como Testar Após Correção

```python
# Teste com valores:
# Nome: João
# Item 1: 2 unidades x R$ 50.00
# Item 2: 1 unidade x R$ 100.00
# Item 3: 3 unidades x R$ 25.00
# Cupom: 10%

# Saída esperada:
# ==================================================
# Cliente: João
# ==================================================
# Item 1:        R$ 100.00
# Item 2:        R$ 100.00
# Item 3:        R$ 75.00
# --------- --------------------------
# Subtotal:      R$ 275.00
# Imposto (10%): R$ 27.50
# Desconto (10%): -R$ 27.50
# ==================================================
# TOTAL:         R$ 275.00
# ==================================================
```

---

**Todos os erros foram identificados e serão corrigidos no arquivo debug.py! ✅**
