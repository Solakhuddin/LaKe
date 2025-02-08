import incomeService from "../service/income-service.js";
import {logger} from "../application/logger.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await incomeService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeId = req.params.incomeId;
        const result = await incomeService.get(user, incomeId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeId = req.params.incomeId;
        const request = req.body;
        request.id = incomeId;

        console.log(incomeId, request);
        const result = await incomeService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const incomeId = req.params.incomeId;

        await incomeService.remove(user, incomeId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            category: req.query.category,
            description: req.query.description,
            created_at: req.query.created_at,
            page: req.query.page,
            size: req.query.size
        };

        const result = await incomeService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
