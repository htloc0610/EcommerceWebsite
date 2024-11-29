const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
// Router
const router = require("./routers/client/index.router");

// Passport config
require("./middlewares/passport.middlewares")(passport);

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
app.use(passport.initialize());

const paymentHelper = require("./helpers/paymentService.helper");

app.get("/test", async (req, res) => {
  const requestData = {
    orderCode: 2342246,
    amount: 2000,
    description: "Thanh toan don hang",
    items: [
      {
        name: "Mì tôm hảo hảo ly",
        quantity: 1,
        price: 1000,
      },
    ],
    cancelUrl: "http://127.0.0.1:3000/account/login",
    returnUrl: "http://127.0.0.1:3000/products/67466c5df4d1172583c2845b",
  };
  const paymentLink = paymentHelper.createPaymentLink(requestData);
  res.redirect(303, (await paymentLink).checkoutUrl);
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Use router
router(app);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
