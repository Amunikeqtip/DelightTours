export const serviceProviderContact = {
  providerName: "Delight Tours & Travel",
  platformName: "Delight Tours",
  email: "info@delighttours.com",
  phone: "+263 789 276 807",
  whatsappNumber: "263789276807",
  address: "Victoria Falls, Zimbabwe",
  logoPath: "/delighttoursandtravel.png",
  website: "https://delight-tours.vercel.app",
};

type ClientMessageDetails = {
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  serviceProviderName?: string;
  platformName?: string;
  tourOrServiceName?: string;
  selectedServices?: string[];
  date?: string;
};

function valueOrPlaceholder(value: string | undefined, placeholder: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : placeholder;
}

function buildCompanyIntro() {
  return `${serviceProviderContact.providerName}
Logo: ${serviceProviderContact.website}${serviceProviderContact.logoPath}
Email: ${serviceProviderContact.email}
Phone/WhatsApp: ${serviceProviderContact.phone}
Address: ${serviceProviderContact.address}`;
}

function buildCompanyFooter() {
  return `--
${serviceProviderContact.providerName}
${serviceProviderContact.address}
Email: ${serviceProviderContact.email}
Phone/WhatsApp: ${serviceProviderContact.phone}
Logo: ${serviceProviderContact.website}${serviceProviderContact.logoPath}`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderBrandedEmailHtml(preview: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(preview)}</title>
  </head>
  <body style="margin:0;background:#f7f3ea;color:#22322d;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f3ea;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2d7c5;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;border-bottom:1px solid #e2d7c5;">
                <img src="${serviceProviderContact.website}${serviceProviderContact.logoPath}" alt="${escapeHtml(serviceProviderContact.providerName)} logo" width="132" style="display:block;height:auto;margin-bottom:14px;" />
                <div style="font-size:20px;font-weight:700;color:#174437;">${escapeHtml(serviceProviderContact.providerName)}</div>
                <div style="font-size:13px;line-height:20px;color:#5c665f;margin-top:6px;">
                  ${escapeHtml(serviceProviderContact.address)}<br />
                  ${escapeHtml(serviceProviderContact.email)} | ${escapeHtml(serviceProviderContact.phone)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;font-size:15px;line-height:24px;color:#22322d;">
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background:#174437;color:#ffffff;font-size:12px;line-height:18px;">
                ${escapeHtml(serviceProviderContact.providerName)}<br />
                ${escapeHtml(serviceProviderContact.address)}<br />
                Email: ${escapeHtml(serviceProviderContact.email)} | Phone/WhatsApp: ${escapeHtml(serviceProviderContact.phone)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildClientDetailsText(details: ClientMessageDetails) {
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const clientEmail = valueOrPlaceholder(details.clientEmail, "[Client Email]");
  const clientPhone = valueOrPlaceholder(details.clientPhone, "[Client Phone]");
  const selectedServices = details.selectedServices?.length
    ? details.selectedServices.map((service) => `- ${service}`).join("\n")
    : "- [Selected Service]";

  return `Client details:
Name: ${clientName}
Email: ${clientEmail}
Phone: ${clientPhone}
Selected services:
${selectedServices}`;
}

function buildClientDetailsHtml(details: ClientMessageDetails) {
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "[Client Name]"));
  const clientEmail = escapeHtml(valueOrPlaceholder(details.clientEmail, "[Client Email]"));
  const clientPhone = escapeHtml(valueOrPlaceholder(details.clientPhone, "[Client Phone]"));
  const selectedServices = details.selectedServices?.length
    ? details.selectedServices.map((service) => `<li>${escapeHtml(service)}</li>`).join("")
    : "<li>[Selected Service]</li>";

  return `<div style="margin:0 0 22px;padding:16px;border:1px solid #e2d7c5;border-radius:6px;background:#fbf8f2;">
    <div style="font-weight:700;color:#174437;margin-bottom:8px;">Client details</div>
    <div>Name: ${clientName}</div>
    <div>Email: ${clientEmail}</div>
    <div>Phone: ${clientPhone}</div>
    <div style="margin-top:8px;">Selected services:</div>
    <ul style="margin-top:6px;">${selectedServices}</ul>
  </div>`;
}

export function buildGeneralClientInquiryTemplate(details: ClientMessageDetails = {}) {
  const providerName = valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]");
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const platformName = valueOrPlaceholder(details.platformName, "[Platform Name]");

  return `${buildCompanyIntro()}

Hello ${providerName},

I hope you are well. My name is ${clientName}. I am interested in your service/package listed on ${platformName}.

${buildClientDetailsText(details)}

Please share more details regarding:
- Availability
- Pricing
- Inclusions
- Booking process

Thank you, and I look forward to your response.

Best regards,
${clientName}

${buildCompanyFooter()}`;
}

