class SiteController {
    home = (req, res, next) => {
        res.send("connected to db");
    }
}

module.exports = new SiteController();