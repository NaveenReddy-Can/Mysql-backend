require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
require("./db/conn");
const router = require("./Routes/router");

const port = 8001;


// app.get("/",(req,res)=>{
//     res.send("server start")
// });


// middleware
// This is your test secret API key.
const stripe = require("stripe")("sk_test_51MTojlHAH0Gg4pVKiC0YFhn2vvbBKrgS1wuFGD51nkizL9JLo6sDgYV0dDHr29BC2Bx9kpBHuGs05AZPncEG2dQf00pb0RxH6x");

app.use(express.static("public"));
app.use(express.json())
app.use(cors());

app.use(router);


const calculateOrderAmount = items => {

    return 1000;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "CAD"
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.listen(port, () => {
    console.log("server starts at port no :" + port);
})