import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestIncomes = async () => {
    await prismaClient.income.deleteMany({
        where: {
            username: 'test'
        }
    });
}
export const removeAllTestSpends = async () => {
    await prismaClient.spend.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestIncome = async () => {
    await prismaClient.income.create({
        data: {
            username: "test",
            amount: 100000,
            category: "Gajian",
            description: "Gajian bulan september"
        }
    })
}
export const createTestSpend = async () => {
    await prismaClient.spend.create({
        data: {
            username: "test",
            amount: 100000,
            category: "Gajian",
            description: "Gajian bulan september"
        }
    })
}

export const createManyTestIncomes = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.income.create({
            data: {
                username: "test",
                amount: 100000,
                category: "Gajian",
                description: "Gajian bulan september"
            }
        })
    }
}
export const createManyTestSpends = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.spend.create({
            data: {
                username: "test",
                amount: 100000,
                category: "Gajian",
                description: "Gajian bulan september"
            }
        })
    }
}

export const getTestIncome = async () => {
    return prismaClient.income.findFirst({
        where: {
            username: 'test'
        }
    })
}
export const getTestSpend = async () => {
    return prismaClient.spend.findFirst({
        where: {
            username: 'test'
        }
    })
}

// export const removeAllTestAddresses = async () => {
//     await prismaClient.address.deleteMany({
//         where: {
//             contact: {
//                 username: "test"
//             }
//         }
//     });
// }

// export const createTestAddress = async () => {
//     const contact = await getTestContact();
//     await prismaClient.address.create({
//         data: {
//             contact_id: contact.id,
//             street: "jalan test",
//             city: 'kota test',
//             province: 'provinsi test',
//             country: 'indonesia',
//             postal_code: '234234'
//         }
//     })
// }

// export const getTestAddress = async () => {
//     return prismaClient.address.findFirst({
//         where: {
//             contact: {
//                 username: "test"
//             }
//         }
//     })
// }
