import monthlyService from "../service/monthly-service.js";

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            created_at: req.query.created_at
        };

        const result = await monthlyService.search(user, request);
        res.status(200).json({
            incomes: result.data[0],
            spends: result.data[1]

        });
    } catch (e) {
        next(e);
    }
}

export default {
  search,

};