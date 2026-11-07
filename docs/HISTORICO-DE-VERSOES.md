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
| **InverterLab V1.4** | Inspetor do motor, manual da IHM, Multimedidor, grade fixa e novos exemplos |
| **InverterLab V1.5** | Inspetor sempre visível, manual em janela, grade alinhada e painel recolhível |
| **InverterLab V1.5.1** | Aba do inspetor do motor e animação de rotação mais realista |
| **InverterLab V1.5.2** | Disco quadriculado preto/branco no eixo do inspetor |

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
| InverterLab V1.4 | 499 KB | 4.668 | 228 | 575 | 27 (inclui 7 alimentações) + emenda |
| InverterLab V1.5 | 506 KB | 4.790 | 237 | 575 | 27 (inclui 7 alimentações) + emenda |
| InverterLab V1.5.1 | 507 KB | 4.818 | 239 | 575 | 27 (inclui 7 alimentações) + emenda |
| InverterLab V1.5.2 | 507 KB | 4.817 | 239 | 575 | 27 (inclui 7 alimentações) + emenda |

*Tamanho, linhas, funções JavaScript e parâmetros medidos nos arquivos de cada versão. Os 113 parâmetros da V03 à V10, os 574 do InverterLab V10 e os 562 do V1.1/V1.2 são códigos distintos (P0-00, P0-01 etc.). Os 575 da V1.4, da V1.5, da V1.5.1 e da V1.5.2 incluem P9-09; P6-01, P6-02 e P6-03 seguem pendentes de definição na fonte.*

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

## InverterLab V1.4 — Inspetor do motor, manual da IHM e Multimedidor

**Arquivo:** `index.html`

### O que foi adicionado

- **Dica de uso na bancada:** a mensagem inferior foi redesenhada com fundo escuro, borda e fonte maior, permanece visível por **30 segundos a cada abertura** do sistema e depois se oculta. Ela indica os principais comandos e informa que todos os atalhos estão em **Ver > Ajuda & atalhos (F1)**. O mesmo texto foi repetido no topo da janela de ajuda.
- **Grade fixa na tela:** o fundo quadriculado da bancada passou a ficar fixo em relação à janela, sem acompanhar pan e zoom, permanecendo sempre visível como referência. O botão “Grade” da barra rápida e o item “Alternar grade” do menu Ver foram removidos.
- **Sinaleiros com a cor do usuário:** as lâmpadas piloto não ficam mais vermelhas pelo caminho de corrente. Elas acendem apenas na cor escolhida no inspetor, com brilho da mesma cor; terminais e fios do sinaleiro permanecem neutros.
- **Inspetor automático do motor:** ao começar a girar, o motor abre um painel flutuante em um dos cantos direitos da bancada — escolhido no lado oposto ao motor, para não cobrir o componente — com o desenho do motor e um **disco preto/branco no eixo**, animado conforme a velocidade e o sentido. O painel mostra estado (acelerando, rodando, desacelerando ou falha), rpm, frequência de saída, sentido e carga, e fecha automaticamente quando o motor para.
- **Aba Multimedidor:** a antiga aba **Osciloscópio** foi renomeada para **Multimedidor**, mantendo os gráficos em tempo real de frequência, corrente, tensão e velocidade.
- **IHM com busca rápida e manual completo:** um toggle alterna entre os dois modos. A busca rápida passou a pesquisar por código, nome, descrição, unidade, grupo e texto das opções — por exemplo, “digital” encontra os parâmetros cuja descrição ou opção contenha o termo. O manual completo exibe o **Manual do Inversor de Frequência** interno, com 573 parâmetros visíveis (575 códigos na base), 29 grupos, índice lateral, busca interna, descrição, faixa, padrão, valor atual e opções, sem referências à Altus.
- **Revisão de parâmetros:** adicionado **P9-09** (tempo de detecção de realimentação de velocidade anormal no SVC, padrão 5 s, faixa 0–100,0 s, 0 desativa). A opção “Ajuste digital” de **P2-15** passou a referenciar **P2-16**, que é o parâmetro real de ajuste digital; **P2-14** não existe na fonte e não foi criado. **P6-01, P6-02 e P6-03** permanecem intocados, aguardando uma fonte com a definição correta.
- **Novos exemplos completos:** os três exemplos foram substituídos pelos circuitos e presets de parâmetros dos arquivos `partida simples via IHM.json`, `selo de contator alimentado pelo 24V do inversor.json` e `Comando a três fios FWD-REV-parada.json`. O carregamento usa `fitToContent()` para enquadrar circuitos com coordenadas negativas.
- **Cor de vários fios de uma vez:** com dois ou mais fios selecionados (Ctrl+clique), o inspetor oferece um seletor de cor e a paleta de cores rápidas, que alteram todos os fios da seleção simultaneamente.

