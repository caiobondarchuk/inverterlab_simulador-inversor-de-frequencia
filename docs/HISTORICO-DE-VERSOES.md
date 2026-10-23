# InverterLab / SimInversor — Altus AD600M

## Histórico de versões

Simulador educacional do inversor de frequência Altus AD600M, executado inteiramente no navegador (um único arquivo HTML com CSS e JavaScript). Este documento registra, versão a versão, o que foi adicionado e como cada mudança foi implementada. As informações foram levantadas comparando o código-fonte de cada arquivo com o da versão anterior.

- **Repositório:** https://github.com/caiobondarchuk/inverterlab_simulador-inversor-de-frequencia
- **Versão publicada (GitHub Pages):** http://caiobondarchuk.github.io/inverterlab_simulador-inversor-de-frequencia/
- **Desenvolvimento:** Caio Bondarchuk e Breno Rossi

---

## Resumo das versões

| Versão | Destaque |
|---|---|
| **V03** | Base funcional (primeira versão documentada) |
| **V04** | Simbologia esquemática e painel do inversor |
| **V05** | Simbologia IEC 60617 / NBR 12522, potenciais por fase e TAGs |
| **V06** | Edição avançada e realce dos fios |
| **V07** | Cores por tipo de corrente e revisão da biblioteca |
| **V08** | Roteamento ortogonal automático de fios |
| **V09** | Emendas (nós) de fios |
| **V10** | SimInversor bilíngue (EN/PT) e créditos |
| **InverterLab V10** | Rebatismo para InverterLab e base de parâmetros do manual |

### Evolução em números

| Versão | Tamanho | Linhas | Funções | Parâmetros | Tipos de componente |
|---|---|---|---|---|---|
| V03 | 135 KB | 2.591 | 87 | 113 | 16 |
| V04 | 150 KB | 2.797 | 91 | 113 | 16 |
| V05 | 159 KB | 2.832 | 94 | 113 | 22 + 7 alimentações |
| V06 | 165 KB | 2.936 | 103 | 113 | 22 + 7 alimentações |
| V07 | 167 KB | 2.920 | 104 | 113 | 23 + 7 alimentações |
| V08 | 170 KB | 2.970 | 110 | 113 | 23 + 7 alimentações |
| V09 | 174 KB | 3.020 | 113 | 113 | 24 (inclui emenda) + 7 alimentações |
| V10 | 209 KB | 3.096 | 120 | 113 | 23 + 7 alimentações |
| InverterLab V10 | 422 KB | 3.689 | 171 | 574 | 23 + 7 alimentações |

*Tamanho, linhas, funções JavaScript e parâmetros medidos nos arquivos de cada versão. Os 113 parâmetros da V03 à V10 e os 574 do InverterLab V10 são códigos distintos (P0-00, P0-01 etc.).*

---

## V03 — Base funcional (primeira versão documentada)

**Arquivo:** `SimInversor - Altus AD600M - V03.html`

### O que foi adicionado

