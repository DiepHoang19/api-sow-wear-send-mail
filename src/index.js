require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const app = express();

const sellerAddressRouter = require("./routes/index");
app.use(
  cors({
    origin: "*", // cho phép tất cả các nguồn gốc (có thể thay đổi theo yêu cầu)
    methods: ["GET", "POST", "PUT", "DELETE"], // các phương thức HTTP được phép
    credentials: true, // cho phép cookie và thông tin xác thực khác được gửi từ trình duyệt
  })
);

app.use(express.json()); // phân tích dữ liệu JSON trong yêu cầu
app.use(express.urlencoded({ extended: true })); // phân tích dữ liệu URL-encoded trong yêu cầu

// mount router
app.use("/seller-address", sellerAddressRouter);

app.get("/", (req, res) => {
  res.send("Hello from Vercel!");
});

sequelize
  .authenticate() // xác thực kết nối đến cơ sở dữ liệu
  .then(() => {
    console.log("Database connected!");
    app.listen(3002, () =>
      console.log("Server running at http://localhost:3002")
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