### Correções e revisão técnica

- **Contato auxiliar K1:** o contato passou a redesenhar quando a bobina de mesma TAG muda de estado. A assinatura de renderização (`sig`) agora inclui o estado da bobina (`coilOn`), corrigindo o caso em que o contato fechava eletricamente mas o desenho continuava aberto.
- **Enquadramento ao carregar:** `fitToContent()` calcula os limites do circuito considerando a rotação dos componentes e ajusta escala e deslocamento; é chamado por `loadJSON`.
- **Compatibilidade de projetos:** a migração preserva cores de fio válidas e volta ao preto quando o valor salvo não é hexadecimal.
- **Cache offline:** o Service Worker passou a usar `inverterlab-1.4.0`.
- **Documentação:** README, notas técnicas e histórico atualizados; a captura `03-osciloscopio.png` foi renomeada para `03-multimedidor.png`.

### Como foi feito

O inspetor do motor é um painel SVG próprio atualizado pelo laço de simulação: o ângulo do disco acumula `dt × rpm × 6` e o painel só é exibido enquanto a rotação absoluta passa de 2 rpm. A cor dos sinaleiros passou a vir de `props.color`, e o realce de corrente foi excluído do tipo `lampada-piloto` tanto no corpo quanto nos terminais. A grade permanece no `#ce-bgrect`, fora do grupo `#ce-viewport` que recebe pan/zoom.

Na IHM, o modo de consulta é uma variável de estado (`quick` ou `manual`); o manual reutiliza a mesma base de `PARAMS` e gera os grupos, cartões e índice a partir de `PARAM_GROUPS`. A busca compartilha a normalização de acentos e o haystack de código, nome, descrição, unidade, grupo e opções. Os exemplos foram embutidos como objetos `circuit`/`params` extraídos dos JSONs e carregados por `CircuitEditor.loadJSON`.

---

## InverterLab V1.5 — Ajustes de usabilidade na bancada e no manual

**Arquivo:** `index.html`

### O que foi adicionado

- **Inspetor do motor sempre visível na simulação:** o painel passou a abrir no instante em que a simulação é iniciada, mesmo com o motor ainda parado. Ele mostra o estado **PARADO** (ou **SEM MOTOR**, quando não há motor na bancada) e as leituras zeradas, permanece visível durante toda a simulação e ganhou um botão **×** no cabeçalho para o usuário fechá-lo. Ao parar e iniciar uma nova simulação, o painel volta a abrir automaticamente.
- **Manual da IHM em janela flutuante:** o manual completo deixou de substituir o conteúdo da aba e passou a ser exibido em uma janela própria, com largura máxima de 1100 px e altura de até 80% da tela. A IHM permanece visível ao fundo. A janela mantém busca interna, índice de grupos e cartões de parâmetros, e fecha pelo **×**, pelo clique no fundo ou pela tecla **Esc**. O editor de parâmetro abre sobre o manual e, ao ser fechado, o manual continua aberto.
- **Grade alinhada ao desenho:** o retângulo da grade foi movido para dentro do grupo `#ce-viewport`, que recebe pan e zoom. Assim, os pontos acompanham os componentes e permanecem alinhados às suas posições em qualquer escala, em vez de ficarem fixos à janela e desalinhados do circuito.
- **Controle de exibição da grade:** voltaram o botão **Grade** na barra rápida e o item **Ver > Alternar grade**, permitindo ocultar e mostrar os pontos. O estado do botão acompanha a visibilidade.
- **Painel de componentes recolhível:** o cabeçalho da paleta ganhou o botão **‹**, que recolhe o painel e expande a área do canvas. Quando recolhido, uma aba vertical **COMPONENTES** aparece na borda esquerda da bancada e reabre o painel com um clique.

### Correções e revisão técnica

- **Fechamento controlado do inspetor:** o painel distingue o fechamento automático do fechamento feito pelo usuário. Depois do **×**, ele não reaparece durante a simulação atual; o estado é limpo em `stopSim()` e em `startSim()`.
- **Atualização eficiente do inspetor:** o estado e as linhas de leitura só são regravados no DOM quando o texto muda, evitando reconstruções a cada quadro quando o motor está parado.
- **Cache offline:** o Service Worker passou a usar `inverterlab-1.5.0`.
- **Documentação e capturas:** README, notas técnicas e histórico atualizados; as capturas `01-bancada.png` e `02-ihm.png` foram regeradas para mostrar o inspetor sempre visível, o painel recolhido e o manual em janela flutuante.

### Como foi feito

O inspetor consulta `running` e a flag `miUserClosed` no início de `updateMotorInspector()`: enquanto a simulação está ativa e o usuário não fechou o painel, ele é exibido e reposicionado no canto oposto ao motor. O estado é derivado de `inverter.fault`, `inverter.state` e `inverter.runCmd`; quando não há motor, as leituras são substituídas por uma mensagem explicativa.

