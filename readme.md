# LeafSense - Sistema Inteligente de Monitoramento de Vegetação (SIMV)

**Entidade de Aplicação:** CCR Motiva S.A.
**Contexto:** Challenge CCR Motiva - Ciência da Computação / Engenharia de Software

---

## 1. Definição da Solução

### Qual problema escolhemos resolver?
[cite_start]O modelo atual de controle de vegetação é reativo, gerando intervenções desnecessárias que aumentam custos ou intervenções tardias que comprometem a segurança da via[cite: 11, 15]. [cite_start]A alta dependência de inspeções puramente humanas gera falhas de amostragem e escassez de dados em tempo real para a engenharia viária[cite: 13].

### Quem é o usuário do app?
* **Operador de campo:** O motorista ou passageiro da viatura de patrulha que utilizará o tablet embarcado.
* [cite_start]**Fiscal de operações:** Profissional que acompanha o painel de rastreio para garantir a cobertura da malha rodoviária[cite: 25].

### Qual é a principal ação do app?
[cite_start]A principal ação do aplicativo embarcado no tablet é gerenciar e monitorar trechos padronizados de 500 metros[cite: 23]. [cite_start]O sistema permite registrar as áreas mapeadas com sucesso pelas câmeras veiculares, alertar sobre falhas de captura e enviar o lote de imagens ao servidor centralizado[cite: 19].

---

## 2. Funcionalidades do App (MVP)

Para atender ao escopo de Mínimo Produto Viável e manter o foco no processo de coleta em campo, o aplicativo contará com as seguintes funcionalidades essenciais:

* **Autenticação:** Login obrigatório do operador para iniciar o turno e vincular a coleta de dados à viatura correta.
* [cite_start]**Listagem de Ocorrências (Trechos):** Painel exibindo quais trechos lógicos (fragmentos de 500m) estão pendentes de coleta e quais já possuem fotografias atualizadas[cite: 23, 25].
* **Cadastro de Ocorrência:** Ação para iniciar o mapeamento fotográfico de um trecho específico ou registrar manualmente uma anomalia na via/câmera.
* **Visualização de Detalhe:** Tela com os dados de um trecho mapeado, exibindo o status do envio das fotos ao servidor e a geolocalização do segmento.
* [cite_start]**Classificação de Risco:** Indicador visual (Baixo, Médio, Alto) apontando o status do trecho com base em coletas anteriores ou alertas visuais do próprio operador caso a vegetação já ofereça risco iminente de segurança[cite: 15, 54].

---

## 3. Protótipo Navegável

O protótipo de alta fidelidade foi desenvolvido no Figma, detalhando o fluxo do operador no tablet embarcado no veículo.

* **Ferramenta:** Figma
* **Telas Mapeadas:** Lista de ocorrências (trechos da rodovia), Nova ocorrência (iniciar mapeamento/reportar erro) e Detalhe da ocorrência.
* **Link de Acesso:** `[INSERIR LINK DO FIGMA AQUI]`

---

## 4. Estrutura Técnica do Projeto

O projeto mobile do LeafSense foi inicializado utilizando as melhores práticas para desenvolvimento ágil e multiplataforma, focando na performance de um tablet em movimento.

### Tecnologias Utilizadas
* **Framework:** React Native
* **Toolchain:** Expo
* **Linguagem:** TypeScript

### Arquitetura de Pastas Inicial

```text
leafsense-app/
├── src/
│   ├── components/      # Componentes visuais reutilizáveis (botões, cards de trechos, modais)
│   ├── screens/         # Telas principais (Login, Listagem, Detalhes, Nova Ocorrência)
│   ├── types/           # Definições de tipagem do TypeScript (interfaces de Ocorrências, Trechos)
├── App.tsx              # Ponto de entrada do aplicativo e configuração de rotas
├── package.json         # Dependências do projeto
└── tsconfig.json        # Configurações do compilador TypeScript