- **Aplicação em arquivo único** (HTML + CSS + JavaScript), com tema claro/escuro e fontes Roboto Condensed e JetBrains Mono.
- **Menus e barra rápida:** Arquivo (novo, abrir, salvar como `.json`, exportar imagem `.svg`, carregar exemplo), Editar (desfazer, refazer, duplicar, excluir, limpar ligações/bancada), Ver (grade, rótulos, zoom, ajuda com F1) e atalhos de teclado. Barra rápida com Iniciar/Parar simulação, Grade, Rótulos e Zoom.
- **Quatro abas:** Bancada, IHM & Parâmetros, Osciloscópio e Biblioteca.
- **Bancada de montagem:** editor SVG com grade de 20 px, paleta por categoria, arrastar e soltar, rotação de 90°, fiação entre terminais e inspetor de propriedades. 16 componentes: rede trifásica 380 V, fonte 24 VCC, disjuntor tripolar, inversor AD600M, motor trifásico, botoeiras NA e NF, chave seletora, potenciômetro (AI1), contator, sensor indutivo, fim de curso, lâmpada piloto, buzina, CLP simulado (Modbus RTU) e bloco de bornes.
- **Simulação elétrica:** módulo `NetworkSolver` que propaga a alimentação pelos fios e componentes, classifica o estado de cada terminal (CA ou 24 VCC) e detecta condições como falta de fase.
- **IHM do AD600M:** display e teclas (PRG, QUICK, ≫, ENTER, RUN, STOP, ▲/▼), 113 parâmetros organizados em 29 grupos (P0–PF, A0–A3, B0–B6, U0–U1), 21 códigos de falha (Err01–Err34), funções das entradas e saídas digitais e botão de reset de falha.
- **Motor trifásico:** modelo V/F simplificado, com escorregamento, corrente (magnetização de cerca de 30% da nominal mais componente de carga), temperatura e percentual de carga, tudo relativo à plaqueta definida nos parâmetros do grupo P4.
- **Osciloscópio:** quatro gráficos em tempo real com histórico (frequência, corrente, rotação e tensão).
- **Biblioteca de exercícios guiados** com verificação automática de progresso: Partida simples via IHM (Iniciante), Partida por botoeiras a 2 fios e Referência de velocidade por potenciômetro (Intermediário), Diagnóstico de falha por falta de fase e Intertravamento com contator (Avançado).
- **Exemplos prontos** carregáveis pelo menu: Partida básica (IHM), Partida por botoeira (DI1) e Velocidade por potenciômetro.

### Como foi feito

A V03 foi estruturada em camadas dentro do mesmo arquivo, na ordem em que são carregadas: base de dados de parâmetros e códigos de falha, biblioteca de componentes, `NetworkSolver`, `CircuitEditor` (editor da bancada), `IHM`, e por fim as telas (gráficos, biblioteca de exercícios, exemplos e modais). Cada componente é descrito por dados (tipo, categoria, tamanho em unidades de grade, terminais e propriedades) e desenhado por uma função de renderização por tipo.

Nesta versão os componentes eram desenhados como caixas escuras com ícones estilizados (por exemplo, botão redondo para a botoeira e gabinete retangular para o contator). A aparência ainda não seguia simbologia elétrica normalizada.

---

## V04 — Simbologia esquemática e painel do inversor

**Arquivo:** `SimInversor - Altus AD600M - V04.html`

### O que foi adicionado

- **Símbolos esquemáticos no lugar das caixas:** motor (círculo com M e 3~), botoeiras NA e NF (contato com acionamento tracejado), chave seletora, potenciômetro (resistor com seta), contator (bobina A1/A2 e contato), sensor indutivo (losango), fim de curso, lâmpada piloto (círculo), buzina (triângulo), fontes CA trifásica e CC e disjuntor (chave tripolar). O inversor permaneceu como o único componente desenhado como equipamento real.
- **Sinalização de energizado por componente:** o símbolo fica vermelho quando há corrente circulando (alimentação mais referência), em vez de apenas quando um terminal toca a fonte.
- **Fios vivos:** os fios que conduzem tensão passam a ser destacados em vermelho durante a simulação, com brilho.
- **Painel do inversor em janela:** botão "Abrir painel do inversor (RUN/STOP/parâmetros)" no inspetor e clique direto no inversor, com RUN, STOP, JOG, reset de falha e acesso aos parâmetros.
- **Bloqueio de edição durante a simulação:** adicionar, excluir, ligar ou alterar propriedades só é possível com a simulação parada; o inspetor mostra aviso e o potenciômetro só gira com a simulação ativa.
- **Interação refinada:** área de clique própria (`comp-hitarea`) para cada componente. Com a simulação rodando, botoeiras, chave, disjuntor, sensor e fim de curso apenas são acionados, sem serem arrastados.

### Como foi feito

O corpo de cada componente passou a ser gerado por um bloco `case` por tipo, desenhando linhas, círculos e caminhos SVG com as cores de estado. Para a sinalização, o solver passou a registrar `energized:<id>` para cada instância e `wirelive:<id>` para cada fio, calculados a partir dos conjuntos de nós alimentados e de referência.

O controle de acesso foi feito com uma flag única de simulação (`simRunning`) consultada pelos eventos do editor. Foram acrescentadas as funções `openInverterPanel` e `showInverterPanelModal`. A alteração tocou cerca de 380 linhas do arquivo.

