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
| **V07** | Revisão da biblioteca |
| **V08** | Roteamento ortogonal automático de fios |
| **V09** | Emendas (nós) de fios |
| **V10** | SimInversor bilíngue (EN/PT) e créditos |
| **InverterLab V10** | Rebatismo para InverterLab e base de parâmetros do manual |
| **InverterLab V1.1** | Remoção dos sensores, movimento de fios e revisão do AD600M |
| **InverterLab V1.2** | Interface sem o modelo AD600M |
| **InverterLab V1.3** | Brilho vermelho somente com corrente real e novo indicador de sentido |

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
| InverterLab V1.1 | 451 KB | 4.210 | 136 | 562 | 26 (inclui 7 alimentações) + emenda |
| InverterLab V1.2 | 460 KB | 4.224 | 136 | 562 | 27 (inclui 7 alimentações) + emenda |

*Tamanho, linhas, funções JavaScript e parâmetros medidos nos arquivos de cada versão. Os 113 parâmetros da V03 à V10, os 574 do InverterLab V10 e os 562 do V1.1/V1.2 são códigos distintos (P0-00, P0-01 etc.).*

---

## V03 — Base funcional (primeira versão documentada)

**Arquivo:** `SimInversor - Altus AD600M - V03.html`

### O que foi adicionado

- **Aplicação em arquivo único** (HTML + CSS + JavaScript), com tema claro/escuro e fontes Roboto Condensed e JetBrains Mono.
- **Menus e barra rápida:** Arquivo (novo, abrir, salvar como `.json`, exportar imagem `.svg`, carregar exemplo), Editar (desfazer, refazer, duplicar, excluir, limpar ligações/bancada), Ver (grade, rótulos, zoom, ajuda com F1) e atalhos de teclado. Barra rápida com Iniciar/Parar simulação, Grade, Rótulos e Zoom.
- **Quatro abas:** Bancada, IHM & Parâmetros, Osciloscópio e Biblioteca.
- **Bancada de montagem:** editor SVG com grade de 20 px, paleta por categoria, arrastar e soltar, rotação de 90°, fiação entre terminais e painel de propriedades. 16 componentes: rede trifásica 380 V, fonte 24 VCC, disjuntor tripolar, inversor AD600M, motor trifásico, botoeiras NA e NF, chave seletora, potenciômetro (AI1), contator, sensor indutivo, fim de curso, lâmpada piloto, buzina, CLP simulado (Modbus RTU) e bloco de bornes.
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
- **Painel do inversor em janela:** botão "Abrir painel do inversor (RUN/STOP/parâmetros)" no painel de propriedades e clique direto no inversor, com RUN, STOP, JOG, reset de falha e acesso aos parâmetros.
- **Bloqueio de edição durante a simulação:** adicionar, excluir, ligar ou alterar propriedades só é possível com a simulação parada; o painel de propriedades mostra aviso e o potenciômetro só gira com a simulação ativa.
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
- **Sistema de TAGs:** campo de identificação (K1, Q1, S0, S1 etc.) no painel de propriedades. Contatos e contatos de potência acompanham a bobina de mesma TAG, como em um diagrama real.
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
- **Remover todas as ligações**, com avisos quando a ação não é permitida durante a simulação.
- **Arrastar o segmento do fio** para ajustar o trajeto, com botão "Redefinir trajeto" no painel de propriedades do fio.
- **Realce luminoso nos fios energizados** (filtro de brilho `wglow`).
- **Paleta com ícones reais:** cada item da paleta passa a exibir o próprio símbolo esquemático (`palIcon`).
- **Painel do inversor com leitura ao vivo:** frequência de saída em destaque com cor por estado (parado, em operação, falha) e linha de status com sentido FWD/REV.

### Como foi feito

Os itens de menu Desfazer, Refazer e Remover ligações já existiam na interface, mas passaram a ter implementação nesta versão. O histórico usa instantâneos serializados da bancada (`recordHistory`, `restoreSnap`, `undo`, `redo`), registrados nas alterações da bancada. O arraste de segmento grava um deslocamento (`bend`) no fio e redesenha o trajeto ortogonal. O painel do inversor passou a ser atualizado dinamicamente (`live` / `calcLive`), lendo o estado do inversor em vez de ser estático. Alteração de cerca de 148 linhas.

---

