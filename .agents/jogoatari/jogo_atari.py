import pygame
import sys

# Inicialização do Pygame
pygame.init()

# Configurações da Tela
LARGURA = 800
ALTURA = 600
TELA = pygame.display.set_mode((LARGURA, ALTURA))
pygame.display.set_caption("Space Invaders Atari Style")

# Cores
PRETO = (0, 0, 0)
BRANCO = (255, 255, 255)
VERDE = (0, 255, 0)
VERMELHO = (255, 0, 0)

# Fonte
FONTE = pygame.font.SysFont("monospace", 30)

# FPS
RELOGIO = pygame.time.Clock()
FPS = 60

# --- Classes ---
class Jogador:
    def __init__(self):
        self.largura = 50
        self.altura = 20
        self.x = LARGURA // 2 - self.largura // 2
        self.y = ALTURA - 50
        self.velocidade = 5

    def desenhar(self):
        pygame.draw.rect(TELA, VERDE, (self.x, self.y, self.largura, self.altura))

    def mover(self, teclas):
        if teclas[pygame.K_LEFT] and self.x > 0:
            self.x -= self.velocidade
        if teclas[pygame.K_RIGHT] and self.x < LARGURA - self.largura:
            self.x += self.velocidade

class Inimigo:
    def __init__(self, x, y):
        self.largura = 40
        self.altura = 30
        self.x = x
        self.y = y
        self.velocidade_x = 2
        self.velocidade_y = 15

    def desenhar(self):
        pygame.draw.rect(TELA, BRANCO, (self.x, self.y, self.largura, self.altura))

    def mover(self):
        self.x += self.velocidade_x

class Tiro:
    def __init__(self, x, y):
        self.largura = 5
        self.altura = 15
        self.x = x
        self.y = y
        self.velocidade = -7

    def desenhar(self):
        pygame.draw.rect(TELA, VERMELHO, (self.x, self.y, self.largura, self.altura))

    def mover(self):
        self.y += self.velocidade

# --- Função Principal ---
def main():
    jogador = Jogador()
    inimigos = []
    tiros = []
    pontuacao = 0

    # Criando os inimigos (linhas e colunas)
    for linha in range(4):
        for coluna in range(10):
            inimigo = Inimigo(50 + coluna * 60, 50 + linha * 50)
            inimigos.append(inimigo)

    rodando = True
    while rodando:
        TELA.fill(PRETO)

        # Tratar Eventos
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                rodando = False
            
            if evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_SPACE:
                    # Limita a quantidade de tiros na tela para deixar mais difícil
                    if len(tiros) < 3:
                        novo_tiro = Tiro(jogador.x + jogador.largura // 2 - 2, jogador.y)
                        tiros.append(novo_tiro)

        # Mover Jogador
        teclas = pygame.key.get_pressed()
        jogador.mover(teclas)

        # Mover e Desenhar Inimigos
        borda_atingida = False
        for inimigo in inimigos:
            inimigo.mover()
            if inimigo.x <= 0 or inimigo.x >= LARGURA - inimigo.largura:
                borda_atingida = True

        if borda_atingida:
            for inimigo in inimigos:
                inimigo.velocidade_x *= -1
                inimigo.y += inimigo.velocidade_y

        for inimigo in inimigos:
            inimigo.desenhar()
            # Fim de jogo se inimigo encostar no jogador ou passar da tela
            if inimigo.y + inimigo.altura >= jogador.y:
                texto_fim = FONTE.render("GAME OVER", True, VERMELHO)
                TELA.blit(texto_fim, (LARGURA // 2 - 100, ALTURA // 2))
                pygame.display.update()
                pygame.time.delay(3000)
                rodando = False

        # Mover, Desenhar e Checar Colisão de Tiros
        for tiro in tiros[:]:
            tiro.mover()
            tiro.desenhar()
            
            # Remover tiro se sair da tela
            if tiro.y < 0:
                tiros.remove(tiro)
                continue

            # Checar colisão com inimigos
            for inimigo in inimigos[:]:
                if (tiro.x + tiro.largura > inimigo.x and tiro.x < inimigo.x + inimigo.largura and
                    tiro.y + tiro.altura > inimigo.y and tiro.y < inimigo.y + inimigo.altura):
                    if tiro in tiros:
                        tiros.remove(tiro)
                    inimigos.remove(inimigo)
                    pontuacao += 10
                    break

        # Desenhar Jogador
        jogador.desenhar()

        # Desenhar Pontuação
        texto_pontos = FONTE.render(f"PONTOS: {pontuacao}", True, BRANCO)
        TELA.blit(texto_pontos, (10, 10))

        # Checar Vitória
        if len(inimigos) == 0:
            texto_vitoria = FONTE.render("VOCE VENCEU!", True, VERDE)
            TELA.blit(texto_vitoria, (LARGURA // 2 - 120, ALTURA // 2))
            pygame.display.update()
            pygame.time.delay(3000)
            rodando = False

        # Atualizar a tela
        pygame.display.update()
        RELOGIO.tick(FPS)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
