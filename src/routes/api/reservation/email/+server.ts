import { type RequestHandler } from '@sveltejs/kit';
import { createTransport, type Transporter } from 'nodemailer';
import { EMAIL_URL } from '$env/static/private';

let transporter: Transporter;
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  console.log(body);

  if (!transporter) {
    transporter = createTransport({
      url: EMAIL_URL,
    });
  }
  const worked = await transporter.sendMail({
    from: 'Edelweiss <bbenjaminbordes78@gmail.com>',
    to: 'bbordes@protonmail.com',
    subject: 'Confirmaion de réservation',
    text: 'test',
    html: '<b>test</b>',
  });

  console.log(worked.response);
  return new Response(worked.response);
};
