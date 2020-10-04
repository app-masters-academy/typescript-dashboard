/**
 * # TIPOS COMPLEXOS
 */

/**
 * Com um objeto declarado, podemos acessar os tipos de cada propriedade
 */

type Usuario = {
  nome: string;
  email: string;
  index: string;
};

const buscarPeloIndex = (index: Usuario["index"]) => {
  // Buscando usuário pelo index...
  console.log(index);
};

buscarPeloIndex("usuario-2");

/**
 * Tipos de utilidade - ReadOnly
 * Define que os atributos não podem ser mudados
 */

type Categoria = {
  index: string;
  titulo: string;
};

const categoria: Readonly<Categoria> = {
  index: "categoria-1",
  titulo: "Sapatos",
};

categoria.index = "categoria-2";

console.log(categoria);

/**
 * Tipos de utilidade - Partial
 * Define que todos atributos são opcionais: (sub-conjunto)
 */

type Loja = {
  index: string;
  nome: string;
  endereco: string;
};

const validarLoja = (loja) => {
  // Validações da loja
  console.log(loja);
};

validarLoja({});

/**
 * Tipos de utilidade - Pick + Omit
 * Define que alguns atributos são opcionais
 */

type UsuarioEmail = {
  nome: string;
  email: string;
  telefone: string;
};

const enviarEmail = (usuario: Omit<UsuarioEmail, "telefone">) => {
  console.log(usuario);
};

enviarEmail({ nome: "John", email: "john@appmasters.io" });

/**
 * Tipos genérico
 * Você consegue definir tipos que vão se montar
 */

type Conjunto<Tipo> = {
  lista: Tipo[];
};

const enviarEmailParaLista = (conjunto: Conjunto<UsuarioEmail>) => {
  console.log(conjunto);
};

enviarEmailParaLista({ lista: [] });
