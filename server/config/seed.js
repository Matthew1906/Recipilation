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
    new ObjectId("64e6f8a9bacdeb9481704cbd"),
    new ObjectId("64e6f8a9bacdeb9481704cbf"),
    new ObjectId("64e6f8a9bacdeb9481704cc1"),
    new ObjectId("64e6f8a9bacdeb9481704cc3"),
    new ObjectId("64e6f8a9bacdeb9481704cc5"),
    new ObjectId("64e6f8a9bacdeb9481704cc7"),
    new ObjectId("64e6f8a9bacdeb9481704cc9")
];

export const reviews = [
    "I tried this recipe last night, and it turned out to be absolutely delicious! The flavors were well-balanced, and the instructions were easy to follow. It quickly became a favorite. Highly recommend!",
    "I'm not much of a cook, but this recipe was so simple and foolproof. The end result was incredible! The dish had a perfect blend of spices, and the texture was just right. Definitely adding this to my go-to recipes.",
    "I made this recipe for a party, and it was a hit! The presentation was beautiful, and the taste was even better. The combination of ingredients was unique and created a burst of flavors. I received many compliments, and everyone wanted the recipe!",
    "I consider myself a foodie, and this recipe definitely satisfied my taste buds. The combination of ingredients was genius, and the flavors complemented each other perfectly.",
    "I tried this recipe for a special occasion, and it was a showstopper! The dish looked and tasted like something from a gourmet restaurant. The step-by-step instructions and helpful tips ensured that everything came together perfectly. This recipe is a gem!",
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


