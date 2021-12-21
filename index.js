import puppeteer from 'puppeteer';
import readlineSync from 'readline-sync'

console.log("CONVERSOR DE MOEDAS");

const getResultValueFromBrowser = async page => {
  return await page.evaluate(() => {
    const $value = document.querySelector(".a61j6.vk_gy.vk_sh.Hg3mWc");
      return $value?.value;
  })
}

const robot = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseCoin = readlineSync.question('Informe a moeda base(ex: dolar): ') || 'dolar';
  const baseCoinQuantity = readlineSync.question('Informe a quantidade(ex: 1): ') || 1;
  const finalCoin = readlineSync.question('Informe a moeda final(ex: kwanza): ') || 'kwanza';

  const url = `https://www.google.com/search?q=${baseCoinQuantity}+${baseCoin}+para+${finalCoin}&sxsrf=AOaemvIH-mQF-jBkc01VxnQ0Aw1-TNXPGQ%3A1640043567719&ei=LxTBYYGsK8SM8gLwmYnYBQ&oq=${baseCoin}+para+kw&gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB46BAgjECc6BAgAEEM6BwgAELEDEEM6BQguEIAEOgYIABAKEEM6CAgAEIAEELEDOggILhCABBCxAzoLCC4QgAQQxwEQ0QM6CQgAEEMQRhCCAjoHCAAQgAQQCkoECEEYAEoECEYYAFAAWLcYYIonaABwAngAgAGsA4gBySaSAQYzLTExLjKYAQCgAQHAAQE&sclient=gws-wiz`;
  await page.goto(url);

  const result = await getResultValueFromBrowser(page);
  
  if(!result) {
    console.log("Alguma coisa deu errado, certifica-se de informar as moedas e a quantidade corretamente. ");
  } else {
    console.log(`O valor de ${baseCoinQuantity} ${baseCoin} em ${finalCoin} é ${result}`);
  }

  await browser.close();
}

robot();