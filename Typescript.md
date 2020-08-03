# Typescript

## Ambiente de Desenvolvimento

Antes de mais nada, é necessário você tenha uma versão do [Node.js](https://nodejs.org/en/download/) instalado no computador. Se estiver em um ambiente Linux ou Mac, ao invés de baixar e instalar manualmente, você pode usar o [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) para instalar e gerenciar as versões do Node instaladas em sua máquina.

Para poder usar o TypeScript, basta instalar o compilador globalmente:

```sh
npm install -g typescript
# ou
yarn global add typescript
```

Para tirar melhor proveito da linguagem, sugerimos o uso de um editor de texto capaz de utilizar os Serviços de Linguagem do TypeScript. [VSCode](https://code.visualstudio.com/download) pode ser uma ótima opção.

## Configurando o compilador

### Transformando TS em JS

Considere o seguinte código em TypeScript:

```ts
/**
 * Implementação recursiva do fatorial de uma número
 * @param num Número que o fatorial será calculado
 */
export const fatorial = (num: number): number => {
  if (num <= 1) return 1;

  return num * fatorial(num - 1);
};

console.log(fatorial(6));
```

O código apenas declara e exporta uma função que calcula o fatorial de um número e depois imprime no console o resultado desta função para o número `6`.

Para entender o que o compilador do TypeScript faz, copie o código e salve em um arquivo. Em seguida, execute o compilador invocando o comando `tsc` seguido pelo nome do arquivo salvo:

```sh
  tsc index.ts
```

O compilador irá converter o código TypeScript em JavaScript puro. Na pasta onde o arquivo foi salvo deve aparecer um novo arquivo `index.js`.

```js
"use strict";
exports.__esModule = true;
exports.fatorial = void 0;
/**
* Implementação recursiva do fatorial de uma número
* @param num Número que o fatorial será calculado
*/
exports.fatorial = function (num) {
    if (num <= 1)
        return 1;
    return num * exports.fatorial(num - 1);
};
console.log(exports.fatorial(6));
```

As últimas versões do compilador de TypeScript converte o utilizando o padrão de módulos do CommonJS, o mesmo utilizado pelo Node. Desta forma o código gerado pode ser executado normalmente:

```sh
  node index.ts
```

Se quiséssemos, poderíamos converter o nosso código para JavaScript mantendo o padrão ES6 utilizando a flag `--module ES2015`:

```sh
  tsc index.ts --module ES2015
```

Desta forma, temos um código muito próximo da implementação inicial, mas parte do nosso código ainda está diferente, não temos o `const` nem a arrow function:

```js
/**
 * Implementação recursiva do fatorial de uma número
 * @param num Número que o fatorial será calculado
 */
export var fatorial = function (num) {
    if (num <= 1)
        return 1;
    return num * fatorial(num - 1);
};
console.log(fatorial(6));
```

Isso porque o compilador define como linguagem alvo padrão o `ECMAScript 5`, ou `ES5`. Se quisermos definir a versão especifica, poderiam utilizar a flag `--target`:

```sh
tsc index.ts --module ES2015 --target ES6
```

Com isso, temos um código praticamente identico ao original, faltando apenas as definições de tipo.

### Arquivo de configuração

Como foi mostrado, é possivel converter um arquivo TypeScript em JavaScript utilizando o compilador, agora imagine que além de definir o tipo de modulo e linguagem alvo ainda queremo extrair informações sobre o tipo:

```sh
  tsc index.ts --module ES2015 --target ES6 --declaration
```

Listar todas as opções pode se tornar rapidamente inviável. Para solicionar o problema podemos criar um arquivo `tsconfig.json` na raiz do nosso projeto para definir todas as opções do compilador:

```json
  {
    "compilerOptions": {
      "module": "commonjs", // Voltando para CommonJS para poder executar com o Node
      "target": "ES6",
      "outDir": "build", // Definimos uma pasta onde o código gerado será salvo
      "declaration": true, // Extrair definição de tipos
      "sourceMap": true // Gera o source map que permite depurar o JavaScript gerado como se fosse o TypeScript original!!!
    },
    "include": ["src"] // Compila todos os arquivos da pasta `src`
  }
```

Agora para compilar todos os arquivos dentro da pasta `src` basta executar o comando:

```sh
tsc
```

## Variáveis Funções e Classes

### Variáveis simples

Usando uma sintaxe muito próxima do JavaScript, é possível definir o tipo de uma variável durante sua declaração utilizando as expressões:

```ts
const varName: type [= value];
let varName: type [= value];
var varName: type [= value];
```

Além de definir manualmente, o TypeScript consegue inferir o tipo da variável através do valor passado durante sua inicialização:

```ts
// Text tem o tipo inferido como `string`
let text = 'lorem ipsum';

let someNumber: number;
someNumber = 42;
```

Tentar sobrescrever uma variável com outro tipo de variável ou valor gera um erro.

```ts
let isClosed = false;

// Essa linha deveria gerar um erro
// Type '42' is not assignable to type 'boolean'.
text = 42;
```

### Arrays e Tuplas

Array pode ser declarados da mesma forma que variáveis simples, basta adicionar os colchetes depois do nome do tipo:

```ts
const numberList: number[] = [];
numberList.push(42);

// Erro!!!
// Argument of type '"foo"' is not assignable to parameter of type 'number'.
numberList.push('foo');
```

Assim como com as variáveis simple, o TypeScript também pode inferir o tipo de arrays, basta que elas estejam presentes na inicialização da variável:

```ts
const stringList = ['foo', 'bar'];
stringList.push('new text');
```

Além de arrays de um único tipo, também é possível definir o tipo uma tupla com tamanho fixo da seguinte forma:

```ts
const data: [number, string, string, number] = [
  1,
  'John Doe',
  'Juiz de Fora',
  1990
];
```

Note que no caso de arrays, o TypeScript tenta inferir o tipo mais abrangente possível, se declarada sem a definição de tipo explicita, a variável `data` seria inferida como do tipo `(string | number)[]`.

Cuidado com push em tuplas! Mesmo com o tipo explicitamente declarado, um `push` na variável `data` do exemplo anterior aceitaria tanto `number` quanto `string`.

### Objetos

Em TypeScript a sintaxe para a definição do tipos de objetos é bem próxima da definição do próprio objeto. A definição pode ser feita da seguinte forma:

```ts
let address: { street: string; number: number; complement?: string };

address = {
  street: 'Fake address',
  number: 42,
  // Opicional
  complement: '...'
};
```

Note que a chave `complement` tem um ponto de interrogação antes do seu tipo `: string`, isso quer dizer que este elemento é opcional no objeto `address`. Assim, todas as chaves de um objeto que são definidas sem o `?` são consideradas obrigatórias:

```ts
let address: { street: string; number: number; complement?: string };

// Erro, `street: string` definida em address!
// Property 'street' is missing in type '{ number: number; complement: string; }' but required in type '{ street: string; number: number; complement?: string; }'
address = {
  number: 42,
  // Opicional
  complement: '...'
};
```

Ter que definir o tipo de um objeto toda vez que uma variável é declarada além de ser incomodo, torna o código mais propenso a erros. Assim, quando definimos o tipo de um objeto que pode ser utilizado mais de uma vez, usamos `interface`s:

```ts
interface Address {
  street: string;
  number: number;
  complement?: string;
}

let address: Address;
```

Neste ponto é bom destacar uma diferença importante do TypeScript para outras linguagens tipadas. Ao contrário de linguagens como Java, C# e C++ onde a equivalência de tipo é constatada se duas variáveis são instancias de um mesmo tipo, em TypeScript, o tipo de uma variável é considerado equivalente se ambos possuem o mesmo conteúdo:

```js
interface Person {
  name: string;
  email: string;
}

let contact: { name: string; email: string } = {
  name: 'John',
  email: 'example@email.com'
}

const person: Person = contact;
```

### União e Intersecção com tipos

Até agora trabalhamos apenas com variáveis que só podiam assumir um tipo de valor, mas em vários casos você terá que lidar com variáveis que podem ter um tipo de valor ou outro. Com TypeScript esse tipo de variável pode ser definido da seguinte forma:

```ts
  interface ContactWithEmail {
    name: string;
    email: string;
  }

  interface ContactWithPhone {
    name: string;
    phone: string;
  }

  const contact: ContactWithEmail | ContactWithPhone = {
    name: 'John Doe'
  };
```

Neste exemplo, a variável `contact` pode ser tanto do tipo `ContactWithEmail` quanto `ContactWithPhone`. Note que neste caso o TypeScript só permite acessar dados que existem na intersecção de todos os tipos.

Além de definir uma variável podendo ter um tipo ou outro, também podemos definir uma variável que possuí dois tipos simultaneamente:

```ts
  const completeContact: ContactWithEmail & ContactWithPhone = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(32) 99999-9999'
  };
```

Neste caso, a variável `completeContact` é do tipo `ContactWithEmail` E `ContactWithPhone` simultaneamente, e pode acessar todas as propriedades.

Assim como as `interface`s podem ser usadas definir um tipo composto de várias chaves, `types` podem ser definidos com a união ou intersecção de outros tipos:

```ts
  type BaseContact = ContactWithEmail | ContactWithPhone;
  type FullContact = ContactWithEmail & ContactWithPhone;
```

### Funções

A declaração de tipos em funções segue o mesmo padrão que a declaração de tipos simples. Além dos tipo dos parâmetros, também podemos definir o tipo de retorno da função da seguinte forma:

```ts
  function soma(a: number, b: number): number {
    return a + b;
  }

  const soma = (a: number, b: number): number => {
    return a + b;
  }
```

Assim como com as outrar variáveis, o TypeScript geralmente consegui inferir o tipo de retorno das funções.

Além da declaração das funções em si, nó também podemos definir variáveis com o tipo de uma função, a notação desse tipo é muito proxima a declaração usando arrow functions:

```ts
let fun: (a: number, b: number) => number;
```

#### Objetos como parametros de funções

O TypeScript tem uma peculiaridade em relação à passagem de objetos como parâmetros de funções: Enquanto nos exemplos anteriores não podíamos definir chaves que não existiam no tipo do objeto, as funções definem apenas os campos que são obrigatórios no objeto.

```ts
const sendEmail = (person: {email: string}) => {
  ///
}

sendEmail(completeContact);
```
