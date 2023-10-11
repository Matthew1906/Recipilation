import fs from "fs";
import ejs from "ejs";
// import puppeteer from "puppeteer";
import pdf from "html-pdf";

export const saveToPDF = async(recipe)=>{
  
    // Create a browser instance
    // const browser = await puppeteer.launch({headless:"new"});
  
    // Create a new page
    // const page = await browser.newPage();
  
    //Get HTML content from HTML file
    const html = fs.readFileSync('./data/template.ejs', 'utf-8');
    const filled = ejs.render(html, {
      recipe, 
      categories:recipe.categories, 
      steps:recipe.steps,
      ingredients: recipe.ingredients,
      equipments: recipe.equipments 
    });

    // await page.setContent(filled, { waitUntil: 'networkidle0' });
  
    // To reflect CSS used for screens instead of print
    // await page.emulateMediaType('screen');
  
    // Downlaod the PDF
    // const pdf = await page.pdf({
      // margin: { top: '25px', right: '50px', bottom: '50px', left: '50px' },
      // printBackground: true,
      // format: 'A4',
    // });
  
    // Close the browser instance
    // await browser.close();

    pdf.create(filled, { format: 'A4' });

    return pdf;
}