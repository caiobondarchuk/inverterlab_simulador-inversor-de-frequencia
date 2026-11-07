# NOTAS TÉCNICAS — InverterLab

## 1. Visão geral

O **InverterLab** é um simulador educacional de inversores de frequência desenvolvido para permitir a montagem e simulação de circuitos elétricos diretamente no navegador.

O projeto foi desenvolvido inicialmente com foco no estudo do **Altus AD600M**, a partir da necessidade de praticar os conceitos apresentados durante as aulas técnicas, sem depender exclusivamente de um equipamento físico.

O sistema funciona como uma bancada virtual, permitindo montar circuitos com simbologia elétrica, parametrizar o inversor, controlar o motor e visualizar o comportamento do circuito durante a simulação.

Projeto online:

- https://caiobondarchuk.github.io/inverterlab_simulador-inversor-de-frequencia/

Repositório:

- https://github.com/caiobondarchuk/inverterlab_simulador-inversor-de-frequencia

---

## 2. Objetivos do projeto

Os principais objetivos do InverterLab são:

- Criar uma ferramenta de apoio ao ensino de elétrica e automação.
- Permitir a prática de montagem de circuitos sem a necessidade de um equipamento físico.
- Simular o funcionamento de circuitos de comando e potência.
- Permitir o estudo da parametrização de um inversor de frequência.
- Facilitar a realização de exercícios práticos por estudantes.
- Disponibilizar uma ferramenta gratuita e acessível diretamente pelo navegador.

---

## 3. Estado atual

O sistema possui uma bancada virtual com componentes elétricos e recursos voltados à simulação.

### 3.1 Bancada virtual

A bancada permite adicionar componentes e organizar o circuito em uma área de trabalho.

Os componentes são separados em categorias, incluindo:

- Alimentação
- Proteção
- Inversor
- Motor
- Comando
- Sinalização

A paleta possui 27 tipos visíveis, incluindo as sete fontes individuais (L1, L2, L3, N, PE, +24 V e 0 V), os contatos e bobinas de contator e os demais componentes de comando e sinalização. A emenda (nó) é um componente oculto, criado sobre um fio existente. O painel pode ser recolhido pelo botão **‹** no cabeçalho e reaberto pela aba vertical **COMPONENTES** exibida na borda esquerda da bancada; ao recolher, a área do canvas se expande automaticamente.

O fundo da bancada é uma **grade de referência alinhada ao desenho**: o retângulo com o padrão de pontos fica dentro do grupo `#ce-viewport`, o mesmo que recebe pan e zoom, de modo que os pontos acompanham os componentes e permanecem alinhados às suas posições em qualquer escala. A grade pode ser ocultada ou exibida pelo botão **Grade** da barra rápida e pelo item **Ver > Alternar grade**.

### 3.2 Montagem e fiação

O sistema permite realizar conexões entre os componentes utilizando fios com roteamento ortogonal.

A montagem busca utilizar simbologia elétrica próxima à utilizada em ambientes técnicos e educacionais.

O trajeto dos fios pode ser ajustado no estilo FluidSim: arrastar um segmento cria um desvio, os vértices brancos reposicionam o trajeto e a emenda pode ser movida com Shift. Quando o fio não possui waypoints, o roteamento automático escolhe um caminho ortogonal sem sobreposição. O botão "Redefinir trajeto" volta ao roteamento automático.

A seleção múltipla aceita componentes e fios. Com dois ou mais fios selecionados (Ctrl+clique), o inspetor mostra um seletor de cor e a paleta de cores rápidas, que alteram a cor de todos os fios da seleção de uma vez. Ao carregar um projeto ou um exemplo, a função `fitToContent()` calcula os limites do circuito — considerando a rotação dos componentes — e ajusta escala e deslocamento para enquadrar tudo na área visível.

### 3.3 Simulação elétrica

Durante a simulação, o sistema apresenta o comportamento dos componentes e permite visualizar o caminho da corrente no circuito.

A simulação foi desenvolvida com foco educacional e tem como objetivo facilitar a compreensão dos princípios de funcionamento dos circuitos.

O solver separa os domínios CA e CC: um potencial de 24 VCC não energiza um circuito CA e vice-versa. As entradas digitais DI1–DI4 são tratadas como NPN, ou seja, a entrada é considerada ativa quando o terminal correspondente tem continuidade com o `COM` do inversor. Os terminais `24V` e `COM` do inversor só fornecem alimentação quando o inversor está energizado, reproduzindo a fonte auxiliar do AD600M.

Os contatos auxiliares (por exemplo, o contato NA de K1 ligado ao selo) são redesenhados quando a bobina de mesma TAG muda de estado. O estado de assinatura do componente (`sig`) inclui o estado da bobina, garantindo que o desenho do contato acompanhe o fechamento elétrico mesmo quando a corrente do ramo de contato não varia.

