import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

import { contactFormSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    const toEmail = process.env.SENDGRID_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, and SENDGRID_TO_EMAIL.",
        },
        { status: 503 },
      );
    }

    sgMail.setApiKey(apiKey);

    const data = parsed.data;
    const fullName = `${data.firstName} ${data.lastName}`;

    await sgMail.send({
      to: toEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: `[Parallel Solutions] New inquiry from ${fullName} at ${data.company}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        `Company: ${data.company}`,
        data.jobTitle ? `Job title: ${data.jobTitle}` : null,
        data.region ? `Region: ${data.region}` : null,
        "",
        "Message:",
        data.message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Company:</strong> ${data.company}</p>
        ${data.jobTitle ? `<p><strong>Job title:</strong> ${data.jobTitle}</p>` : ""}
        ${data.region ? `<p><strong>Region:</strong> ${data.region}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
