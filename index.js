const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ac = process.env.ACCOUNTSID;
const at = process.env.AUTHTOKEN;

const client = twilio(ac, at);

// 🔹 API to send WhatsApp alert
app.post("/sendAlert", async (req, res) => {
  const { phone, message } = req.body;

  try {
    const msg = await client.messages.create({
      from: "whatsapp:+17756408102", // Twilio sandbox number
      to: `whatsapp:+91${phone}`,
      body: message,
    });

    res.json({ success: true, sid: msg.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const Port = process.env.PORT;
console.log(Port);

app.listen(Port || 5000, () =>
  console.log(`✅ Server running on http://localhost:${Port}`)
);
