const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./database"); 

const app = express();

app.set("port", process.env.PORT || 4000);

app.use("/public", express.static(__dirname + "/storage/galeria"));


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/user", require('./routes/user.routes'))
app.use("/api/product", require('./routes/product.routes'))

app.listen(app.get("port"), () => {
  console.log("servidor escuchando por el puerto", app.get("port"));
});