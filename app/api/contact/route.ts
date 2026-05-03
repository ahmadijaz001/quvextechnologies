import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

/* ─── Validation ─────────────────────────────────────────────────────────
   Used by both /api/contact (Enquire / Contact form) and /api/contact?source=booking
   (Book Consultation wizard). Extra fields like budget/timeline/description are
   accepted but optional. */
const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const TO_EMAIL   = process.env.LEAD_TO_EMAIL   ?? "hello@akross.ae";
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL ?? "aKross Website <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, ch =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch] as string)
  );
}

function buildEmail(data: z.infer<typeof schema>) {
  const isBooking = (data.source ?? "").toLowerCase() === "booking";
  const subject = isBooking
    ? `New consultation request — ${data.name}${data.company ? ` (${data.company})` : ""}`
    : `New website enquiry — ${data.name}${data.service ? ` · ${data.service}` : ""}`;

  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Company", data.company],
    ["Service", data.service],
    ["Budget", data.budget],
    ["Timeline", data.timeline],
    ["Message", data.message ?? data.description],
    ["Submitted via", isBooking ? "Book Consultation form" : "Website contact / enquiry form"],
  ].filter(([, v]) => v && v.trim().length > 0) as [string, string][];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f1ea;font-family:Arial,sans-serif;color:#0a1129;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e6dfca;border-radius:10px;overflow:hidden;">
    <div style="padding:20px 24px;background:linear-gradient(135deg,#0a1129 0%,#050816 100%);color:#f3e6b0;">
      <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af37;">aKross Information Technology</div>
      <div style="font-size:18px;font-weight:700;margin-top:4px;">${escapeHtml(subject)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${rows.map(([k, v]) => `
        <tr>
          <td style="padding:14px 24px;border-bottom:1px solid #f0e9d2;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#6b4d0a;width:34%;vertical-align:top;font-weight:700;">${escapeHtml(k)}</td>
          <td style="padding:14px 24px;border-bottom:1px solid #f0e9d2;font-size:14px;color:#0a1129;line-height:1.55;white-space:pre-line;">${escapeHtml(v ?? "")}</td>
        </tr>
      `).join("")}
    </table>
    <div style="padding:14px 24px;background:#fffdf3;font-size:12px;color:#6b4d0a;text-align:center;">
      Reply directly to this email to respond to ${escapeHtml(data.name)} at ${escapeHtml(data.email)}.
    </div>
  </div>
</body></html>`;

  return { subject, html, text };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { subject, html, text } = buildEmail(data);

    // Always log so submissions are visible during local dev / before Resend is wired up
    console.log("[lead]", subject, "→", TO_EMAIL);
    console.log(text);

    if (resend) {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        replyTo: data.email,
        subject,
        html,
        text,
      });
      if (error) {
        console.error("[lead] Resend error:", error);
        return NextResponse.json(
          { success: false, error: "Could not deliver your message. Please email hello@akross.ae directly." },
          { status: 502 }
        );
      }
    } else {
      console.warn(
        "[lead] RESEND_API_KEY not set — email NOT delivered. Submission only logged. " +
          "Add RESEND_API_KEY to .env.local to enable email delivery."
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message received. We'll respond within 2 hours.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("[lead] Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