export function buildBookingFollowUpTemplate(details: ClientMessageDetails = {}) {
  const providerName = valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]");
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const platformName = valueOrPlaceholder(details.platformName, "[Platform Name]");
  const tourOrServiceName = valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]");
  const date = valueOrPlaceholder(details.date, "[Date]");

  return `${buildCompanyIntro()}

Dear ${providerName},

Thank you for your service listing on ${platformName}. I would like to confirm the details of my booking/request for ${tourOrServiceName} on ${date}.

${buildClientDetailsText(details)}

Please confirm:
- Availability
- Meeting point/time
- Payment details
- Any important requirements

Thank you for your assistance.

Kind regards,
${clientName}

${buildCompanyFooter()}`;
}

export function buildQuickWhatsAppTemplate(details: ClientMessageDetails = {}) {
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const clientEmail = valueOrPlaceholder(details.clientEmail, "[Client Email]");
  const clientPhone = valueOrPlaceholder(details.clientPhone, "[Client Phone]");
  const platformName = valueOrPlaceholder(details.platformName, "[Platform Name]");
  const tourOrServiceName = valueOrPlaceholder(details.tourOrServiceName, "[tour/service]");
  const services = details.selectedServices?.length ? details.selectedServices.join(", ") : tourOrServiceName;

  return `Hello, my name is ${clientName}. My email is ${clientEmail} and my phone number is ${clientPhone}. I am interested in ${services} listed on ${platformName}. Kindly share availability, price, and booking details. Thank you.`;
}

export function buildGeneralClientInquiryEmailHtml(details: ClientMessageDetails = {}) {
  const providerName = escapeHtml(valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]"));
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "[Client Name]"));
  const platformName = escapeHtml(valueOrPlaceholder(details.platformName, "[Platform Name]"));

  return renderBrandedEmailHtml(
    "Client inquiry",
    `${buildClientDetailsHtml(details)}
    <p>Hello ${providerName},</p>
    <p>I hope you are well. My name is ${clientName}. I am interested in your service/package listed on ${platformName}.</p>
    <p>Please share more details regarding:</p>
    <ul>
      <li>Availability</li>
      <li>Pricing</li>
      <li>Inclusions</li>
      <li>Booking process</li>
    </ul>
    <p>Thank you, and I look forward to your response.</p>
    <p>Best regards,<br />${clientName}</p>`,
  );
}

export function buildBookingFollowUpEmailHtml(details: ClientMessageDetails = {}) {
  const providerName = escapeHtml(valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]"));
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "[Client Name]"));
  const platformName = escapeHtml(valueOrPlaceholder(details.platformName, "[Platform Name]"));
  const tourOrServiceName = escapeHtml(valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]"));
  const date = escapeHtml(valueOrPlaceholder(details.date, "[Date]"));

  return renderBrandedEmailHtml(
    "Booking confirmation request",
    `${buildClientDetailsHtml(details)}
    <p>Dear ${providerName},</p>
    <p>Thank you for your service listing on ${platformName}. I would like to confirm the details of my booking/request for ${tourOrServiceName} on ${date}.</p>
    <p>Please confirm:</p>
    <ul>
      <li>Availability</li>
      <li>Meeting point/time</li>
      <li>Payment details</li>
      <li>Any important requirements</li>
    </ul>
    <p>Thank you for your assistance.</p>
    <p>Kind regards,<br />${clientName}</p>`,
  );
}

export function buildClientConfirmationEmailHtml(details: ClientMessageDetails = {}, flowLabel = "enquiry") {
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "there"));
  const providerName = escapeHtml(serviceProviderContact.providerName);
  const tourOrServiceName = escapeHtml(valueOrPlaceholder(details.tourOrServiceName, "your selected tour"));
  const phone = escapeHtml(serviceProviderContact.phone);
  const email = escapeHtml(serviceProviderContact.email);
  const website = escapeHtml(serviceProviderContact.website);

  return renderBrandedEmailHtml(
    `We received your ${flowLabel}`,
    `<p>Hi ${clientName},</p>
    <p>Thank you for contacting <strong>${providerName}</strong>. We have received your ${flowLabel} for <strong>${tourOrServiceName}</strong> and will be in touch shortly.</p>
    <p>Our team typically responds within a few hours. In the meantime, you are welcome to reach us directly:</p>
    <ul>
      <li>Phone/WhatsApp: ${phone}</li>
      <li>Email: ${email}</li>
      <li>Website: <a href="${website}" style="color:#174437;">${website}</a></li>
    </ul>
    <p>We look forward to showing you Victoria Falls.</p>
    <p>Warm regards,<br />The ${providerName} Team</p>`,
  );
}