---

## V05 — Simbologia IEC 60617 / NBR 12522, potenciais por fase e TAGs

**Arquivo:** `SimInversor_Altus_AD600M_V05.html`

### O que foi adicionado

- **Layout vertical e terminais numerados:** entrada em cima e saída embaixo. Disjuntores com bornes 1-2, 3-4, 5-6; botoeiras com 13/14 (NA) e 11/12 (NF); bobina com A1/A2.
- **Alimentações separadas por potencial:** a rede e a fonte deixam de ser blocos únicos e passam a ser fontes individuais L1, L2, L3, N, PE, +24 V e 0 V, que o usuário conecta uma a uma.
- **Novos componentes:** disjuntor bipolar, disjuntor-motor (termomagnético), bobina de contator, contato NA, contato NF e contatos de potência 3P.
- **Sistema de TAGs:** campo de identificação (K1, Q1, S0, S1 etc.) no inspetor. Contatos e contatos de potência acompanham a bobina de mesma TAG, como em um diagrama real.
- **Exemplo "Comando com selo (K1)"** em estilo CADe_SIMU, com botoeira de desliga, botoeira de liga, contato de selo, bobina e sinaleiro.
- **Correção do clique no inversor:** a área de clique ficava atrás do corpo do componente e o inversor não recebia o evento; passou a ficar por cima.
- **Compatibilidade:** projetos salvos em versões anteriores são convertidos automaticamente (função `migrate`), incluindo a divisão das fontes e a troca de contator por bobina.

### Como foi feito

O solver de rede foi reescrito. Foram removidas as rotinas de grafo único (`buildAdjacency`, `bfsMark`, `markSources`, `internalConduction`, `addEdge`) e criada uma propagação de potenciais (`potentials`): a busca parte de cada terminal de alimentação, atravessa fios e contatos fechados e registra quais potenciais alcançam cada nó. Bobinas, lâmpadas e motor funcionam como cargas e não conduzem. A memória do estado da bobina sustenta o selo.

As definições originais da biblioteca foram sobrescritas por um bloco de ajustes (tamanho, terminais com direção, prefixo de TAG) e a renderização foi dividida em `renderSym`, `contactSym` e `termDir`. A atualização visual passou a ser incremental (`refreshLive`), redesenhando apenas o que mudou, o que evita perder cliques durante a simulação. Alteração de cerca de 511 linhas.

---

## V06 — Edição avançada e realce dos fios

**Arquivo:** `SimInversor_Altus_AD600M_V06.html`

### O que foi adicionado

- **Desfazer e refazer** (Ctrl+Z / Ctrl+Y) com histórico de estados da bancada.
- **Duplicar componente** (Ctrl+D) e **remover todas as ligações**, com avisos quando a ação não é permitida durante a simulação.
- **Arrastar o segmento do fio** para ajustar o trajeto, com botão "Redefinir trajeto" no inspetor do fio.
- **Realce luminoso nos fios energizados** (filtro de brilho `wglow`).
- **Paleta com ícones reais:** cada item da paleta passa a exibir o próprio símbolo esquemático (`palIcon`).
- **Painel do inversor com leitura ao vivo:** frequência de saída em destaque com cor por estado (parado, em operação, falha) e linha de status com sentido FWD/REV.

### Como foi feito

Os itens de menu Desfazer, Refazer, Duplicar e Remover ligações já existiam na interface, mas passaram a ter implementação nesta versão. O histórico usa instantâneos serializados da bancada (`recordHistory`, `restoreSnap`, `undo`, `redo`), registrados nas alterações da bancada. O arraste de segmento grava um deslocamento (`bend`) no fio e redesenha o trajeto ortogonal. O painel do inversor passou a ser atualizado dinamicamente (`live` / `calcLive`), lendo o estado do inversor em vez de ser estático. Alteração de cerca de 148 linhas.

---

## V07 — Cores por tipo de corrente e revisão da biblioteca

**Arquivo:** `SimInversor_Altus_AD600M_V07.html`

### O que foi adicionado