## V07 — Revisão da biblioteca

**Arquivo:** `SimInversor_Altus_AD600M_V07.html`

### O que foi adicionado

- **Novos componentes:** sensor capacitivo (NA) e disjuntor monopolar.
- **Disjuntor mais fiel ao símbolo real:** acionamento manual com ligação mecânica tracejada e bloco de proteção termomagnética (térmico e magnético por polo).
- **Redimensionamento** do potenciômetro, dos sensores e da buzina para acomodar melhor os símbolos.
- **Biblioteca enxuta:** o bloco de bornes foi retirado; os exemplos e os exercícios foram reduzidos a "Partida simples via IHM" (o exemplo foi renomeado de "Partida básica (IHM)").

### Como foi feito

Os desenhos do disjuntor foram refeitos com o bloco termomagnético e a biblioteca recebeu os novos componentes. Os exemplos e exercícios foram reduzidos a um único roteiro, o de partida simples. Alteração de cerca de 252 linhas.

---

## V08 — Roteamento ortogonal automático de fios

**Arquivo:** `SimInversor_Altus_AD600M_V08.html`

### O que foi adicionado

- **Roteamento automático dos fios:** fios paralelos deixam de se sobrepor e são afastados em múltiplos de 10 px, mantendo apenas linhas retas (horizontais e verticais).
- **Brilho dos fios e dos símbolos mais suave**, reduzindo o excesso de realce da versão anterior.
- **Clique em componentes não acionáveis** durante a simulação.

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

A emenda foi implementada como um componente especial (`juncao`) de tamanho zero e um único terminal, oculto da paleta. `nearestOnWire` encontra o ponto do fio mais próximo do mouse e `splitWireAt` substitui o fio original por dois fios ligados à emenda, preservando as propriedades do fio. `connectToWire` trata o caso de soltar uma ligação em andamento sobre um fio. Como a emenda é um nó comum do grafo, o solver e o roteamento passam a tratá-la sem regras adicionais. Alteração de cerca de 74 linhas.

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

## InverterLab V1.1 — Sensores removidos e fiação estilo FluidSim

**Arquivo:** `index.html`

### O que foi adicionado

- **Biblioteca revisada:** a categoria **Sensores** e todos os componentes associados (sensor indutivo, sensor capacitivo e fim de curso) foram removidos, incluindo renderização, acionamento e traduções. A paleta foi reorganizada nas categorias Alimentação, Proteção, Inversor, Motor, Comando e Sinalização, além da emenda oculta.
- **Movimento de fios estilo FluidSim:** segmentos podem ser arrastados para criar desvios; vértices brancos ajustam o trajeto; emendas podem ser movidas com Shift; o roteamento automático continua sendo usado quando não há waypoints.
- **Exemplos novos:** partida simples via IHM, selo de contator alimentado pelo 24V do inversor e comando a três fios (FWD/REV/parada), todos com presets de parâmetros.
- **Marca:** removidas as referências à Altus da interface do simulador, do manifest e do service worker. A documentação mantém a referência ao equipamento e o aviso legal.

### Correções e revisão técnica

- **Comando a três fios:** implementados os dois tipos previstos no manual (entrada de parada NF que abre para parar e entrada NO que fecha para parar), com FWD/REV por borda de subida e retenção do estado de marcha.
- **Entradas digitais NPN:** DI1–DI4 passam a ser lidas pela continuidade com o `COM` do inversor, e não pela presença direta de 24 V.
- **Fonte 24V/COM do inversor:** os terminais 24V e COM só ficam ativos quando o inversor está energizado, como no equipamento real. O solver separa os domínios CA e CC para impedir que um potencial alimente indevidamente o outro.
- **Parâmetros do AD600M:** P0-20 passou a ser um enum de casas decimais (1 ou 2), com limite de P0-14 alterado dinamicamente; P0-21 define a faixa/resolução de P0-23 e P0-24 (0–30000 s, 0–3000,0 s ou 0–300,00 s); P0-22 seleciona a referência da rampa; P5-15/P5-17 têm faixas mútuas; P7-29/P7-30 usam os padrões `0x441F` e `0x0043` e edição hexadecimal.
- **Curva V/F e proteções:** a curva V/F segue P2-00; a perda de fase na saída gera `Err24` somente quando há pelo menos uma fase do motor conectada; o barramento nominal passou a 380 V e o motor entra em roda livre em falha.
- **Circuito de selo:** corrigida a alimentação do selo pelo 24V/COM do inversor e o intertravamento com o contator, com testes de comportamento para os exemplos de selo e três fios.
- **IHM:** o status do inversor é atualizado imediatamente ao carregar um exemplo, sem exigir o início da simulação. O painel também foi centralizado em telas largas.
- **Contraste:** botões de exclusão e avisos de falha passaram a usar a cor de texto do tema, ficando legíveis no tema claro.