Os **sinaleiros** não recebem o vermelho do caminho de corrente. Eles acendem apenas na cor definida pelo usuário no inspetor, com brilho da mesma cor; terminais e fios do sinaleiro permanecem neutros.

### 3.4 Inversor de frequência

O projeto possui uma representação virtual baseada no **Altus AD600M**.

A interface inclui uma representação da IHM e permite trabalhar com parâmetros relacionados ao funcionamento do inversor.

As informações utilizadas para a representação do equipamento foram baseadas em documentação pública relacionada ao AD600M.

O comportamento do inversor é guiado pelos parâmetros do manual. Entre os pontos revisados estão:

- **P0-20** — seleção de casas decimais da frequência: 1 casa (limite de P0-14 em 1200,0 Hz) ou 2 casas (limite em 600,00 Hz). O display da IHM acompanha a escolha.
- **P0-21** — unidade/faixa das rampas: 0–30000 s, 0–3000,0 s ou 0–300,00 s. Os valores de P0-23 e P0-24 continuam em segundos, mas os limites e a resolução mudam dinamicamente.
- **P0-22** — define se a rampa de aceleração/desaceleração usa a referência de frequência ou a frequência máxima.
- **P0-23 / P0-24** — tempos de aceleração e desaceleração 1, com faixa dependente de P0-21.
- **P5-15 / P5-17** — faixas mútuas para o ajuste da referência analógica (AI1).
- **P7-29 / P7-30** — padrões `0x441F` e `0x0043`, com edição e exibição em hexadecimal.
- **P2-00** — seleção da curva V/F usada pelo modelo do motor.
- **P2-15 / P2-16** — a opção “Ajuste digital” de P2-15 referencia o parâmetro **P2-16** (ajuste digital da tensão de saída no V/F separado). O manual não define P2-14; por isso esse código não foi criado.
- **P9-09** — tempo de detecção de realimentação de velocidade anormal no controle SVC (Err47), padrão 5 s, faixa 0–100,0 s; 0 desativa a proteção.
- **P0-04, P5-00 e P5-11** — seleção da fonte de comando, função das entradas digitais e comando a dois/três fios.

A base de parâmetros totaliza 575 códigos. Os parâmetros **P6-01, P6-02 e P6-03** permanecem pendentes de uma fonte com a definição correta e não foram implementados nesta versão, para evitar valores inventados.

O comando a três fios segue os dois tipos previstos no manual: no tipo 1 a entrada de parada é NF (abre para parar); no tipo 2 a entrada de parada é NO (fecha para parar). FWD e REV são detectados por borda de subida e o estado de marcha é retido até a parada.

A perda de fase na saída gera `Err24` apenas quando pelo menos uma fase do motor está conectada. O barramento CC nominal é de 380 V e, em falha, o motor entra em roda livre.

> O InverterLab é um projeto independente e não possui vínculo oficial com a Altus Sistemas de Automação S.A.

### 3.5 Motor trifásico

O sistema permite configurar e simular um motor de indução trifásico associado ao inversor.

A simulação permite observar o comportamento do motor de acordo com as condições definidas no circuito e no inversor.

O **inspetor do motor** é aberto automaticamente sempre que uma simulação é iniciada, mesmo com o motor ainda parado, em um dos cantos direitos da bancada — superior ou inferior, escolhido para ficar no lado oposto ao motor e não cobrir o próprio componente. O painel mostra o desenho do motor com um disco de eixo quadriculado preto/branco que gira no sentido real da rotação: em baixas velocidades o giro é fiel ao rpm; em velocidades altas a rotação visual é comprimida e recebe desfoque de movimento, evitando o efeito estroboscópico (disco parecendo girar ao contrário) e representando a alta rotação como uma mancha. Também são exibidos o estado (parado, acelerando, rodando, desacelerando, falha ou sem motor), velocidade em rpm, frequência de saída, sentido e carga. O símbolo do motor na bancada permanece estático. O painel permanece visível durante toda a simulação e pode ser recolhido pelo botão **›** no cabeçalho; uma aba vertical **INSPETOR** aparece na borda direita da bancada e o reabre com um clique. A próxima simulação o abre novamente.

### 3.6 Multimedidor

O InverterLab possui um recurso de multimedidor para auxiliar na visualização dos sinais elétricos durante a simulação. A antiga aba “Osciloscópio” passou a se chamar **Multimedidor**.

Esse recurso tem finalidade principalmente didática, permitindo relacionar o comportamento dos sinais com o funcionamento do circuito. Os gráficos mostram frequência de saída, corrente, tensão e velocidade do motor em tempo real.

### 3.7 Exercícios guiados

O sistema possui exercícios orientados para auxiliar o estudante durante a prática.

