import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import { db, pool } from ".";
import { env } from "../config/env";
import { inArray } from "drizzle-orm";
import {
  contactsGroupsTable,
  contactsTable,
  groupsTable,
  usersTable,
} from "./schema";

const groups = [
  "Família",
  "Amigos",
  "Trabalho",
  "Faculdade",
  "Vizinhos",
  "Clientes",
  "Fornecedores",
  "Equipe de Projeto",
  "Recursos Humanos",
  "Financeiro",
  "Marketing",
  "Vendas",
  "Tecnologia",
  "Design",
  "Diretoria",
  "Ex-colegas",
  "Alunos",
  "Professores",
  "Academia",
  "Futebol",
  "Igreja",
  "Voluntariado",
  "Condomínio",
  "Escola das Crianças",
  "Pessoal",
  "Profissionais",
  "Contabilidade",
  "Jurídico",
  "Saúde",
  "Médicos",
  "Viagens",
  "Eventos",
  "Aniversariantes",
  "Parceria Comercial",
  "Imprensa",
  "Investidores",
  "Mentores",
  "Networking",
  "Comunidade Tech",
  "Curso de Inglês",
  "Clube do Livro",
  "Música",
  "Fotografia",
  "Pets",
  "Emergência",
  "Prestadores de Serviço",
  "Restaurantes",
  "Compras",
  "Contatos Importantes",
  "Outros",
].map((name) => ({ name }));

const firstNames = [
  "Mariana",
  "Rafael",
  "Camila",
  "Lucas",
  "Beatriz",
  "Felipe",
  "Isabela",
  "Thiago",
  "Helena",
  "André",
  "Juliana",
  "Mateus",
  "Larissa",
  "Gustavo",
  "Natália",
  "Bruno",
  "Carolina",
  "Eduardo",
  "Aline",
  "Vinícius",
  "Sofia",
  "Pedro",
  "Fernanda",
  "Caio",
  "Daniel",
  "Manuela",
  "Ricardo",
  "Bianca",
  "Leonardo",
  "Letícia",
];

const lastNames = [
  "Almeida",
  "Azevedo",
  "Barbosa",
  "Barros",
  "Campos",
  "Cardoso",
  "Carvalho",
  "Castro",
  "Costa",
  "Cunha",
  "Dias",
  "Fernandes",
  "Ferreira",
  "Freitas",
  "Gomes",
  "Lima",
  "Lopes",
  "Martins",
  "Mendes",
  "Moraes",
  "Moreira",
  "Nunes",
  "Oliveira",
  "Pereira",
  "Ramos",
  "Ribeiro",
  "Rocha",
  "Rodrigues",
  "Santos",
  "Silva",
  "Souza",
  "Teixeira",
  "Vieira",
];

const makePersonName = (index: number): string =>
  `${firstNames[index % firstNames.length]} ${lastNames[Math.floor(index / firstNames.length) % lastNames.length]}`;

const streetNames = [
  "das Acácias",
  "Boa Vista",
  "dos Pinheiros",
  "Dom Pedro II",
  "das Palmeiras",
  "Sete de Setembro",
  "Rui Barbosa",
  "dos Ipês",
  "São Bento",
  "dos Andradas",
  "da Liberdade",
  "Nossa Senhora de Fátima",
  "do Comércio",
  "Quinze de Novembro",
  "das Flores",
  "Afonso Pena",
  "do Carmo",
  "dos Bandeirantes",
  "Santo Antônio",
  "Tiradentes",
];

const neighborhoods = [
  "Vila Mariana",
  "Pinheiros",
  "Moema",
  "Tatuapé",
  "Centro",
  "Lapa",
  "Santana",
  "Perdizes",
  "Cambuci",
  "Vila Madalena",
  "Ipiranga",
  "Aclimação",
  "Jardins",
  "Brooklin",
  "Consolação",
];

