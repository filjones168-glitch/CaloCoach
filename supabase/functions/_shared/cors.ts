export function isAllowedOrigin(request: Request): boolean {
  const configuredOrigin = Deno.env.get('APP_ORIGIN');
  return !configuredOrigin || configuredOrigin === '*' || request.headers.get('origin') === configuredOrigin;
}

export function corsHeaders(request: Request): HeadersInit {
  const configuredOrigin = Deno.env.get('APP_ORIGIN') || '*';
  const requestOrigin = request.headers.get('origin') || '';
  const allowOrigin = configuredOrigin === '*' || configuredOrigin === requestOrigin ? configuredOrigin : configuredOrigin;
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export function jsonResponse(request: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function errorResponse(request: Request, message: string, status = 400): Response {
  return jsonResponse(request, { error: message }, status);
}
