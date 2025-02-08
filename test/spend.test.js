import {
  createManyTestSpends,
  createTestSpend,
  createTestUser,
  getTestSpend,
  removeAllTestSpends,
  removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logger.js";

describe('POST /api/spends', function () {
  beforeEach(async () => {
      await createTestUser();
  })

  afterEach(async () => {
      await removeAllTestSpends();
      await removeTestUser();
  })

  it('should can create new income', async () => {
      const result = await supertest(web)
          .post("/api/spends")
          .set('Authorization', 'test')
          .send({
              username: "test",
              amount: 100000,
              category: "Gajian",
              description: "Gajian bulan september"
          });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBeDefined();
      expect(result.body.data.username).toBe("test");
      expect(Number(result.body.data.amount)).toBe(100000);
      expect(result.body.data.category).toBe("Gajian");
      expect(result.body.data.description).toBe("Gajian bulan september");
  });

  it('should reject if request is not valid', async () => {
      const result = await supertest(web)
          .post("/api/spends")
          .set('Authorization', 'test')
          .send({
            username: "test",
            amount: 100000,
            category: 12313,
            description: "Gajian bulan september"
          });

      expect(result.status).toBe(400);
      expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/spends/:spendId', function () {
  beforeEach(async () => {
      await createTestUser();
      await createTestSpend();
  })

  afterEach(async () => {
      await removeAllTestSpends();
      await removeTestUser();
  })

  it('should can get contact', async () => {
      const testIncome = await getTestSpend();

      const result = await supertest(web)
          .get("/api/spends/" + testIncome.id)
          .set('Authorization', 'test');
      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testIncome.id);
      expect(result.body.data.username).toBe(testIncome.username);
      expect(Number(result.body.data.amount)).toBe(Number(testIncome.amount));
      expect(result.body.data.category).toBe(testIncome.category);
      expect(result.body.data.description).toBe(testIncome.description);
  });

  it('should return 404 if contact id is not found', async () => {
      const testIncome = await getTestSpend();

      const result = await supertest(web)
          .get("/api/spends/" + (testIncome.id + 1))
          .set('Authorization', 'test');

      expect(result.status).toBe(404);
  });
});

describe('PUT /api/spends/:spendId', function () {
  beforeEach(async () => {
      await createTestUser();
      await createTestSpend();
  })

  afterEach(async () => {
      await removeAllTestSpends();
      await removeTestUser();
  })

  it('should can update existing income', async () => {
      const testIncome = await getTestSpend();

      const now = Date.now();
      const date = new Date(now);
      const result = await supertest(web)
          .put('/api/spends/' + testIncome.id)
          .set('Authorization', 'test')
          .send({
              category: "Hadiah",
              description: "Uang hadiah dari Ibu",
              updated_at: now
          });

      expect(result.status).toBe(200);
      expect(result.body.data.id).toBe(testIncome.id);
      expect(result.body.data.category).toBe("Hadiah");
      expect(result.body.data.description).toBe("Uang hadiah dari Ibu");
      expect(result.body.data.updated_at).toBe(date.toISOString());
  });

  it('should reject if request is invalid', async () => {
      const testContact = await getTestSpend();

      const result = await supertest(web)
          .put('/api/spends/' + testContact.id)
          .set('Authorization', 'test')
          .send({
            category: "",
            description: "",
            updated_at: ""
          });

      expect(result.status).toBe(400);
  });

//   it('should reject if income is not found', async () => {
//       const testContact = await getTestContact();

//       const result = await supertest(web)
//           .put('/api/spends/' + (testContact.id + 1))
//           .set('Authorization', 'test')
//           .send({
//               first_name: "Eko",
//               last_name: "Khannedy",
//               email: "eko@pzn.com",
//               phone: "09999999"
//           });

//       expect(result.status).toBe(404);
//   });
});

describe('DELETE /api/spends/:contactId', function () {
  beforeEach(async () => {
      await createTestUser();
      await createTestSpend();
  })

  afterEach(async () => {
      await removeAllTestSpends();
      await removeTestUser();
  })

  it('should can delete Income', async () => {
      let testIncome = await getTestSpend();
      const result = await supertest(web)
          .delete('/api/spends/' + testIncome.id)
          .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data).toBe("OK");

      testIncome = await getTestSpend();
      expect(testIncome).toBeNull();
  });

  it('should reject if Income is not found', async () => {
      let testIncome = await getTestSpend();
      const result = await supertest(web)
          .delete('/api/spends/' + (testIncome.id + 1))
          .set('Authorization', 'test');

      expect(result.status).toBe(404);
  });
});

describe('GET /api/spends', function () {
  beforeEach(async () => {
      await createTestUser();
      await createManyTestSpends();
  })

  afterEach(async () => {
      await removeAllTestSpends();
      await removeTestUser();
  })

  it('should can search without parameter', async () => {
      const result = await supertest(web)
          .get('/api/spends')
          .set('Authorization', 'test');

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search to page 2', async () => {
      const result = await supertest(web)
          .get('/api/spends')
          .query({
              page: 2
          })
          .set('Authorization', 'test');

      logger.info(result.body);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(5);
      expect(result.body.paging.page).toBe(2);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search using description', async () => {
      const result = await supertest(web)
          .get('/api/spends')
          .query({
              description: "Gajian bulan"
          })
          .set('Authorization', 'test');

      logger.info(result.body);
      console.log(result.body.paging);

      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  it('should can search using category', async () => {
      const result = await supertest(web)
          .get('/api/spends')
          .query({
              category: "Gajian"
          })
          .set('Authorization', 'test');

      logger.info(result.body);
      console.log(result.body.data.length);
      console.log(result.body.paging);
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });

  const now = Date.now('YYYY-MM-DD');
  const date = new Date(now);
  const actualDate =  date.toISOString().split('T')[0]; 
  it('should can search using created_at', async () => {
      const result = await supertest(web)
          .get('/api/spends')
          .query({
              created_at: encodeURIComponent(actualDate)
          })
          .set('Authorization', 'test');

      logger.info(result.body);
      console.log(result.body);
      console.log(actualDate);
      console.log(result.body.created_at);
      expect(result.status).toBe(200);
      expect(result.body.data.length).toBe(10);
      expect(result.body.paging.page).toBe(1);
      expect(result.body.paging.total_page).toBe(2);
      expect(result.body.paging.total_item).toBe(15);
  });
});
