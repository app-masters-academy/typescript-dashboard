# Bootcamp TypeScript com React

## Overview

**O intuito deste projeto é auxiliar no estudo das tecnologias React e Typescript.**
Para isso, vamos fazer juntos um página com um dashboard bem visual. Então já preparamos um projeto base que já possui diversos exemplos de componentes de visualização que poderão ser usados durante o Bootcamp. 

> _O Conceito de componentes não será abordado durante as explicações, mas fique a vontade para perguntar em nosso canal do slack_
___
## Antes de tudo

Se não conseguir realizar algum dos passos ou tiver alguma dúvida, pode nos perguntar no canal `#typescript` do [Slack Dev Juiz de Fora](http://devjf.slack.com/).

Se ainda não estiver no Slack, você pode visitar [https://devjf.herokuapp.com/](https://devjf.herokuapp.com/) e gerar um convite. Um email será enviado para o endereço cadastrado com as próximas instruções.
___
## Primeiro passo - Configurar o ambiente

O primeiro passo começa antes mesmo do nosso primeiro encontro. Precisamos que você prepare sua máquina para que possamos começar já com o ritmo total e assim aproveitar nosso tempo juntos da melhor maneira possível.

### Configuração do Ambiente

Para iniciar o projeto, primeiro é necessária a instalação de algumas coisas.

- [**NodeJs**](https://nodejs.org/en/)
  
  Se ainda não tiver uma versão instalada, você pode baixar na [página de downloads](https://nodejs.org/en/download/). Recomendamos usar a versão `LTS` para evitar problemas de compatibilidade com algumas dependências.
  
  Para verificar se o node já está funcionando, rode o seguinte comando no seu terminal:

  ```sh
    node --version
  ```

  Você deverá ver o número da versão do Node que acabou de instalar.

- [**Yarn**](https://classic.yarnpkg.com/en/)

  Embora não seja obrigatório que você tenha instalado em sua maquina, usaremos o Yarn como gerenciador de dependências durante nossas reuniões.

  Você pode fazer o download dele [neste link](https://classic.yarnpkg.com/en/docs/install).

  Para verificar se o Yarn já está funcionando, rode o seguinte comando no seu terminal:

  ```sh
    yarn --version
  ```

  Você deverá ver o número da versão do Yarn que acabou de instalar.

- [**Compilador TypeScript**](https://www.typescriptlang.org/)

  Durante o desenvolvimento do projeto usaremos o compilador do TypeScript para converter nosso código em JavaScript.
  
  Para instalar, basta rodar o comando:

  ```sh
    yarn global add typescript
  ```

  ou, se estiver usando o NPM:

  ```sh
    npm install -g typescript
  ```

  Para confirmar que está tudo funcionando, rode o seguinte comando no seu terminal:
  
  ```sh
  tsc --version
  ```

  Você deverá ver o número da versão do compilador que acabou de instalar.

Além disso, esperamos que use um Editor (ou IDE) que dê suporte ao TypeScript. Nós recomendamos o [Visual Studio Code](https://code.visualstudio.com/) pela sua facilidade, mas se você já está acostumado com outro, veja [Aqui](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support) se ele está na lista que oferecem suporte à linguagem.
___
## Segundo passo - rodar o projeto base

### Iniciando projeto

1. Clone o repositório `git clone https://github.com/app-masters-academy/typescript-dashboard.git`
1. Após clonar o repositório entre na pasta do projeto `cd typescript-dashboard`
1. Instale as dependências utilizando do gerenciador escolhido acima.
   - `npm i` para se estiver usando o NPM.
   - `yarn` para Yarn.
1. Após instalar as dependências execute o projeto usando:
   - `npm start` para se estiver usando o NPM.
   - `yarn start` para Yarn.
___
## Ainda tem alguma dúvida?

Além da explicação do Bootcamp e das dúvidas no Slack, separamos pra você um material que pode tirar suas dúvidas ou te explicar melhor algum ponto que não era nosso foco aqui no Bootcamp.

### Typescript

- [O que é Typescript](https://imasters.com.br/dotnet/net-o-que-e-typescript-e-quais-os-seus-beneficios)
- [ECMAScript](https://medium.com/trainingcenter/afinal-javascript-e-ecmascript-s%C3%A3o-a-mesma-coisa-498374abbc47)

### React

- [Introdução ao JSX](https://pt-br.reactjs.org/docs/introducing-jsx.html)
- [Propriedades e Componentes](https://pt-br.reactjs.org/docs/components-and-props.html)
- [Estado e Ciclo de Vida](https://pt-br.reactjs.org/docs/state-and-lifecycle.html)
- [Roteamento com React Router Dom](https://blog.rocketseat.com.br/paginacao-react-router/)
- [Tipando em Componentes](https://medium.com/@oieduardorabelo/react-e-typescript-o-dilema-defaultprops-4711e0e6f271)
  
### Apis de Exemplo

- [COVID-19 Brazil API](https://covid19-brazil-api-docs.now.sh/)
- [Postman COVID-19 API Resource Center](https://covid-19-apis.postman.com/)

### Requisições

_Atenção: Para realizar a requisição a API é recomendado utilizar dos estados e do ciclo de vida do componente chamando [componentDidMount](https://pt-br.reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)_
Para fazer as requisições à API sugerimos a utilização dos seguintes métodos:
- [axios](https://github.com/axios/axios)
- [fetch](https://reactnative.dev/docs/network)

