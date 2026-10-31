<p align="center">
  <img src="docs/screenshots/logo.png" alt="InverterLab" width="360">
</p>

<p align="center">
  <strong>Simulador educacional de inversores de frequência, baseado no Altus AD600M</strong><br>
  Monte circuitos de comando com simbologia elétrica real, parametrize o inversor pela IHM e veja o motor girar — tudo no navegador, sem instalar nada.
</p>

<p align="center">
  <a href="http://caiobondarchuk.github.io/inverterlab_simulador-inversor-de-frequencia" target="_blank">Acessar o InverterLab »</a><br>
  <sub><strong>Versão atual:</strong> V1.3</sub>
</p>

---

## O que é

O **InverterLab** nasceu de uma necessidade simples: depois de uma aula sobre inversores de frequência (usando o Altus AD600M) em um curso técnico, não havia nenhuma ferramenta gratuita para continuar praticando em casa — montar o circuito de comando, ligar os terminais certos e ajustar os parâmetros sem precisar do equipamento físico.

O InverterLab preenche essa lacuna: é uma bancada virtual onde você arrasta componentes elétricos (botoeiras, contatores, disjuntores, relés temporizados, motor), liga os fios seguindo a simbologia padrão NBR/IEC, e simula o circuito com o inversor AD600M — IHM funcional, parâmetros reais do manual, curva V/F, e o caminho da corrente destacado visualmente enquanto o circuito está energizado.

Todo o projeto roda num único arquivo HTML, direto no navegador, sem instalação, sem backend e sem necessidade de internet depois do primeiro carregamento (funciona offline via Service Worker).

## Funcionalidades

- **Bancada de montagem** com paleta de componentes organizada por categoria (Alimentação, Proteção, Inversor, Motor, Comando, Sinalização), usando simbologia elétrica padrão (NBR/IEC) — contatos NA/NF, bobinas de contator, relés temporizados (KT), disjuntores, motor trifásico, botoeiras, chave seletora, potenciômetro e sinaleiros. Os temporizadores ficam em **Comando**, junto aos contatores.
- **Fiação ortogonal** com emendas (nós), arraste de terminais, movimento de segmentos e vértices no estilo FluidSim, e edição completa (desfazer/refazer, duplicar, excluir) enquanto a simulação está parada.
- **Cores de fio** com paleta rápida (verde, amarelo, vermelho, preto e azul) e histórico das últimas cinco cores usadas, lembrado entre sessões. O novo fio já nasce com a última cor escolhida.
- **Simulação elétrica em tempo real**: ao iniciar, o circuito é energizado e somente os trechos percorridos por corrente real — fios, terminais, contatos e cargas — ficam destacados em vermelho. Ramos abertos ou sem corrente permanecem neutros.
- **Seleção múltipla e inspetor sob demanda**: clique em um componente ou fio para abrir o inspetor; use Ctrl+clique para selecionar vários itens, arraste para mover o grupo, Ctrl+D para duplicar e Del para excluir. O inspetor fica oculto quando não há seleção.
- **Inversor AD600M completo**: réplica da IHM física (teclado PRG/SELETOR/RUN/STOP), navegação por grupos de parâmetros igual ao equipamento real, busca rápida de parâmetros, e um painel de controle que pode ser aberto a qualquer momento clicando no próprio inversor na bancada.
- **Comando e I/O fiéis ao manual**: entradas digitais NPN (DI1–DI4 em relação ao COM), comando a dois e três fios, fonte 24V/COM disponível quando o inversor está energizado, e relé de saída TA/TB/TC configurável.
- **Relés temporizados** com bobina KT (terminais A1/A2) e contatos temporizados NA (1/2), NF (3/4) e NA+NF (15 comum, 16 NF e 18 NA), em modos ON-delay e OFF-delay, integrados ao solver elétrico.
- **Exemplos prontos**: partida via IHM, selo de contator alimentado pelo 24V do inversor e comando a três fios.
- **Motor de indução trifásico parametrizável**: edite a plaqueta de dados (potência, tensão, corrente, frequência, velocidade, número de polos, fator de potência, rendimento) e veja o comportamento do motor responder de acordo.
- **Indicador de operação**: mostra se a simulação está parada ou rodando, a frequência de saída e o sentido de rotação efetivo do motor (horário ou anti-horário).
- **Osciloscópio**: gráficos em tempo real de frequência de saída, corrente, tensão e velocidade do motor.
- **Biblioteca de exercícios guiados**: montagens típicas (como partida via IHM) com verificação automática de objetivo atingido.
- **Interface bilíngue** (Português / English), com tema claro e escuro.
- **Funciona offline**: depois do primeiro acesso, o Service Worker mantém o simulador disponível sem internet — útil para uso em laboratórios ou salas sem rede estável.
- **Salvar/abrir projetos** em `.json` e exportar o diagrama do circuito como imagem `.svg`.

