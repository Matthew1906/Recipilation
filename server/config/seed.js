import ExcelJS from 'exceljs';
import { ObjectId } from 'mongodb';

export const categories = [
    'Breakfast', 'Brunch', 'Lunch', 'Dinner', 
    'Appetizers', 'Main Courses', 'Desserts', 'Sides', 
    'Snacks', 'Drinks', 'Meat', 'Seafood', 
    'Poultry', 'Vegetarian','Rice', 'Noodles', 
    'Pasta', 'Salad', 'American', 'Chinese', 
    'European', 'Indian', 'Italian', 'Japanese', 
    'Korean', 'Mexican', 'Thai', 'Vietnamese'
];

export const users = [
    'Simply Ryan', 'Simply Betty', 'Simply Kenny', 'Simply Gaby',
    'Simply Michael', 'Simply Petra', 'Simply Logan'
];

export const userIds = [
    new ObjectId("6479feab87cdb222302952c7"),
    new ObjectId("6479feab87cdb222302952cd"),
    new ObjectId("6479feab87cdb222302952cf"),
    new ObjectId("6479feab87cdb222302952d1"),
    new ObjectId("6479feac87cdb222302952d4"),
    new ObjectId("6479feab87cdb222302952cb"),
    new ObjectId("6479feab87cdb222302952c9")
];

const getCellValue = (row, cellIndex) => {
    const cell = row.getCell(cellIndex);
    return cell.value ? cell.value.toString() : '';
  };

export const getRecipes = async()=>{
    const workbook = new ExcelJS.Workbook();
    const content = await workbook.xlsx.readFile('./data/seed.xlsx');
    const worksheet = content.worksheets[0]
    const startIndex = 2;
    const numRows = 21;
    const rows = worksheet.getRows(startIndex, numRows) ?? [];
    return rows.map(recipe=>({
        name:getCellValue(recipe, 2),
        description:getCellValue(recipe, 3),
        categories:getCellValue(recipe, 4),
        servingSize:getCellValue(recipe, 5),
        difficulty:getCellValue(recipe, 6),
        cookingTime:getCellValue(recipe, 7),
        preparationTime:getCellValue(recipe, 8),
        ingredients:getCellValue(recipe, 9),
        equipments:getCellValue(recipe, 10)
    }));
};

export const getSteps = async()=>{
    const workbook = new ExcelJS.Workbook();
    const content = await workbook.xlsx.readFile('./data/seed.xlsx');
    const worksheet = content.worksheets[2]
    const startIndex = 2;
    const numRows = 117;
    const rows = worksheet.getRows(startIndex, numRows) ?? [];
    return rows.map(step=>({
        index:getCellValue(step, 1),
        recipe:getCellValue(step, 2),
        title:getCellValue(step, 3),
        details:getCellValue(step, 4),
        image:getCellValue(step, 5)
    }));
}
