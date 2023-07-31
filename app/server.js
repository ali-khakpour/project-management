const allRouter = require("./routers/routes");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }

  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }

  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`server is run on http://localhost:${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    const { default: mongoose } = require("mongoose");
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("connected to DB ");
      })
      .catch((err) => {
        throw err.message;
      });
  }

  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      res.json({
        message: "this is a new express",
      });
    });
    this.#app.use(allRouter);

    this.#app.use((err, req, res, next) => {
      try {
      } catch (error) {
        next(error);
      }
    });
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        statusCode: res.statusCode,
        message: `the rout ${req.path} not found`,
      });
    });

    this.#app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).json({
        status,
        message: err?.message || "internall server error",
      });
    });
  }
};
