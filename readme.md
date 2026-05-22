# LeafSense - Sistema Inteligente de Monitoramento de Vegetação (SIMV)

**Entidade de Aplicação:** CCR Motiva S.A.
**Contexto:** Challenge CCR Motiva - Ciência da Computação / Engenharia de Software

---

## 1. Definição da Solução

### Qual problema escolhemos resolver?
O modelo atual de controle de vegetação é reativo, gerando intervenções desnecessárias que aumentam custos ou intervenções tardias que comprometem a segurança da via.  A alta dependência de inspeções puramente humanas gera falhas de amostragem e escassez de dados em tempo real para a engenharia viária.

### Quem é o usuário do app?
* **Operador de campo:** O motorista ou passageiro da viatura de patrulha que utilizará o tablet embarcado.
*  **Fiscal de operações:** Profissional que acompanha o painel de rastreio para garantir a cobertura da malha rodoviária.

### Qual é a principal ação do app?
 A principal ação do aplicativo embarcado no tablet é gerenciar e monitorar trechos padronizados de 500 metros.  O sistema permite registrar as áreas mapeadas com sucesso pelas câmeras veiculares, alertar sobre falhas de captura e enviar o lote de imagens ao servidor centralizado.

---

## 2. Funcionalidades do App (MVP)

Para atender ao escopo de Mínimo Produto Viável e manter o foco no processo de coleta em campo, o aplicativo contará com as seguintes funcionalidades essenciais:

* **Autenticação:** Login obrigatório do operador para iniciar o turno e vincular a coleta de dados à viatura correta.
*  **Listagem de Ocorrências (Trechos):** Painel exibindo quais trechos lógicos (fragmentos de 500m) estão pendentes de coleta e quais já possuem fotografias atualizadas.
* **Cadastro de Ocorrência:** Ação para iniciar o mapeamento fotográfico de um trecho específico ou registrar manualmente uma anomalia na via/câmera.
* **Visualização de Detalhe:** Tela com os dados de um trecho mapeado, exibindo o status do envio das fotos ao servidor e a geolocalização do segmento.
*  **Classificação de Risco:** Indicador visual (Baixo, Médio, Alto) apontando o status do trecho com base em coletas anteriores ou alertas visuais do próprio operador caso a vegetação já ofereça risco iminente de segurança.

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
