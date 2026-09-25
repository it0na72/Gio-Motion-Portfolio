import { Router, type IRouter } from "express";
import { Resend } from "resend";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const { name, email, project, message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof project !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !project.trim() ||
    !message.trim()
  ) {
    res.status(400).json({ error: "All contact fields are required." });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || "gio@lusonihongo.com";

  if (!apiKey || !from) {
    res.status(503).json({ error: "Email service is not configured." });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email.trim(),
      subject: `Portfolio enquiry: ${project.trim()}`,
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Project: ${project.trim()}`,
        "",
        message.trim(),
      ].join("\n"),
    });

    if (error) {
      res.status(502).json({ error: "Unable to send the message." });
      return;
    }

    res.status(204).end();
  } catch {
    res.status(502).json({ error: "Unable to send the message." });
  }
});

export default router;
