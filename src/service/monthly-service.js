import {validate} from "../validation/validation.js";
import {
    searchMonthValidation
} from "../validation/monthly-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const search = async (user, request) => {
  request = validate(searchMonthValidation, request);

  const filters = [];

  filters.push({
      username: user.username
  })

  console.log(request.created_at);
  const endDate = new Date(request.created_at);
  endDate.setMonth(endDate.getMonth() + 1); // Geser ke bulan berikutnya
  endDate.setDate(1); // Set ke tanggal 1
  endDate.setMilliseconds(-1); // Set ke 23:59:59

  if (request.created_at) {
      filters.push({
          created_at: {
            gte: request.created_at, // Mulai dari awal bulan
            lt: endDate,
          }
      });
  }

  const incomes = await prismaClient.income.findMany({
      where: {
          AND: filters
      },
  });

  const spends = await prismaClient.spend.findMany({
      where: {
          AND: filters
      }
  });

  return {
      data: [incomes, spends]
  }
}

export default {
  search
}