A proposta é permitir que o aluno monte o circuito, configure os componentes e observe o resultado da simulação.

Além dos exercícios guiados, o menu **Carregar exemplo** oferece três montagens prontas com circuitos e presets de parâmetros completos:

- Partida simples via IHM.
- Selo de contator alimentado pelo 24V do inversor.
- Comando a três fios (FWD/REV/parada).

Os exemplos são definidos diretamente pelos arquivos JSON de circuito e parâmetros, carregados com enquadramento automático (`fitToContent`) para trazer circuitos com coordenadas negativas para a área visível.

### 3.8 Fluxo de corrente e realce visual

Durante a simulação, o destaque vermelho não representa apenas “potencial presente”: ele indica que aquele trecho faz parte de um caminho fechado de corrente. O `NetworkSolver` monta um grafo com todas as ligações condutoras e o decompõe em blocos biconectados. Para cada carga energizada (bobina de contator, lâmpada, buzina, potenciômetro ou motor), o algoritmo marca as arestas que pertencem a um caminho simples entre a carga e a fonte de potencial correspondente. Fios que terminam em aberto, ramos desligados e trechos sem retorno não são marcados.

Os sinaleiros são a exceção visual: mesmo energizados, não recebem o vermelho de corrente. O componente usa somente a cor escolhida pelo usuário, aplicada ao símbolo e ao brilho.

O motor é tratado pelos caminhos de fase U/V/W entre o inversor e o motor, e o potenciômetro pelos caminhos de +10 V, AI1 e GND. As emendas e fontes atravessadas por corrente também recebem o destaque. Os estados resultantes ficam em `current:<id>` para componentes, `current:<id>:<terminal>` para terminais e `wglow:'current'` para fios.

### 3.9 Indicador de operação

O indicador da bancada mostra o estado da simulação, a frequência de saída e o sentido de rotação efetivo do motor. O sentido é obtido da rotação real do motor quando ele está girando e, em repouso, do sentido configurado no inversor (`dirEff`/`direction`), exibindo **Horário** ou **Anti-horário**.

### 3.10 IHM — busca rápida e manual completo

A aba **IHM & Parâmetros** oferece dois modos de consulta:

- **Busca rápida** (padrão): pesquisa por código, nome, descrição, unidade, grupo e texto das opções. A consulta é normalizada (sem acentos e sem diferença entre maiúsculas e minúsculas) e todos os termos precisam aparecer no conjunto pesquisado. Assim, uma palavra como “digital” encontra também parâmetros cuja descrição ou opção contenha o termo.
- **Manual completo**: abre o **Manual do Inversor de Frequência** interno em uma janela flutuante de tamanho limitado (largura máxima de 1100 px e altura de até 80% da tela), mantendo a IHM visível ao fundo. Exibe os 573 parâmetros visíveis (575 códigos na base, incluindo dois parâmetros internos do modelo do motor) distribuídos em 29 grupos, índice lateral, busca interna, descrição, faixa, padrão de fábrica, valor atual e lista de opções. O manual é genérico e não menciona a Altus.

A janela do manual fecha pelo **×**, pelo clique no fundo escurecido ou pela tecla **Esc**. Ao clicar em um cartão de parâmetro, o editor é aberto sobre o manual; ao fechá-lo, o manual continua aberto. A busca rápida permanece no painel da IHM, sem trocar o conteúdo da aba.

### 3.11 Dica de uso e ajuda

Ao abrir o sistema, a bancada exibe uma dica inferior com os principais comandos e a indicação de **Ver > Ajuda & atalhos (F1)**. A dica permanece visível por 30 segundos e depois se oculta; ela reaparece a cada nova abertura do sistema. O mesmo texto é repetido no topo da janela de Ajuda & atalhos.

---

## 4. Arquitetura do projeto

O InverterLab foi desenvolvido utilizando tecnologias web, buscando manter o projeto simples de executar e distribuir.

Principais tecnologias:

- HTML
- CSS
- JavaScript

O projeto não depende de frameworks ou de um processo de build complexo.

A aplicação principal está concentrada no arquivo:

```text
index.html
```

Os principais módulos internos são:

- **`NetworkSolver`** — resolve a condução elétrica, separa os domínios CA/CC, lê as entradas NPN, mantém o estado das bobinas e calcula o fluxo de corrente real por blocos biconectados.
- **`CircuitEditor`** — editor SVG da bancada, responsável pela paleta recolhível, grade alternável, fiação e waypoints.
- **`InverterEngine`** — modelo do AD600M, incluindo IHM, parâmetros, rampas, V/F, relé de saída e falhas.
- **`MotorModel`** — modelo simplificado do motor de indução trifásico.
- **`IHM`** — teclado, display de cinco dígitos, navegação por grupos, busca rápida e manual completo em janela flutuante.
- **Inspetor do motor** — painel flutuante aberto no início da simulação, atualizado pelo laço de simulação, com disco animado e leituras de rpm, frequência, sentido, carga e estado.

