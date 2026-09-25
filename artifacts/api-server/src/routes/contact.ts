import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );

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
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeProject = escapeHtml(project.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br />");
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
      html: `
        <div style="margin:0;background:#f1eee4;color:#292623;font-family:Arial,sans-serif;padding:32px 16px;">
          <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New portfolio enquiry from ${safeName} about ${safeProject}.</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;border-collapse:collapse;">
            <tr>
              <td style="background:#292623;padding:28px 32px 30px;">
                <p style="margin:0 0 28px;color:#f1eee4;font-family:monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">GIO MOTION / PORTFOLIO</p>
                <p style="margin:0 0 12px;color:#d98a73;font-family:monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">New project enquiry</p>
                <h1 style="margin:0;color:#f1eee4;font-family:Georgia,serif;font-size:36px;font-weight:400;line-height:1.1;">${safeProject}</h1>
              </td>
            </tr>
            <tr>
              <td style="background:#f8f6f0;padding:32px;">
                <p style="margin:0 0 24px;color:#6e6962;font-family:monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Contact details</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="border-top:1px solid #c9c1b5;padding:14px 0;color:#77716a;font-family:monospace;font-size:11px;text-transform:uppercase;width:30%;">Name</td>
                    <td style="border-top:1px solid #c9c1b5;padding:14px 0;color:#292623;font-size:16px;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid #c9c1b5;padding:14px 0;color:#77716a;font-family:monospace;font-size:11px;text-transform:uppercase;">Email</td>
                    <td style="border-top:1px solid #c9c1b5;padding:14px 0;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#a85e4d;text-decoration:none;">${safeEmail}</a></td>
                  </tr>
                </table>
                <div style="margin-top:28px;border-left:3px solid #a85e4d;background:#f1eee4;padding:22px 24px;">
                  <p style="margin:0 0 12px;color:#77716a;font-family:monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;">Message</p>
                  <p style="margin:0;color:#292623;font-size:16px;line-height:1.65;">${safeMessage}</p>
                </div>
                <p style="margin:28px 0 0;color:#77716a;font-size:13px;line-height:1.6;">Reply directly to this email to continue the conversation with ${safeName}.</p>
              </td>
            </tr>
            <tr>
              <td style="background:#a85e4d;padding:18px 32px;color:#f8f6f0;font-family:monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;">Make it move / gio motion portfolio</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      logger.error({ err: error }, "Resend rejected contact message");
      res.status(502).json({ error: "Unable to send the message." });
      return;
    }

    res.status(204).end();
  } catch (err) {
    logger.error({ err }, "Contact message delivery failed");
    res.status(502).json({ error: "Unable to send the message." });
  }
});

export default router;