### Como foi feito

A remoção dos sensores foi feita eliminando as entradas da biblioteca e os ramos de atuação/renderização que existiam no editor, no solver e no dicionário de tradução.

O editor de fios passou a materializar waypoints ao arrastar um segmento ou vértice, preservando o trajeto manual e voltando ao roteamento automático quando o usuário usa "Redefinir trajeto". Os exemplos foram ampliados e o carregador passou a reinicializar os modelos do inversor e do motor logo após a carga, para que a IHM e o painel de status reflitam o circuito sem precisar iniciar a simulação.

---

## InverterLab V1.2 — Interface sem o modelo

**Arquivo:** `index.html`

### O que foi adicionado

- **Interface sem o modelo:** as referências visíveis ao **AD600M** foram removidas do título, da marca, do painel do inversor, dos exercícios, da ajuda, dos créditos, do gabinete desenhado na bancada e do manifest. A interface passou a usar "Inversor de Frequência" e o gabinete mostra "INVERSOR". O identificador interno `inversor-ad600m` foi mantido para compatibilidade com projetos salvos.

### Como foi feito

A remoção do modelo da interface foi feita substituindo apenas as strings visíveis e os textos do gabinete, sem renomear o tipo interno nem os parâmetros do manual. O dicionário inglês foi atualizado para que a troca de idioma não reintroduzisse o nome antigo, e o manifest e o Service Worker receberam textos genéricos e a nova versão de cache.

---

## InverterLab V1.3 — Corrente real e indicador de sentido

**Arquivo:** `index.html`

### O que foi adicionado

- **Brilho vermelho somente com corrente real:** durante a simulação, apenas fios, terminais, contatos e cargas que fazem parte de um caminho fechado de corrente recebem o destaque vermelho. Ramos abertos, fios sem retorno e trechos apenas energizados sem circulação de corrente permanecem na cor normal.
- **Novo cálculo de fluxo:** o `NetworkSolver` passou a construir um grafo de condução com arestas identificadas e a decompô-lo em blocos biconectados (block-cut). Para cada carga energizada, são marcadas somente as arestas que pertencem a um caminho simples entre a carga e a fonte de potencial correspondente.
- **Indicador de operação com sentido:** o estado da bancada passou a mostrar “Horário” ou “Anti-horário” conforme o sentido efetivo do motor/inversor, além da frequência de saída.
- **Menu de exemplos enxuto:** a aba **Carregar exemplo** passou a oferecer apenas partida via IHM, selo de contator e comando a três fios, mantendo os presets de parâmetros de cada montagem.

### Correções e revisão técnica

- **Estados de rede simplificados:** os antigos estados `reached` e `cglow` foram substituídos por `current:<id>`, `current:<id>:<termo>` e `wglow:'current'`, todos calculados a partir do fluxo real.
- **Compatibilidade preservada:** o tipo interno `inversor-ad600m` e os códigos de parâmetro do manual foram mantidos.
- **Cache offline:** o Service Worker passou a usar `inverterlab-1.3.0`.
- **Captura da bancada atualizada:** o print `01-bancada.png` agora mostra o exemplo de comando a três fios (S1/S2/S3) e o motor girando a 50 Hz no sentido horário, com apenas os trechos de corrente real em vermelho.

### Como foi feito

O solver elétrico continua resolvendo a condução e os potenciais como antes, mas agora devolve também a lista de arestas com origem, destino e tipo (fio ou componente). O cálculo de fluxo percorre essa lista, encontra os blocos biconectados e, para cada carga (bobina, lâmpada, buzina, potenciômetro ou motor), marca o caminho até a fonte. O editor usa esses conjuntos para colorir símbolos, terminais e fios.

O indicador consulta o sentido efetivo do inversor e a rotação real do motor para exibir horário ou anti-horário.

---
