// testbot.cjs
const { chromium } = require('playwright');
// Importa a versão 7.6.0 do Faker, que é compatível com require()
const { faker } = require('@faker-js/faker/locale/pt_BR');

// --- CONFIGURAÇÕES PRINCIPAIS ---
const URL_DO_SITE = 'https://m-chat-seven.vercel.app';
const NUMERO_DE_TESTES = 100; // Ajuste quantas vezes o bot deve rodar

async function executarTeste(numeroDoTeste) {
  let browser;
  console.log(`\n--- INICIANDO TESTE ${numeroDoTeste} de ${NUMERO_DE_TESTES} ---`);
  try {
    // Para assistir o bot em ação: { headless: false, slowMo: 100 }
    // Para rodar rápido em segundo plano: { headless: true }
    browser = await chromium.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    await page.goto(URL_DO_SITE);

    // --- PÁGINA DE REGISTRO (JÁ ESTÁ FUNCIONANDO) ---
    console.log('Preenchendo o formulário de registro...');
    await page.locator('#terms').click();
    await page.locator('#nomeMae').fill(faker.name.fullName({ sex: 'female' }));
    await page.locator('#nomeCrianca').fill(faker.name.fullName());
    await page.locator('#idade').fill(faker.datatype.number({ min: 16, max: 30 }).toString());
    await page.locator('#sexo').selectOption(faker.helpers.arrayElement(['Masculino', 'Feminino']));
    const cidades = [
        'Bom Princípio', 'Feliz', 'Harmonia', 'Montenegro', 'Nova Petrópolis',
        'Pareci Novo', 'Picada Café', 'Presidente Lucena', 'São José do Hortêncio',
        'São Sebastião do Caí', 'Tupandi', 'Vale Real'
    ];
    const cidadeAleatoria = faker.helpers.arrayElement(cidades);
    await page.locator('#cidade').click();
    await page.locator('#cidade').selectOption({ label: cidadeAleatoria });
    console.log(`Registro preenchido para: ${cidadeAleatoria}`);
    await page.getByRole('button', { name: 'Registrar' }).click();

    // --- PÁGINA DO QUESTIONÁRIO ---
    await page.waitForSelector('#container-q0'); // Espera o container da primeira pergunta
    console.log('Iniciando o preenchimento do questionário...');
    const totalPerguntas = 23;

    // --- CORREÇÃO FINAL APLICADA AQUI 💡 ---
    // O loop agora vai de 0 a 22 para corresponder aos IDs (container-q0, container-q1, etc.)
    for (let i = 0; i < totalPerguntas; i++) {
        const resposta = Math.random() < 0.5 ? 'Sim' : 'Não';
        
        // 1. Construímos o seletor de ID único para o container da pergunta atual.
        const seletorContainer = `#container-q${i}`;
        const containerDaPerguntaAtual = page.locator(seletorContainer);
        
        // 2. Clicamos na resposta "Sim" ou "Não" DENTRO daquele container específico.
        await containerDaPerguntaAtual.getByText(resposta, { exact: true }).click();
    }
    // --- FIM DA CORREÇÃO ---

    console.log(`${totalPerguntas} perguntas respondidas aleatoriamente.`);

    // 6. Clica em Concluir
    await page.getByRole('button', { name: 'Concluir' }).click();
    console.log('Questionário concluído e enviado.');
    await page.waitForTimeout(3000); // Pausa para garantir o envio

  } catch (error) {
    console.error(`Ocorreu um erro no teste ${numeroDoTeste}:`, error);
  } finally {
    if (browser) {
      await browser.close();
      console.log(`--- TESTE ${numeroDoTeste} FINALIZADO ---`);
    }
  }
}

// Função principal que executa o loop de testes
async function rodarBot() {
  for (let i = 1; i <= NUMERO_DE_TESTES; i++) {
    await executarTeste(i);
  }
  console.log(`\n✅ Processo finalizado. ${NUMERO_DE_TESTES} testes foram executados.`);
}

// Inicia o processo
rodarBot();