from typing import Tuple


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
    """
    Exibe um relatório formatado com as estatísticas.

    Args:
        total: Soma total dos valores.
        media: Média aritmética dos valores.
        maximo: Valor máximo da sequência.
        minimo: Valor mínimo da sequência.
    """
    print("\n" + "=" * 50)
    print("RELATÓRIO DE ESTATÍSTICAS")
    print("=" * 50)
    print(f"Total:   {total}")
    print(f"Média:   {media:.2f}")
    print(f"Máximo:  {maximo}")
    print(f"Mínimo:  {minimo}")
    print("=" * 50 + "\n")


def main() -> None:
    """Função principal que orquestra a execução do programa."""
    # Dados de entrada
    numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]

    # Calcula estatísticas
    total, media, maximo, minimo = calcular_estatisticas(numeros)

    # Exibe resultado
    exibir_relatorio_estatistico(total, media, maximo, minimo)


if __name__ == "__main__":
    main()