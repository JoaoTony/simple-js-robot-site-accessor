import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync'

console.log("Conversor de Moedas");

const robot = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseCoin = readlineSync.question('Informe a moeda base: ') || 'dolar';
  const baseCoinQuantity = readlineSync.question('Informe a quantidade(ex: 1): ') || 1;
  const finalCoin = readlineSync.question('Informe a moeda final: ') || 'kwanza';

  const url = `https://www.google.com/search?q=${baseCoinQuantity}+${baseCoin}+para+${finalCoin}&sxsrf=AOaemvIH-mQF-jBkc01VxnQ0Aw1-TNXPGQ%3A1640043567719&ei=LxTBYYGsK8SM8gLwmYnYBQ&oq=${baseCoin}+para+kw&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BAgjECc6BAgAEEM6BwgAELEDEEM6BQguEIAEOgYIABAKEEM6CAgAEIAEELEDOggILhCABBCxAzoLCC4QgAQQxwEQ0QM6CQgAEEMQRhCCAjoHCAAQgAQQCkoECEEYAEoECEYYAFAAWLcYYIonaABwAngAgAGsA4gBySaSAQYzLTExLjKYAQCgAQHAAQE&sclient=gws-wiz`;
  await page.goto(url);
  await page.screenshot({ path: 'example.png' });

  const getResultValueFromBrowser = await page.evaluate(() =>
    document.querySelector(".a61j6.vk_gy.vk_sh.Hg3mWc").value
  );

  const result = getResultValueFromBrowser;

  if(!result) {
    console.log("Alguma coisa deu errado!");
  } else {
    console.log(`O valor de ${baseCoinQuantity} ${baseCoin} em ${finalCoin} é ${result}`);
  }

  await browser.close();
}

robot();