O manual foi separado do fluxo de renderização da IHM. `openManualModal()` monta `renderManualView()` dentro de `#manual-modal`, e `wireManualEvents()` registra busca, índice, cartões e fechamento. O editor de parâmetros continua usando o `#modal-backdrop` existente, que tem z-index superior ao da janela do manual.

A grade é um `<rect>` dentro de `#ce-viewport`, antes dos grupos de fios e componentes. O estado `showGrid` controla `display` pelo botão da barra rápida e pelo menu Ver. A paleta usa `paletteCollapsed` e a classe `.collapsed`; a aba `#palette-tab` é exibida apenas nesse estado.

---

## InverterLab V1.5.1 — Aba do inspetor e animação de rotação

**Arquivo:** `index.html`

### O que foi adicionado

- **Inspetor do motor recolhível:** o botão **×** do cabeçalho foi substituído por **›**. O painel deixa de ser fechado definitivamente durante a simulação: ele é recolhido e uma aba vertical **INSPETOR** aparece na borda direita da bancada, no mesmo padrão da aba **COMPONENTES**. Um clique na aba reabre o painel com as leituras atualizadas.
- **Estado durante a simulação:** a aba permanece visível enquanto o inspetor estiver recolhido; ao reabrir o painel, ela desaparece. Ao parar a simulação, painel e aba são ocultados, e a simulação seguinte abre o painel automaticamente.
- **Símbolo do motor estático na bancada:** a letra **M** do motor trifásico não gira mais durante a simulação. A indicação de rotação passou a ficar concentrada no inspetor.
- **Animação de rotação mais realista no inspetor:** o disco do eixo passou a ter um único setor escuro com marca vermelha, deixando o sentido de giro visível. A velocidade visual acompanha a rotação real em baixas velocidades e é comprimida nas altas, evitando o efeito estroboscópico em que o disco parece girar ao contrário. Nas rotações elevadas, um desfoque de movimento dissolve o padrão em uma mancha cinza, como um eixo girando de verdade.

### Correções e revisão técnica

- **Cache offline:** o Service Worker passou a usar `inverterlab-1.5.1`.
- **Documentação e captura:** README, notas técnicas e histórico atualizados; a captura `01-bancada.png` foi regerada com o novo botão de recolher e o disco do inspetor em alta rotação.

### Como foi feito

A flag `miUserClosed` foi renomeada para `miCollapsed` e a função `syncMotorInspector()` centraliza a visibilidade: o painel aparece quando `running && !miCollapsed`, e a aba `#mi-tab` aparece quando `running && miCollapsed`. Os cliques no botão **›** e na aba apenas alternam `miCollapsed` e chamam a sincronização. O estado é limpo em `startSim()` e em `stopSim()`.

A rotação da letra **M** era aplicada em `tick()` ao grupo `#motor-rotor`; o grupo foi removido do símbolo e o bloco de atualização foi excluído. No inspetor, `miAngle` acumula a rotação visual: até 1 revolução por segundo o valor é fiel ao rpm; acima disso, a função `tanh` comprime a velocidade até o teto de 2,5 revoluções por segundo. O fator de desfoque cresce a partir de 120 rpm e satura em 1.120 rpm, reduzindo a opacidade do disco girante e revelando uma camada cinza estática (`#mi-blur`) que representa a área varrida.

---

## InverterLab V1.5.2 — Disco quadriculado no inspetor

**Arquivo:** `index.html`

### O que foi alterado

- **Disco do eixo do inspetor:** o setor escuro único com marca vermelha foi substituído pelo padrão quadriculado preto/branco da versão anterior: quatro quadrantes alternados, com contorno preto, sem a marca vermelha. O desenho agora corresponde à imagem de referência do disco.
- **Animação preservada:** a rotação visual fiel em baixas velocidades, a compressão por `tanh` nas altas e o desfoque de movimento (`#mi-blur`) continuam iguais. Em alta rotação o quadriculado se dissolve na mesma mancha cinza.

### Correções e revisão técnica

- **Cache offline:** o Service Worker passou a usar `inverterlab-1.5.2`.
- **Documentação e captura:** README, notas técnicas e histórico atualizados; a captura `01-bancada.png` foi regerada com o disco quadriculado em alta rotação.

### Como foi feito

O grupo `#mi-disc` recebeu duas fatias opostas — `M150 60 L150 34 A26 26 0 0 0 124 60 Z` e `M150 60 L150 86 A26 26 0 0 0 176 60 Z` — preenchidas em `#111` sobre o círculo branco de contorno preto. A camada `#mi-blur` e toda a lógica de `miAngle` permaneceram inalteradas.

---
