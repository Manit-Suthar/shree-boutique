import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Hardcoded simple secret to prevent unauthorized draft mode access
  if (secret !== 'preview123') {
    return new Response('Invalid token', { status: 401 });
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the home page or specific path
  redirect('/');
}