export function buildCancellationTemplate(details: ClientMessageDetails = {}) {
  const providerName = valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]");
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const tourOrServiceName = valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]");
  const date = valueOrPlaceholder(details.date, "[Date]");

  return `${buildCompanyIntro()}

Dear ${providerName},

This is a cancellation notice for the booking listed below.

${buildClientDetailsText(details)}

Tour/Service: ${tourOrServiceName}
Original date: ${date}

Please confirm cancellation and advise on any applicable refund or rebooking options.

Regards,
${clientName}

${buildCompanyFooter()}`;
}

export function buildCancellationEmailHtml(details: ClientMessageDetails = {}) {
  const providerName = escapeHtml(valueOrPlaceholder(details.serviceProviderName, "[Service Provider Name]"));
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "[Client Name]"));
  const tourOrServiceName = escapeHtml(valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]"));
  const date = escapeHtml(valueOrPlaceholder(details.date, "[Date]"));

  return renderBrandedEmailHtml(
    "Booking cancellation notice",
    `${buildClientDetailsHtml(details)}
    <p>Dear ${providerName},</p>
    <p>This is a cancellation notice for the booking below.</p>
    <table role="presentation" style="margin:0 0 22px;padding:16px;border:1px solid #e2d7c5;border-radius:6px;background:#fbf8f2;width:100%;">
      <tr><td style="padding:4px 0;font-weight:700;color:#174437;">Tour/Service</td><td>${tourOrServiceName}</td></tr>
      <tr><td style="padding:4px 0;font-weight:700;color:#174437;">Original date</td><td>${date}</td></tr>
    </table>
    <p>Please confirm the cancellation and advise on any applicable refund or rebooking options.</p>
    <p>Regards,<br />${clientName}</p>`,
  );
}

export function buildReviewRequestTemplate(details: ClientMessageDetails = {}) {
  const clientName = valueOrPlaceholder(details.clientName, "[Client Name]");
  const tourOrServiceName = valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]");

  return `${buildCompanyIntro()}

Dear ${clientName},

Thank you for joining us on the ${tourOrServiceName}. We hope it was a highlight of your trip to Victoria Falls.

If you have a moment, we'd love to hear how your experience went. Leaving a review on TripAdvisor helps other travelers find us and helps our local team keep improving.

Leave a review: https://www.tripadvisor.com/

Thank you for travelling with ${serviceProviderContact.providerName}.

Warm regards,
The Delight Tours Team

${buildCompanyFooter()}`;
}

export function buildReviewRequestEmailHtml(details: ClientMessageDetails = {}) {
  const clientName = escapeHtml(valueOrPlaceholder(details.clientName, "[Client Name]"));
  const tourOrServiceName = escapeHtml(valueOrPlaceholder(details.tourOrServiceName, "[Tour/Service Name]"));
  const providerName = escapeHtml(serviceProviderContact.providerName);

  return renderBrandedEmailHtml(
    "How was your tour?",
    `<p>Dear ${clientName},</p>
    <p>Thank you for joining us on the <strong>${tourOrServiceName}</strong>. We hope it was a highlight of your trip to Victoria Falls.</p>
    <p>If you have a moment, we'd love to hear how your experience went. Leaving a review on TripAdvisor helps other travelers find us and helps our local team keep improving.</p>
    <p style="margin:24px 0;">
      <a href="https://www.tripadvisor.com/" style="display:inline-block;background:#34e0a1;color:#0d1210;font-weight:700;padding:12px 24px;border-radius:6px;text-decoration:none;">Leave a TripAdvisor review</a>
    </p>
    <p>Thank you for travelling with ${providerName}.</p>
    <p>Warm regards,<br />The Delight Tours Team</p>`,
  );
}

export function buildMailToLink(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppLink(phoneNumber: string, message: string) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
