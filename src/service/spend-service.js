import {validate} from "../validation/validation.js";
import {
    createSpendValidation,
    getSpendValidation, searchSpendValidation,
    updateSpendValidation
} from "../validation/spend-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const spend = validate(createSpendValidation, request);
    spend.username = user.username;

    return prismaClient.spend.create({
        data: spend,
        select: {
            id: true,
            username: true,
            amount: true,
            category: true,
            description: true
        }
    });
}

const get = async (user, spendId) => {
    spendId = validate(getSpendValidation, spendId);

    const contact = await prismaClient.spend.findFirst({
        where: {
            username: user.username,
            id: spendId
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
    const spend = validate(updateSpendValidation, request);

    const totalContactInDatabase = await prismaClient.spend.count({
        where: {
            username: user.username,
            id: spend.id
        }
    });

    if (totalContactInDatabase !== 1) {
        throw new ResponseError(404, "spend is not found");
    }
    
    return prismaClient.spend.update({
        where: {
            id: spend.id
        },
        data: {
            category: spend.category,
            description: spend.description,
            updated_at: spend.updated_at,
        },
        select: {
            id: true,
            category: true,
            description: true,
            updated_at: true
        }
    })
}

const remove = async (user, spendId) => {
    spendId = validate(getSpendValidation, spendId);

    const totalInDatabase = await prismaClient.spend.count({
        where: {
            username: user.username,
            id: spendId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "spend is not found");
    }

    return prismaClient.spend.delete({
        where: {
            id: spendId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchSpendValidation, request);

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

    const spends = await prismaClient.spend.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.spend.count({
        where: {
            AND: filters
        }
    });

    return {
        data: spends,
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
