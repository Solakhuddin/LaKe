import {
  createManyTestIncomes,
  createManyTestSpends,
  createTestUser,
  removeAllTestIncomes,
  removeAllTestSpends,
  removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logger.js";


describe('GET /api/report', function () {
  beforeEach(async () => {
      await createTestUser();
      await createManyTestIncomes();
     await createManyTestSpends();
  })

  afterEach(async () => {
      await removeAllTestIncomes();
      await removeAllTestSpends();
      await removeTestUser();
  })

  // it('should can search without parameter', async () => {
  //     const result = await supertest(web)
  //         .get('/api/report')
  //         .set('Authorization', 'test');

  //     expect(result.status).toBe(200);
  //     expect(result.body.data.length).toBe(2);
  // });

  it('should can search using created_at', async () => {
      const result = await supertest(web)
          .get('/api/report')
          .query({
              created_at: "2025-02"
          })
          .set('Authorization', 'test');

      logger.info(result.body);
      console.log(result.body);
      console.log(result.body);
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty('incomes');
      expect(result.body).toHaveProperty('spends');
  });
});