const cities = [
  ["São Paulo", "SP"],
  ["Campinas", "SP"],
  ["Santos", "SP"],
  ["Rio de Janeiro", "RJ"],
  ["Niterói", "RJ"],
  ["Belo Horizonte", "MG"],
  ["Curitiba", "PR"],
  ["Florianópolis", "SC"],
  ["Porto Alegre", "RS"],
  ["Brasília", "DF"],
  ["Salvador", "BA"],
  ["Recife", "PE"],
  ["Fortaleza", "CE"],
  ["Goiânia", "GO"],
  ["Vitória", "ES"],
];

const observationNotes = [
  "Torcedor do Palmeiras; costuma acompanhar os jogos aos domingos.",
  "Prefere receber mensagens pelo WhatsApp no período da manhã.",
  "Conheceu a equipe em um evento de tecnologia no ano passado.",
  "Está organizando uma mudança e pediu indicação de transportadora.",
  "Gosta de futebol e participa de uma pelada nas noites de quarta-feira.",
  "Cliente desde 2022; prefere combinar horários com alguns dias de antecedência.",
  "Tem interesse em fotografia e costuma compartilhar dicas de equipamentos.",
  "Indicado pela equipe financeira para tratar de assuntos de faturamento.",
  "Tem uma cachorra chamada Mel; perguntou por clínicas veterinárias na região.",
  "Prefere ligações para assuntos urgentes e e-mail para os demais.",
  "Está fazendo aulas de inglês às terças e quintas à noite.",
  "Combinamos de retomar a conversa sobre o projeto no próximo mês.",
  "Gosta de cozinhar e costuma indicar restaurantes novos no bairro.",
  "Trabalhou com a equipe em um projeto de implantação em 2023.",
  "Participa de ações voluntárias aos sábados uma vez por mês.",
  "Pediu para evitar contato durante o horário de almoço.",
  "Tem interesse em corrida de rua e se prepara para uma prova em outubro.",
  "Responsável por aprovar os pedidos; enviar a proposta por e-mail.",
  "Mora perto do escritório e se ofereceu para ajudar com eventos locais.",
  "Gosta de música ao vivo e acompanha a agenda de shows da cidade.",
  "Conhecido do grupo de leitura; prefere conversar sobre livros de história.",
  "Está avaliando fornecedores para o próximo trimestre.",
  "Prefere reuniões curtas no início da tarde, de preferência por vídeo.",
  "Tem dois filhos em idade escolar; normalmente fica indisponível no fim da tarde.",
  "Fã de ciclismo; costuma fazer passeios aos domingos pela manhã.",
  "Já enviou os documentos de cadastro; falta confirmar o endereço de entrega.",
  "Contato de emergência indicado pela família.",
  "Está aprendendo a tocar violão e participa de encontros de música.",
  "Pediu para avisar com antecedência quando houver manutenção programada.",
  "Conheceu a equipe por meio de uma parceria comercial recente.",
  "Costuma viajar a trabalho no começo do mês; confirmar disponibilidade antes.",
  "Prefere receber notas fiscais e comprovantes em um único e-mail.",
  "Participa da organização dos eventos do condomínio.",
  "Tem interesse em jardinagem e compartilhou contato de um viveiro local.",
  "Acompanha basquete e costuma assistir aos jogos com amigos.",
  "Solicitou retorno depois de conversar com o time jurídico.",
  "Voluntário na feira comunitária do bairro no último sábado de cada mês.",
  "Prefere atendimento em espanhol; entende português, mas fala pouco.",
  "Está planejando férias para dezembro; evitar marcar reuniões nesse período.",
  "Indicado por um ex-colega para oportunidades de trabalho na área de design.",
  "Tem interesse em tecnologia educacional e acompanha cursos online.",
  "Gosta de trilhas e costuma viajar para parques nacionais nos feriados.",
  "Já trabalhou com a equipe de suporte; conhece bem o processo de atendimento.",
  "Pediu uma cópia impressa do contrato para consultar com calma.",
  "Participa de um clube de xadrez nas noites de sexta-feira.",
  "Prefere ser chamado pelo primeiro nome e não pelo sobrenome.",
  "Está reformando a casa e pode precisar de indicação de eletricista.",
  "Contato apresentado durante uma conferência de negócios em São Paulo.",
  "Gosta de café especial e indicou uma cafeteria perto do centro.",
  "Manter em cópia nas atualizações do projeto até a entrega final.",
  "Tem um gato idoso e costuma marcar consultas veterinárias pela manhã.",
  "Falamos sobre uma possível colaboração para o próximo semestre.",
  "Está se preparando para uma certificação profissional em novembro.",
  "Pediu para enviar o material da reunião em formato PDF.",
  "Pratica natação três vezes por semana antes do trabalho.",
  "Ajuda a coordenar as compras e prefere receber uma lista detalhada.",
  "Conhece bem a região e costuma recomendar prestadores de serviço locais.",
  "Tem interesse em sustentabilidade e participa de um projeto de reciclagem.",
  "Foi professor da equipe em um curso de extensão universitária.",
  "Prefere contato por e-mail durante a semana e telefone aos sábados.",
  "Está cuidando de um familiar e pode precisar reagendar compromissos.",
  "Gosta de documentários e costuma recomendar filmes para o clube do livro.",
  "Acompanha futebol feminino e vai a alguns jogos durante a temporada.",
  "Enviou uma indicação de fornecedor; agradecer na próxima conversa.",
  "Trabalha em horário flexível e responde melhor no começo da noite.",
  "Está procurando um curso de programação para a filha adolescente.",
  "Conheceu a equipe por meio da associação de moradores do bairro.",
  "Pediu que as propostas incluam prazo de validade e condições de pagamento.",
  "Participa de um coral comunitário e ensaia às quartas-feiras.",
  "Gosta de viagens curtas de carro e costuma sair nos feriados prolongados.",
  "Vai avaliar a proposta com os sócios antes de confirmar a reunião.",
  "Prefere receber lembretes um dia antes de cada compromisso.",
  "Tem experiência com atendimento ao cliente e pode ajudar em treinamentos.",
  "Está montando um pequeno negócio de produtos artesanais.",
  "Costuma frequentar a academia no horário do almoço.",
  "Tem interesse em história local e participa de visitas guiadas no centro.",
  "Aguardando confirmação da disponibilidade para a próxima semana.",
  "Gosta de fotografia de natureza e participa de saídas aos fins de semana.",
  "Indicado pelo grupo de empreendedores da região.",
  "Pediu para atualizar o telefone antes do próximo contato.",
  "Está estudando para uma prova de idioma no fim do semestre.",
  "Costuma ajudar na organização dos campeonatos de futebol do bairro.",
];

