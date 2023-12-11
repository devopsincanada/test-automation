
import { test, expect, APIRequestContext } from '@playwright/test';
import exp from 'constants';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import { env } from 'node:process';

type ZipCode = {
  area: string,
  state: string,
  city: string,
  zipcode: string
};

const testDataDirectory = './test-data';

function toTitleCase(str: string): string {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
}

async function loadZipCodesFromFile(filename: string): Promise<ZipCode[]> {
  return new Promise((resolve, reject) => {
    try {
      const results: ZipCode[] = [];
      fs.createReadStream(filename)
        .on('error', (error) => reject(error))
        .pipe(csvParser())
        .on('data', (row) => {
          console.log(row);
          results.push(row);
        })
        .on('end', () => {
          resolve(results);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

async function testZipCodeAPI(filename: string, request: APIRequestContext) {
  const baseUrl = 'https://api.zippopotam.us/us';
  const zipcodes = await loadZipCodesFromFile(filename);
  for (const zipcode of zipcodes) {
    await test.step(`testing with ${zipcode.zipcode}`, async () => {
      const response = await request.get(`${baseUrl}/${zipcode.zipcode}`);
      await expect(response).toBeOK();
      const json = await response.json();
      console.log(json);
      expect.soft(json).toHaveProperty('country', 'United States');
      expect.soft(json).toHaveProperty('places');
      expect.soft(json.places[0]).toHaveProperty('state abbreviation', zipcode.state);
      expect.soft(json.places[0]).toHaveProperty('place name', toTitleCase(zipcode.city));
    });
  }
}

test('Test zipcodes with parameters', async ({request}) => {
  const filename = process.env.TEST_FILENAME;
  expect(filename).toBeDefined();
  if (filename !== undefined) {
    await testZipCodeAPI(`${testDataDirectory}/${filename}`, request);
  }
});

test.describe('Test zipcodes', () => {

  test.beforeAll(async () => {
    try {
      // Put code here that needs to run before all tests
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

  test('Arizona', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-AZ.csv`, request);
  });

  test('California', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-CA.csv`, request);
  });

  test('Connecticut', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-CT.csv`, request);
  });

  test('Georgia', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-GA.csv`, request);
  });

  test('Pennsylvania', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-PA.csv`, request);
  });
  
  test('Texas', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-TX.csv`, request);
  });

});
