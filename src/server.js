const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./secret");

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  // await connectDB();
});
