import {validate} from "../validation/validation.js";
import {
    createIncomeValidation,
    getIncomeValidation, searchIncomeValidation,
    updateIncomeValidation
} from "../validation/income-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const income = validate(createIncomeValidation, request);
    income.username = user.username;

    return prismaClient.income.create({
        data: income,
        select: {
            id: true,
            username: true,
            amount: true,
            category: true,
            description: true
        }
    });
}

const get = async (user, incomeId) => {
    incomeId = validate(getIncomeValidation, incomeId);

    const contact = await prismaClient.income.findFirst({
        where: {
            username: user.username,
            id: incomeId
        },
        select: {
          id: true,
          username: true,
          amount: true,
          category: true,
          description: true
        }
    });

    if (!contact) {
        throw new ResponseError(404, "contact is not found");
    }

    return contact;
}

const update = async (user, request) => {
    const income = validate(updateIncomeValidation, request);

    const totalContactInDatabase = await prismaClient.income.count({
        where: {
            username: user.username,
            id: income.id
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "income is not found");
    }
    
    return prismaClient.income.update({
        where: {
            id: income.id
        },
        data: {
            category: income.category,
            description: income.description,
            updated_at: income.updated_at,
        },
        select: {
            id: true,
            category: true,
            description: true,
            updated_at: true
        }
    })
}

const remove = async (user, incomeId) => {
    incomeId = validate(getIncomeValidation, incomeId);

    const totalInDatabase = await prismaClient.income.count({
        where: {
            username: user.username,
            id: incomeId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "income is not found");
    }

    return prismaClient.income.delete({
        where: {
            id: incomeId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchIncomeValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.category) {
        filters.push(
            {
                category: {
                    contains: request.category
                }
            }
            
        );
    }
    if (request.description) {
        filters.push({
            description: {
                contains: request.description
            }
        });
    }
    if (request.created_at) {
        filters.push({
            created_at: {
                gte: request.created_at
            }
        });
    }

    const incomes = await prismaClient.income.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.income.count({
        where: {
            AND: filters
        }
    });

    return {
        data: incomes,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
