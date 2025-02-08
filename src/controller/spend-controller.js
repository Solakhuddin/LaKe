import spendService from "../service/spend-service.js";
import {logger} from "../application/logger.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await spendService.create(user, request);
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
        const spendId = req.params.spendId;
        const result = await spendService.get(user, spendId);
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
        const spendId = req.params.spendId;
        const request = req.body;
        request.id = spendId;

        console.log(spendId, request);
        const result = await spendService.update(user, request);
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
        const spendId = req.params.spendId;

        await spendService.remove(user, spendId);
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

        const result = await spendService.search(user, request);
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