- **Código de cores por tipo de potencial:** fase (CA) em vermelho, +24 V em amarelo, 0 V em azul escuro, neutro em azul claro e terra (PE) em verde, aplicado a símbolos e fios energizados durante a simulação.
- **Novos componentes:** sensor capacitivo (NA) e disjuntor monopolar.
- **Disjuntor mais fiel ao símbolo real:** acionamento manual com ligação mecânica tracejada e bloco de proteção termomagnética (térmico e magnético por polo).
- **Redimensionamento** do potenciômetro, dos sensores e da buzina para acomodar melhor os símbolos.
- **Biblioteca enxuta:** o bloco de bornes foi retirado; os exemplos e os exercícios foram reduzidos a "Partida simples via IHM" (o exemplo foi renomeado de "Partida básica (IHM)").

### Como foi feito

Foi criada a função `kindOf`, que classifica o conjunto de potenciais que alcançam um nó em CA, CC, neutro, 0 V ou PE, e uma tabela de cores (`KCOL`) usada na pintura dos símbolos, no lugar do vermelho único das versões anteriores. Os desenhos do disjuntor foram refeitos com o bloco termomagnético. Os exemplos e exercícios foram reduzidos a um único roteiro, o de partida simples. Alteração de cerca de 252 linhas.

---

## V08 — Roteamento ortogonal automático de fios

**Arquivo:** `SimInversor_Altus_AD600M_V08.html`

### O que foi adicionado

- **Roteamento automático dos fios:** fios paralelos deixam de se sobrepor e são afastados em múltiplos de 10 px, mantendo apenas linhas retas (horizontais e verticais).
- **Brilho dos fios e dos símbolos mais suave**, reduzindo o excesso de realce da versão anterior.
- **Seleção ao clicar** em componentes não acionáveis durante a simulação.

### Como foi feito

A função de caminho do fio foi dividida em etapas: `routeCtx` (contexto do fio), `buildPts` (pontos do trajeto), `segsOf` (segmentos que não encostam nos terminais), `candidates` (posições candidatas de curva, testadas em passos de 10 px para os dois lados) e `computeLayout` (percorre todos os fios, escolhe para cada um a primeira posição sem conflito com os já posicionados e preserva os trajetos definidos manualmente pelo usuário). `relayout` recalcula tudo quando um fio é criado, movido ou removido. Alteração de cerca de 100 linhas.

---

## V09 — Emendas (nós) de fios

**Arquivo:** `SimInversor_Altus_AD600M_V09.html`

### O que foi adicionado

- **Emenda (nó) entre fios:** duplo clique sobre um fio cria uma emenda e, a partir dela, é possível arrastar outro fio. Soltar um fio em andamento sobre outro fio também cria a emenda.
- **Mover emendas** com Shift + arrastar. Emendas não aparecem na paleta e não podem ser duplicadas.
- **Dica de uso atualizada** na barra da bancada, explicando a ligação por emenda.

### Como foi feito

A emenda foi implementada como um componente especial (`juncao`) de tamanho zero e um único terminal, oculto da paleta. `nearestOnWire` encontra o ponto do fio mais próximo do mouse e `splitWireAt` substitui o fio original por dois fios ligados à emenda, mantendo a cor. `connectToWire` trata o caso de soltar uma ligação em andamento sobre um fio. Como a emenda é um nó comum do grafo, o solver e o roteamento passam a tratá-la sem regras adicionais. Alteração de cerca de 74 linhas.

---

## V10 — SimInversor bilíngue (EN/PT) e créditos

**Arquivo:** `SimInversor_Altus_AD600M_V10.html`

### O que foi adicionado

- **Alternância de idioma EN / PT** na barra superior, com inglês como padrão e a escolha lembrada entre sessões.
- **Menu Créditos** e janela de créditos com os autores (Caio Bondarchuk e Breno Rossi), além de crédito na ajuda e na marca do topo.
- **Remoção do CLP simulado** da biblioteca de componentes.
- **Símbolos de contatos NA/NF e de sinalização redesenhados** e terminais de alguns componentes realinhados à grade.
- **Rótulos dos componentes** passam a obedecer ao botão Rótulos e se afastam quando há terminal na parte de cima.