## Capturas de tela

<p align="center">
  <img src="docs/screenshots/01-bancada.png" alt="Bancada com comando a três fios, inversor selecionado e motor em operação" width="820"><br>
  <em>Bancada de montagem — comando a três fios (S1/S2/S3), inversor selecionado no inspetor e motor girando a 50 Hz no sentido horário; somente os trechos percorridos por corrente real ficam vermelhos.</em>
</p>

<p align="center">
  <img src="docs/screenshots/02-ihm.png" alt="IHM do inversor AD600M" width="820"><br>
  <em>IHM & Parâmetros — réplica do teclado físico, navegação por grupos e busca rápida de parâmetros.</em>
</p>

<p align="center">
  <img src="docs/screenshots/03-osciloscopio.png" alt="Osciloscópio com gráficos em tempo real" width="820"><br>
  <em>Osciloscópio — frequência, corrente, tensão e velocidade do motor em tempo real.</em>
</p>

<p align="center">
  <img src="docs/screenshots/04-exercicios.png" alt="Biblioteca de exercícios guiados" width="820"><br>
  <em>Exercícios guiados com verificação automática de objetivo.</em>
</p>

<p align="center">
  <img src="docs/screenshots/05-cores-fio.png" alt="Inspetor de fio com paleta de cores e vértices de trajeto" width="820"><br>
  <em>Fiação — inspetor sob demanda, paleta de cores rápida, últimas cores usadas e vértices arrastáveis.</em>
</p>

<p align="center">
  <img src="docs/screenshots/06-selecao-multipla.png" alt="Seleção múltipla de componentes e inspetor resumido" width="820"><br>
  <em>Seleção múltipla com Ctrl+clique — inspetor resume componentes e fios selecionados e permite mover, duplicar ou excluir o grupo.</em>
</p>

<p align="center">
  <img src="docs/screenshots/07-temporizadores.png" alt="Símbolos de temporizador na categoria Comando" width="820"><br>
  <em>Temporizadores em Comando — bobina KT em duas seções, contatos NA 1/2, NF 3/4 e NA+NF 15/16/18.</em>
</p>

## Como usar

Não é necessário instalar nada. Basta abrir o `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox) — ou acessar a versão publicada:

**[Acessar o InverterLab online »](http://caiobondarchuk.github.io/inverterlab_simulador-inversor-de-frequencia)**

Para rodar localmente a partir do repositório clonado, qualquer servidor estático funciona, por exemplo:

```bash
git clone https://github.com/caiobondarchuk/inverterlab_simulador-inversor-de-frequencia
cd inverterlab_simulador-inversor-de-frequencia
python3 -m http.server 8080
# depois abra http://localhost:8080 no navegador
```

> Abrir o `index.html` diretamente com duplo clique (`file://`) também funciona para uso pessoal, mas o Service Worker (que habilita o uso offline) só é registrado corretamente quando o site é servido por `http://` ou `https://`.

## Estrutura do projeto

```
inverterlab_simulador-inversor-de-frequencia/
├── index.html              # aplicação completa (HTML + CSS + JS em um único arquivo)
├── manifest.webmanifest     # manifesto PWA (ícone, nome, cores)
├── sw.js                    # Service Worker — habilita uso offline
├── _nojekyll                 # evita que o GitHub Pages processe o site com Jekyll
├── icons/                   # ícones do PWA em diferentes tamanhos
└── scripts/
    └── baixar-fontes.js     # utilitário Node opcional: baixa as fontes do Google Fonts
                              # localmente, deixando o simulador 100% offline
```

### Sobre o `scripts/baixar-fontes.js`

Por padrão, o InverterLab carrega as fontes (Roboto Condensed e JetBrains Mono) do Google Fonts pela internet. Esse script opcional baixa essas fontes e as referencia localmente, para quem quiser um pacote totalmente independente de internet (por exemplo, para distribuir em computadores de laboratório sem acesso à rede). Requer Node.js instalado:

```bash
node scripts/baixar-fontes.js .
```

## Tecnologias

Construído inteiramente com **HTML, CSS e JavaScript puro** — sem frameworks, sem dependências de build. A ideia é que o projeto inteiro seja um único arquivo portátil, fácil de auditar, modificar e distribuir.

## Aviso legal

Este é um **projeto educacional independente e não oficial**, sem qualquer vínculo com a Altus Sistemas de Automação S.A. O simulador foi desenvolvido com base em manuais técnicos públicos do inversor Altus AD600M para fins de ensino. Nomes, marcas e modelos mencionados pertencem aos seus respectivos titulares.

## Autores

Desenvolvido por:

- **Caio Bondarchuk** — [github.com/caiobondarchuk](https://github.com/caiobondarchuk)
- **Breno Rossi** — [github.com/brossi73](https://github.com/brossi73)

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

Copyright (c) 2026 Caio Bondarchuk and Breno Rossi