const contacts = Array.from({ length: 100 }, (_, index) => {
  const name = makePersonName(index + 100);
  const emailName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]+/g, ".")
    .replace(/^\.|\.$/g, "");

  return {
    name,
    email: `${emailName}.${String(index + 1).padStart(3, "0")}@example.com`,
    phone: `+55 11 9${String(10000000 + index).slice(-8)}`,
    is_active: index % 9 !== 0,
    observations:
      index % 5 === 0
        ? null
        : observationNotes[(index * 7) % observationNotes.length],
  };
});

const multiRecordOwnerCount = 3;
const recordsPerMultiRecordOwner = 7;
const multiOwnerRecordCount =
  multiRecordOwnerCount * recordsPerMultiRecordOwner;

const ownerIndexForRecord = (index: number): number =>
  index < multiOwnerRecordCount
    ? Math.floor(index / recordsPerMultiRecordOwner)
    : index - multiOwnerRecordCount + multiRecordOwnerCount;

async function seed() {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NODE_ENV !== "test"
  ) {
    throw new Error(
      "Defina NODE_ENV=development ou NODE_ENV=test para executar o seed.",
    );
  }

  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const userPassword = process.env.SEED_USER_PASSWORD;
  if (!adminPassword || !userPassword) {
    throw new Error(
      "Defina SEED_ADMIN_PASSWORD e SEED_USER_PASSWORD antes de executar o seed.",
    );
  }
  for (const password of [adminPassword, userPassword]) {
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      throw new Error(
        "As senhas do seed devem ter 8+ caracteres e conter maiúscula, minúscula, número e caractere especial.",
      );
    }
  }

  const adminHash = await bcrypt.hash(adminPassword, 13);
  const userHash = await bcrypt.hash(userPassword, 13);
  const userSeeds = Array.from({ length: 100 }, (_, index) => ({
    id: randomUUID(),
    fullname: makePersonName(index),
    email: `seed.${index < 2 ? "admin" : "user"}.${String(index + 1).padStart(3, "0")}@example.com`,
    cpf: createCpf(index + 1),
    phone: `+55 11 9${String(20000000 + index).slice(-8)}`,
    address: `Rua ${streetNames[index % streetNames.length]}, ${120 + index}, ${neighborhoods[index % neighborhoods.length]}, ${cities[index % cities.length][0]} - ${cities[index % cities.length][1]}`,
    password: index < 2 ? adminHash : userHash,
    role: index < 2 ? ("ADMIN" as const) : ("USER" as const),
  }));
  const groupSeeds = Array.from({ length: 100 }, (_, index) => ({
    id: randomUUID(),
    name: groups[index % groups.length].name,
    user_id: userSeeds[ownerIndexForRecord(index)].id,
  }));
  const contactSeeds = contacts.map((contact, index) => ({
    id: randomUUID(),
    ...contact,
    user_id: userSeeds[ownerIndexForRecord(index)].id,
  }));
  const groupsByOwner = new Map<string, typeof groupSeeds>();
  for (const group of groupSeeds) {
    const ownerGroups = groupsByOwner.get(group.user_id) ?? [];
    ownerGroups.push(group);
    groupsByOwner.set(group.user_id, ownerGroups);
  }
  const contactsByOwner = new Map<string, typeof contactSeeds>();
  for (const contact of contactSeeds) {
    const ownerContacts = contactsByOwner.get(contact.user_id) ?? [];
    ownerContacts.push(contact);
    contactsByOwner.set(contact.user_id, ownerContacts);
  }
  const contactsGroups = contactSeeds.flatMap((contact) => {
    const ownerGroups = groupsByOwner.get(contact.user_id)!;
    const ownerContacts = contactsByOwner.get(contact.user_id)!;
    const contactPosition = ownerContacts.indexOf(contact);
    const groupPositions =
      ownerGroups.length === 1
        ? [0]
        : [
            contactPosition,
            (contactPosition + 1) % ownerGroups.length,
            (contactPosition + 3) % ownerGroups.length,
          ];

    return [...new Set(groupPositions)].map((groupPosition) => ({
      id: randomUUID(),
      user_id: contact.user_id,
      contact_id: contact.id,
      group_id: ownerGroups[groupPosition].id,
    }));
  });
  const previousSeedEmails = Array.from(
    { length: 100 },
    (_, index) =>
      `seed.${index < 2 ? "admin" : "user"}.${String(index + 1).padStart(3, "0")}@example.com`,
  );

  await db.transaction(async (transaction) => {
    await transaction
      .delete(usersTable)
      .where(inArray(usersTable.email, previousSeedEmails));
    await transaction.insert(usersTable).values(userSeeds);
    await transaction.insert(groupsTable).values(groupSeeds);
    await transaction.insert(contactsTable).values(contactSeeds);
    await transaction.insert(contactsGroupsTable).values(contactsGroups);
  });

  console.log(
    `Seed concluído: ${userSeeds.length} usuários (2 ADMIN), ${groupSeeds.length} grupos, ${contactSeeds.length} contatos e ${contactsGroups.length} vínculos.`,
  );
}

const createCpf = (sequence: number): string => {
  const digits = String(100_000_000 + sequence)
    .split("")
    .map(Number);
  const calculateDigit = (values: number[], initialWeight: number): number => {
    const remainder =
      values.reduce(
        (sum, digit, index) => sum + digit * (initialWeight - index),
        0,
      ) % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  const firstDigit = calculateDigit(digits, 10);
  const secondDigit = calculateDigit([...digits, firstDigit], 11);
  return [...digits, firstDigit, secondDigit]
    .join("")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

seed()
  .catch((error: unknown) => {
    console.error("Erro ao executar o seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
