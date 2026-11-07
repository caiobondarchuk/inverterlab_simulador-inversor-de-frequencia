<p align="center">
  <img src="docs/screenshots/logo.png" alt="InverterLab" width="360">
</p>

<p align="center">
  <strong>Simulador educacional de inversores de frequência, baseado no Altus AD600M</strong><br>
  Monte circuitos de comando com simbologia elétrica real, parametrize o inversor pela IHM e veja o motor girar — tudo no navegador, sem instalar nada.
</p>

<p align="center">
  <a href="http://caiobondarchuk.github.io/inverterlab_simulador-inversor-de-frequencia" target="_blank">Acessar o InverterLab »</a><br>
  <sub><strong>Versão atual:</strong> V1.5.2</sub>
</p>

---

## O que é

O **InverterLab** nasceu de uma necessidade simples: depois de uma aula sobre inversores de frequência (usando o Altus AD600M) em um curso técnico, não havia nenhuma ferramenta gratuita para continuar praticando em casa — montar o circuito de comando, ligar os terminais certos e ajustar os parâmetros sem precisar do equipamento físico.

O InverterLab preenche essa lacuna: é uma bancada virtual onde você arrasta componentes elétricos (botoeiras, contatores, disjuntores, motor), liga os fios seguindo a simbologia padrão NBR/IEC, e simula o circuito com o inversor AD600M — IHM funcional, parâmetros reais do manual, curva V/F, e o caminho da corrente destacado visualmente enquanto o circuito está energizado.

Todo o projeto roda num único arquivo HTML, direto no navegador, sem instalação, sem backend e sem necessidade de internet depois do primeiro carregamento (funciona offline via Service Worker).

## Funcionalidades

- **Bancada de montagem** com paleta de componentes organizada por categoria (Alimentação, Proteção, Inversor, Motor, Comando, Sinalização), usando simbologia elétrica padrão (NBR/IEC) — contatos NA/NF, bobinas de contator, disjuntores, motor trifásico, botoeiras, chave seletora, potenciômetro e sinaleiros. O painel de componentes pode ser recolhido pelo botão **‹** e reaberto pela aba vertical **COMPONENTES** na borda da bancada.
- **Grade de referência alinhada ao desenho** na bancada: os pontos acompanham o pan e o zoom junto com os componentes, permanecendo sempre alinhados às suas posições. A grade pode ser ocultada ou exibida pelo botão **Grade** da barra rápida e pelo item **Ver > Alternar grade**.
- **Fiação ortogonal** com emendas (nós), arraste de terminais, movimento de segmentos e vértices no estilo FluidSim, e desfazer/refazer enquanto a simulação está parada. Com vários fios selecionados (Ctrl+clique), a cor de todos pode ser alterada de uma só vez.
- **Simulação elétrica em tempo real**: ao iniciar, o circuito é energizado e somente os trechos percorridos por corrente real — fios, terminais, contatos e cargas — ficam destacados em vermelho. Ramos abertos ou sem corrente permanecem neutros. Os sinaleiros são a exceção: acendem apenas na cor escolhida pelo usuário e não recebem o vermelho do caminho de corrente.
- **Inspetor do motor**: sempre que uma simulação é iniciada, um painel flutuante é aberto automaticamente — mesmo com o motor ainda parado — com o desenho do motor e um disco de eixo quadriculado preto/branco que gira conforme a velocidade e o sentido, com desfoque de movimento nas rotações altas para evitar o efeito estroboscópico. O painel mostra o estado (parado, acelerando, rodando, desacelerando, falha ou sem motor), rpm, frequência, sentido e carga. O símbolo do motor na bancada permanece estático. O painel permanece visível durante a simulação e pode ser recolhido pelo botão **›** no cabeçalho; uma aba vertical **INSPETOR** aparece então na borda direita da bancada e o reabre com um clique. Na próxima simulação ele volta a abrir automaticamente.
- **Inversor AD600M completo**: réplica da IHM física (teclado PRG/SELETOR/RUN/STOP), navegação por grupos de parâmetros igual ao equipamento real, busca rápida ampliada e um painel de controle que pode ser aberto a qualquer momento clicando no próprio inversor na bancada.
- **IHM com dois modos de consulta**: a **busca rápida** encontra parâmetros por código, nome, descrição, unidade, grupo ou texto das opções (por exemplo, “digital”); o **manual completo** exibe todos os parâmetros agrupados em uma janela flutuante de tamanho limitado — sem ocupar a tela inteira — com faixa, padrão, valor atual, opções, índice de grupos e busca interna. A janela fecha pelo **×**, pelo clique fora ou pela tecla **Esc**.
- **Comando e I/O fiéis ao manual**: entradas digitais NPN (DI1–DI4 em relação ao COM), comando a dois e três fios, fonte 24V/COM disponível quando o inversor está energizado, e relé de saída TA/TB/TC configurável.
- **Exemplos prontos**: partida via IHM, selo de contator alimentado pelo 24V do inversor e comando a três fios (FWD/REV/parada), com os circuitos e presets de parâmetros completos.
- **Motor de indução trifásico parametrizável**: edite a plaqueta de dados (potência, tensão, corrente, frequência, velocidade, número de polos, fator de potência, rendimento) e veja o comportamento do motor responder de acordo.
- **Indicador de operação**: mostra se a simulação está parada ou rodando, a frequência de saída e o sentido de rotação efetivo do motor (horário ou anti-horário).
- **Multimedidor**: gráficos em tempo real de frequência de saída, corrente, tensão e velocidade do motor.
- **Biblioteca de exercícios guiados**: montagens típicas (como partida via IHM) com verificação automática de objetivo atingido.
- **Interface bilíngue** (Português / English), com tema claro e escuro.
- **Funciona offline**: depois do primeiro acesso, o Service Worker mantém o simulador disponível sem internet — útil para uso em laboratórios ou salas sem rede estável.
- **Salvar/abrir projetos** em `.json` e exportar o diagrama do circuito como imagem `.svg`.

> Ao abrir o simulador, a dica de uso da bancada fica visível por 30 segundos e depois se oculta. A lista completa de atalhos está sempre disponível em **Ver > Ajuda & atalhos (F1)**.

## Capturas de tela

<p align="center">
  <img src="docs/screenshots/01-bancada.png" alt="Bancada com motor em operação, inspetor do motor e painel de componentes recolhido" width="820"><br>
  <em>Bancada de montagem — motor em operação, inspetor do motor aberto automaticamente, grade alinhada ao desenho e painel de componentes recolhido com a aba COMPONENTES.</em>
</p>

<p align="center">
  <img src="docs/screenshots/02-ihm.png" alt="Manual completo da IHM em janela flutuante limitada" width="820"><br>
  <em>IHM & Parâmetros — réplica do teclado físico, busca rápida e manual completo em janela flutuante limitada, com índice, busca interna e cartões de parâmetros.</em>
</p>

<p align="center">
  <img src="docs/screenshots/03-multimedidor.png" alt="Multimedidor com gráficos em tempo real" width="820"><br>
  <em>Multimedidor — frequência, corrente, tensão e velocidade do motor em tempo real.</em>
</p>

<p align="center">
  <img src="docs/screenshots/04-exercicios.png" alt="Biblioteca de exercícios guiados" width="820"><br>
  <em>Exercícios guiados com verificação automática de objetivo.</em>
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
