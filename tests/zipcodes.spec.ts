
import { test, expect, APIRequestContext } from '@playwright/test';
import exp from 'constants';
import * as fs from 'fs';
import csvParser from 'csv-parser';

type ZipCode = {
  area: string,
  state: string,
  city: string,
  zipcode: string
};

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

test.describe('Test zipcode API', () => {

  const testDataDirectory = './test-data';

  test.beforeAll(async () => {
    try {
      // Put code here that needs to run before all tests
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });

  test('Arizona zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-AZ.csv`, request);
  });

  test('California zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-CA.csv`, request);
  });

  test('Connecticut zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-CT.csv`, request);
  });

  test('Georgia zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-GA.csv`, request);
  });

  test('Pennsylvania zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-PA.csv`, request);
  });
  
  test('Texas zipcodes', async ({request}) => {
    await testZipCodeAPI(`${testDataDirectory}/usps-zipcodes-TX.csv`, request);
  });

});
