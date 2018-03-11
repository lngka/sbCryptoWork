module.exports = function (app) {
    app.route("/test")
        .get(function(req, res) {
            res.status(200).send("Hello, world!");
        })
}
