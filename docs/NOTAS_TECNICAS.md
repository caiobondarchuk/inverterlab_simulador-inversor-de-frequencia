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
- Sensores
- Sinalização

### 3.2 Montagem e fiação

O sistema permite realizar conexões entre os componentes utilizando fios com roteamento ortogonal.

A montagem busca utilizar simbologia elétrica próxima à utilizada em ambientes técnicos e educacionais.

### 3.3 Simulação elétrica

Durante a simulação, o sistema apresenta o comportamento dos componentes e permite visualizar o caminho da corrente no circuito.

A simulação foi desenvolvida com foco educacional e tem como objetivo facilitar a compreensão dos princípios de funcionamento dos circuitos.

### 3.4 Inversor de frequência

O projeto possui uma representação virtual baseada no **Altus AD600M**.

A interface inclui uma representação da IHM e permite trabalhar com parâmetros relacionados ao funcionamento do inversor.

As informações utilizadas para a representação do equipamento foram baseadas em documentação pública relacionada ao AD600M.

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
- Novos tipos de sensores.
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

**Versão:** 1.0  
**Ano:** 2026

O projeto permanece em desenvolvimento e novas versões poderão modificar, ampliar ou substituir funcionalidades descritas neste documento.