Arquivos auxiliares incluem:

```text
manifest.webmanifest
sw.js
_nojekyll
icons/
scripts/
docs/
```

O projeto também utiliza um Service Worker para permitir o funcionamento offline após o primeiro carregamento.

---

## 5. Execução local

Como o projeto utiliza arquivos web estáticos, pode ser executado localmente através de um servidor HTTP simples.

Exemplo utilizando Python:

```bash
python3 -m http.server 8080
```

Depois, acessar:

```text
http://localhost:8080
```

Também é possível utilizar a versão publicada no GitHub Pages.

---

## 6. Compatibilidade

O InverterLab foi desenvolvido para execução em navegadores modernos com suporte às tecnologias utilizadas pelo projeto.

A aplicação foi pensada para computadores utilizados em ambientes educacionais, como laboratórios de informática e laboratórios técnicos.

Por utilizar tecnologias web, não é necessário instalar um programa específico para utilizar a aplicação publicada.

---

## 7. Salvamento e exportação

O sistema possui recursos para trabalhar com os projetos montados pelo usuário.

Entre os recursos previstos no projeto estão:

- Salvamento de projetos em JSON.
- Abertura de projetos salvos.
- Exportação de diagramas em SVG.

Esses recursos permitem guardar e compartilhar montagens realizadas durante as atividades.

---

## 8. Uso educacional

O InverterLab foi pensado principalmente como uma ferramenta de apoio ao ensino.

A aplicação pode ser utilizada para:

- Exercícios de comandos elétricos.
- Estudo de inversores de frequência.
- Montagem de circuitos.
- Estudo de motores trifásicos.
- Prática de parametrização.
- Visualização de sinais elétricos.
- Atividades guiadas.
- Demonstrações em aulas práticas e teóricas.

A ferramenta não tem como objetivo substituir completamente os equipamentos físicos. Seu propósito é complementar as aulas e oferecer uma forma adicional de prática e experimentação.

---

## 9. Limitações atuais

O projeto encontra-se em desenvolvimento e possui limitações naturais de uma simulação educacional.

Entre elas:

- A simulação não representa todos os fenômenos físicos presentes em um equipamento real.
- Os resultados devem ser interpretados como uma representação computacional para fins educacionais.
- O sistema não realiza comunicação com um inversor físico.
- O simulador não substitui medições realizadas em equipamentos reais.
- A representação do AD600M é independente e não deve ser interpretada como uma implementação oficial da Altus.

Novos componentes e funcionalidades podem ser adicionados conforme a evolução do projeto.

---

## 10. Desenvolvimento e evolução

O projeto foi estruturado de forma a permitir a expansão da bancada e da simulação.

A evolução planejada inclui a possibilidade de adicionar novos componentes, sistemas e recursos relacionados à elétrica e à automação.

Entre os possíveis caminhos de evolução estão:

- Ampliação da biblioteca de componentes.
- Novos dispositivos de comando e proteção.
- Contatores e relés.
- Sistemas de proteção.
- Controladores lógicos programáveis (CLPs).
- Novos modelos de motores.
- Novos recursos de simulação.
- Novos exercícios educacionais.
- Expansão para outros equipamentos e aplicações de automação.

Essas possibilidades fazem parte da evolução planejada e podem ser modificadas conforme as necessidades do projeto.

---

## 11. Relação com o Altus AD600M

O InverterLab foi inicialmente desenvolvido com base no estudo do **Altus AD600M**.

A documentação pública do equipamento foi utilizada como referência para elementos relacionados à sua operação e parametrização.

O projeto é independente e não representa um produto oficial da Altus.

**Altus**, **AD600M** e demais nomes e marcas relacionados pertencem aos seus respectivos proprietários.

O uso dessas referências no projeto possui finalidade educacional.

---

## 12. Licença

O código-fonte do InverterLab está disponibilizado sob a **MIT License**.

A licença permite o uso, cópia, modificação e distribuição do código de acordo com os termos da licença.

A licença do projeto não concede direitos sobre marcas, nomes comerciais, documentação ou outros materiais pertencentes a terceiros.

Consulte o arquivo [`LICENSE`](LICENSE) para os termos completos da licença.

---

## 13. Autores

**Caio Bondarchuk**

**Breno Rossi**

O projeto é desenvolvido de forma colaborativa, com foco em aplicações educacionais relacionadas à elétrica, automação e tecnologia.

---

## 14. Versão atual

**Versão:** 1.5.2  
**Ano:** 2026  
**Última revisão:** novembro de 2026

O projeto permanece em desenvolvimento e novas versões poderão modificar, ampliar ou substituir funcionalidades descritas neste documento.
