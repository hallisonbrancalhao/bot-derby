import * as cheerio from "cheerio";

export function extractHtmlStructure(html: string): string {
  html = html
    .replace(/<br \/>/g, "\n")
    .replace(/<strong>/g, "**")
    .replace(/<\/strong>/g, "**");

  const $ = cheerio.load(html);
  const root = $("*");
  let structure = "";

  root.each((i, element) => {
    const text = $(element).children().remove().end().text().trim();
    if (text.length > 0) {
      structure += `${text}\n`;
    }

    const children = $(element).children();

    if (children.length > 0) {
      children.each((j, child) => {
        const childStr = `${$(child).text().trim()}`;
        structure += `${childStr}\n`;
      });
    }
  });

  return structure;
}
