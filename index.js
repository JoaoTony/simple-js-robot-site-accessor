import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync'

console.log("Bem-vindo ao Robot");

const robot = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const moedaBase = readlineSync.question('Informe a moeda base: ') || 'dolar';
  const moedaFinal = readlineSync.question('Informe a moeda final: ') || 'kwanza';

  const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&sxsrf=AOaemvIH-mQF-jBkc01VxnQ0Aw1-TNXPGQ%3A1640043567719&ei=LxTBYYGsK8SM8gLwmYnYBQ&oq=${moedaBase}+para+kw&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BAgjECc6BAgAEEM6BwgAELEDEEM6BQguEIAEOgYIABAKEEM6CAgAEIAEELEDOggILhCABBCxAzoLCC4QgAQQxwEQ0QM6CQgAEEMQRhCCAjoHCAAQgAQQCkoECEEYAEoECEYYAFAAWLcYYIonaABwAngAgAGsA4gBySaSAQYzLTExLjKYAQCgAQHAAQE&sclient=gws-wiz`;
  await page.goto(url);
  await page.screenshot({ path: 'example.png' });

  const getResultValueFromNavegator = await page.evaluate(() =>  
    document.querySelector(".a61j6.vk_gy.vk_sh.Hg3mWc").value
  );

  const result = getResultValueFromNavegator;

  console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${result}`);
  await browser.close();
}

robot();