/**
 * # OBJETOS
 */

/**
 * `endereco` é um objeto que deve ter os itens `rua`, `numero` e `bairro`
 */
// let endereco: { rua: string; numero: number; bairro: string };

// endereco = {
//   rua: 'Barão do Rio Branco',
//   numero: 3480,
//   bairro: 'Altos Passos'
// };

/**
 * É possível definir campos opcionais usando `?:`
 */
// let endereco: { rua: string; numero: number; complemento?: string; bairro: string };

// endereco = {
//   rua: 'Barão do Rio Branco',
//   numero: 3480,
//   bairro: 'Altos Passos'
// };

/**
 * Para reutilizar o tipo de `endereco` usamos interfaces
 */
// interface Endereco {
//   rua: string;
//   numero: number;
//   bairro: string;
// }

/**
 * # UNIÃO E INTERSECÇÃO DE TIPOS
 */

 /**
  * Algumas variaveis pode assumir pode representar mais de uma coisa, usamos a intersecção dos tipos com `|`
  */
// interface ContatoEmail {
//   nome: string;
//   email: string;
// }

// interface ContatoTelefone {
//   nome: string;
//   telefone: string;
// }

// let contato: ContatoEmail | ContatoTelefone;


/**
 * Também é possível que uma variável implemente mais de um tipo ao mesmo tempo, usamos `&`
 */
// let contatoCompleto: ContatoEmail & ContatoTelefone;

/**
 * Para reaproveitar tipos usamos type
 */
// type ContatoCompleto = ContatoEmail & ContatoTelefone;
// let contatoCompleto: ContatoCompleto;
