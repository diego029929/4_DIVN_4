export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Sentry test disabled in prod', { status: 200 });
  }

  throw new Error('Test Sentry Backend');
}
