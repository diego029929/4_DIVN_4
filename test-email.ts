import { sendEmail } from "./lib/email";

(async () => {
  await sendEmail({
    to: "diegoferr40906@gmail.com", // ⚠️ Remplace par ton email réel
    subject: "Test SparkPost ✅",
    text: "Si tu reçois ça, ça fonctionne parfaitement !"
  });
})();
