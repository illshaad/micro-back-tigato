const express = require("express");
const router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

router.post("/sms", async (req, res) => {
  const { information, commandeForReservation, name, phone } = req.body.data;
  const nameCommande = information.map((name) => name.products.name);
  const typeCommande = information.map((type) => type.products.type);
  const quantityCommande = information.map((quantity) => quantity.quantity);
  const commandeCompleted = [];
  for (let i = 0; i < nameCommande.length; i++) {
    commandeCompleted.push(
      ` ${quantityCommande[i]}  -  ${nameCommande[i]} -  ${typeCommande[i]} `
    );
  }
  console.log(commandeCompleted);
  client.messages
    .create({
      body: `Salut tu as reçu une commande de ${name} tu peux la contacter sur ${phone} - Détail de la Commande - ${commandeCompleted} -  Pour un montant ${commandeForReservation}€`,
      from: process.env.TWILIO_NUM_FROM,
      to: process.env.TWILIO_NUM_TO,
    })
    .then((message) => console.log(message.sid));
  res.status(200).send("message bien envoyé");
});

module.exports = router;