### Como foi feito

A tradução foi feita sem alterar o código da interface: um segundo bloco de script contém um dicionário português para inglês e regras por expressão regular para mensagens com variáveis (por exemplo "X adicionado" e "Exemplo carregado: X"). As funções `T`, `tnode`, `tattr` e `walk` percorrem o DOM e traduzem textos e atributos, e `setLang` alterna o idioma e grava a preferência no navegador. A janela de créditos (`showCreditsModal`) foi ligada ao novo item de menu. Alteração de cerca de 130 linhas.

---

## InverterLab V10 — Rebatismo para InverterLab e base de parâmetros do manual

**Arquivo:** `InverterLab_V10.html`

### O que foi adicionado

- **Nova identidade:** nome InverterLab, logotipo (versões para tema claro e escuro, embutidas no arquivo) e favicon. A marca informa "Baseado no Altus AD600M · Educacional". O título da página passa a ser "InverterLab — Simulador educacional de inversores de frequência".
- **Base de parâmetros reconstruída a partir do Manual do Usuário AD600M (Rev. B) e do Guia de Aplicação Rápida:** de 113 para 574 parâmetros distintos, com nomes de grupos revisados (por exemplo, Parâmetros do Primeiro Motor, Terminais de Entrada, Função PID, Multissegmento e PLC Simples), faixas, unidades, listas de opções e descrições. O grupo de monitoramento U1 passa de 11 para 43 entradas e o registro de falhas U0 passa a ter 32.
- **Códigos de falha ampliados:** de 21 para 30.
- **Funções dos terminais derivadas dos parâmetros:** as listas de funções das entradas e saídas digitais agora vêm das opções de P5-00 e P6-00, em vez de listas separadas.
- **Comportamento do inversor guiado pelos parâmetros:** fonte do comando de partida (P0-04), fonte da referência de frequência (digital, AI1 ou multivelocidade), limites superior e inferior (P0-15 / P0-16 / P0-18), sentido de rotação (P0-13), frequência de partida (P1-04), parada livre (P1-13), JOG (P7-00), comando a dois fios, reset de falha e falha externa por terminal.
- **Saída a relé TA/TB/TC** configurável por P6-00 (em operação, falha, frequência atingida, velocidade zero, pronto, limites e subtensão), refletida na bancada: TA é o comum, TB é NF e TC é NA.
- **Inicialização de parâmetros (P0-28)** e **auto-ajuste simulado do motor (P4-00)**, estático ou rotativo, que calcula os parâmetros elétricos do motor (P4-08 a P4-11) a partir dos dados de plaqueta.
- **Monitoramento sincronizado:** os parâmetros U0/U1 (frequência, referência, tensão, corrente, potência, estado das DIs e do relé, AI1, rotação, tempo energizado e estado de operação) refletem o inversor em tempo real.
- **Proteção de parâmetros:** parâmetros marcados com ★ não podem ser alterados com o inversor em operação, exceto os casos previstos no manual (grupos P4, A1, U0 e U1, P0-20 e P0-28).
- **Tradução EN/PT preservada** e recursos da bancada da V10 do SimInversor mantidos.

### Como foi feito

A mudança central foi a substituição da tabela de parâmetros: a tabela de 113 parâmetros foi substituída por uma tabela construída a partir do manual, mantendo o mesmo formato de registro (código, nome, valor padrão, faixa, unidade, opções e descrição). O modelo do inversor foi então ligado a esses códigos: comando, referência, limites e relé são lidos pelo código de cada parâmetro. As rotinas `handleParamInit`, `handleAutoTune`, `syncMonitors`, `blockedWhileRunning` e `invBusy` foram acrescentadas para tratar inicialização, auto-ajuste, monitoramento e bloqueio por estado.

O logotipo e o favicon foram embutidos como imagens em base64 (variável CSS `--logo` com versões clara e escura), mantendo o projeto em um único arquivo e compatível com publicação no GitHub Pages. O arquivo cresceu de 209 KB para 422 KB, principalmente pela tabela de parâmetros e pelas imagens. O identificador interno legado `__ALTUS__` foi mantido por compatibilidade.

---
