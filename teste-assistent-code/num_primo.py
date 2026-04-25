def é_primo(numero: int) -> bool:
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
    if not isinstance(numero, int):
        raise TypeError(f"Esperado inteiro, recebido {type(numero).__name__}")

    if numero < 2:
        return False

    if numero == 2:
        return True

    if numero % 2 == 0:
        return False

    # Verifica divisores ímpares até a raiz quadrada
    # Otimização: qualquer divisor > √n tem um par correspondente < √n
    limite = int(numero**0.5) + 1
    for divisor in range(3, limite, 2):
        if numero % divisor == 0:
            return False

    return True


def validar_numero(numero: int) -> None:
    """
    Valida se o número está dentro do intervalo permitido.

    Args:
        numero: Número inteiro a validar.

    Raises:
        ValueError: Se o número for negativo.
    """
    if numero < 0:
        raise ValueError("O número não pode ser negativo")


# Exemplos de uso
if __name__ == "__main__":
    números_para_testar = [1, 2, 3, 4, 5, 10, 17, 20, 29, 100, 97, 121]

    print("=" * 50)
    print("VERIFICADOR DE NÚMEROS PRIMOS")
    print("=" * 50)
    print()

    for numero in números_para_testar:
        resultado = é_primo(numero)
        status = "✓ Primo" if resultado else "✗ Não é primo"
        print(f"{numero:3d} -> {status}")

    print()
    print("=" * 50)
