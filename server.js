const app = require("./app.js");

require("dotenv").config();
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log("Listening on port:", PORT));
