import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();
const collegesTsvPath = resolve('./prisma/us_universities.tsv');

async function seedColleges() {
  const fileContent = fs.readFileSync(collegesTsvPath, 'utf-8');
  const lines = fileContent.trim().replaceAll('"', '').replaceAll("\r", "").split('\n')
  
  // Assuming the first line contains headers
  const headers = lines.shift().split('\t');
  
  const colleges = lines.map(line => {
    const columns = line.split('\t');
    const college = columns.reduce((acc, column, index) => {
      acc[headers[index]] = column;
      return acc;
    }, {});
    return {
      name: columns[0],
      url: columns[1],
    };
  });



  // await prisma.college.deleteMany({})
  // .catch(err => console.error(`Error deleting data: ${err.message}`));

  await prisma.college.create({
    data: colleges[0],
  }).catch(err => console.error(`Error inserting data: ${err.message}`));


  // await prisma.college.createMany({
  //   data: colleges,
  // }).catch(err => console.error(`Error inserting data: ${err.message}`));




  console.log(`${colleges.length} colleges inserted into the database.`);
  
  // Disconnect Prisma client after seeding
  await prisma.$disconnect();
}

seedColleges().catch((e) => {
  console.error(e);
  process.exit(1);
});
