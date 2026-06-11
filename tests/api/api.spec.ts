import { test, expect } from '@playwright/test'
import users from '../../test-data/users.json';


test.describe('API Tests', () => {

    //TC 1 - GET:
    test('GET request @api', async ({ request }) => {
        test.info().annotations.push({
            type: 'API Test',
            description: 'Verify GET method'
        })
    
        const response = await test.step('Send GET request', async () => {
            return await request.get('/api/users?page=2');
        });

        expect(response.status()).toBe(200);
        
        // Parse the JSON response body from the API
        const body = await response.json();

        // Assert "total" field is 12 and "per_page" field is 6
        expect(body.total).toBe(12);
        expect(body.per_page).toBe(6);

        //Assert count of users equals "per_page"
        expect(body.data.length).toBe(body.per_page);

        //Assert "last_name" for first and second user
        expect(body.data[0].last_name).toBe('Lawson');
        expect(body.data[1].last_name).toBe('Ferguson');

        //Optional bonus: type check (total should be number and data should be an array)
        expect(typeof body.total).toBe('number');
        expect(typeof body.per_page).toBe('number');
        expect(Array.isArray(body.data)).toBe(true);
    });

    //TC 2 - POST
    for (const user of users) {
        test(`POST request @api - ${user.name}`, async ({ request }) => {
            test.info().annotations.push({
                type: 'API Test',
                description: `Verify POST method for user ${user.name}`
            });

            const { response, duration } = await test.step('Send POST request', async () => {
                //Starting to measure time of request
                const start = Date.now();

                //Using external source of data
                const response = await request.post('/api/users', {
                    data: user
                });

                //Ending to measure time of request
                const duration = Date.now() - start;
                return { response, duration };
            });

            //Checking whether the response is OK and whether it returns code 201
            await test.step ('Validate status code', async () => {
                expect(response.status()).toBe(201);
            });

            const responseBody = await response.json();


            //Bonus task: Verifying the response schema
            await test.step('Validate response schema', async () => {
                expect(responseBody).toMatchObject({
                    name: expect.any(String),
                    job: expect.any(String),
                    id: expect.any(String),
                    createdAt: expect.any(String)
                });

            //Checking response data
            await test.step('Validate response data', async () => {
                expect(responseBody.name).toBe(user.name);
                expect(responseBody.job).toBe(user.job);
            });
            });

            //Using .soft so that tests continue even if the response time is more than 100ms
            await test.step('Validate response time', async () => {
                expect.soft(duration).toBeLessThan(100);
            });

            //Response time annotation in report
            if(duration > 100) {
                test.info().annotations.push({
                    type: 'performance-warning',
                    description: `Response time exceeded 100 ms! The response time is: ${duration} ms`
                });
            }
        });
    }
});