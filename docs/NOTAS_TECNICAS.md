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

A paleta possui 27 tipos visíveis, incluindo as sete fontes individuais (L1, L2, L3, N, PE, +24 V e 0 V), os contatos e bobinas de contator e os demais componentes de comando e sinalização. A emenda (nó) é um componente oculto, criado sobre um fio existente.

### 3.2 Montagem e fiação

O sistema permite realizar conexões entre os componentes utilizando fios com roteamento ortogonal.

A montagem busca utilizar simbologia elétrica próxima à utilizada em ambientes técnicos e educacionais.

O trajeto dos fios pode ser ajustado no estilo FluidSim: arrastar um segmento cria um desvio, os vértices brancos reposicionam o trajeto e a emenda pode ser movida com Shift. Quando o fio não possui waypoints, o roteamento automático escolhe um caminho ortogonal sem sobreposição. O botão "Redefinir trajeto" volta ao roteamento automático.

### 3.3 Simulação elétrica

Durante a simulação, o sistema apresenta o comportamento dos componentes e permite visualizar o caminho da corrente no circuito.

A simulação foi desenvolvida com foco educacional e tem como objetivo facilitar a compreensão dos princípios de funcionamento dos circuitos.

O solver separa os domínios CA e CC: um potencial de 24 VCC não energiza um circuito CA e vice-versa. As entradas digitais DI1–DI4 são tratadas como NPN, ou seja, a entrada é considerada ativa quando o terminal correspondente tem continuidade com o `COM` do inversor. Os terminais `24V` e `COM` do inversor só fornecem alimentação quando o inversor está energizado, reproduzindo a fonte auxiliar do AD600M.

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
- **P0-04, P5-00 e P5-11** — seleção da fonte de comando, função das entradas digitais e comando a dois/três fios.

O comando a três fios segue os dois tipos previstos no manual: no tipo 1 a entrada de parada é NF (abre para parar); no tipo 2 a entrada de parada é NO (fecha para parar). FWD e REV são detectados por borda de subida e o estado de marcha é retido até a parada.

A perda de fase na saída gera `Err24` apenas quando pelo menos uma fase do motor está conectada. O barramento CC nominal é de 380 V e, em falha, o motor entra em roda livre.

> O InverterLab é um projeto independente e não possui vínculo oficial com a Altus Sistemas de Automação S.A.

### 3.5 Motor trifásico

O sistema permite configurar e simular um motor de indução trifásico associado ao inversor.

A simulação permite observar o comportamento do motor de acordo com as condições definidas no circuito e no inversor.

### 3.6 Osciloscópio

O InverterLab possui um recurso de osciloscópio para auxiliar na visualização dos sinais elétricos durante a simulação.

Esse recurso tem finalidade principalmente didática, permitindo relacionar o comportamento dos sinais com o funcionamento do circuito.

### 3.7 Exercícios guiados

O sistema possui exercícios orientados para auxiliar o estudante durante a prática.

A proposta é permitir que o aluno monte o circuito, configure os componentes e observe o resultado da simulação.

Além dos exercícios guiados, o menu **Carregar exemplo** oferece três montagens prontas com presets de parâmetros:

- Partida simples via IHM.
- Selo de contator alimentado pelo 24V do inversor.
- Comando a três fios (FWD/REV/parada).

### 3.8 Fluxo de corrente e realce visual

Durante a simulação, o destaque vermelho não representa apenas “potencial presente”: ele indica que aquele trecho faz parte de um caminho fechado de corrente. O `NetworkSolver` monta um grafo com todas as ligações condutoras e o decompõe em blocos biconectados. Para cada carga energizada (bobina de contator, lâmpada, buzina, potenciômetro ou motor), o algoritmo marca as arestas que pertencem a um caminho simples entre a carga e a fonte de potencial correspondente. Fios que terminam em aberto, ramos desligados e trechos sem retorno não são marcados.

O motor é tratado pelos caminhos de fase U/V/W entre o inversor e o motor, e o potenciômetro pelos caminhos de +10 V, AI1 e GND. As emendas e fontes atravessadas por corrente também recebem o destaque. Os estados resultantes ficam em `current:<id>` para componentes, `current:<id>:<terminal>` para terminais e `wglow:'current'` para fios.

### 3.9 Indicador de operação

O indicador da bancada mostra o estado da simulação, a frequência de saída e o sentido de rotação efetivo do motor. O sentido é obtido da rotação real do motor quando ele está girando e, em repouso, do sentido configurado no inversor (`dirEff`/`direction`), exibindo **Horário** ou **Anti-horário**.

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
- **`CircuitEditor`** — editor SVG da bancada, responsável pela paleta, fiação e waypoints.
- **`InverterEngine`** — modelo do AD600M, incluindo IHM, parâmetros, rampas, V/F, relé de saída e falhas.
- **`MotorModel`** — modelo simplificado do motor de indução trifásico.
- **`IHM`** — teclado, display de cinco dígitos, navegação por grupos e busca de parâmetros.

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

**Versão:** 1.3  
**Ano:** 2026  
**Última revisão:** outubro de 2026

O projeto permanece em desenvolvimento e novas versões poderão modificar, ampliar ou substituir funcionalidades descritas neste documento.
