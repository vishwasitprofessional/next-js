# Google sign-in setup

Google login signs in existing active users by their Google-authoritative email (Gmail or Google Workspace). The Sign up with Google button on /signup creates a new active regular user when no account exists, then signs them in. Existing accounts retain their roles and status. The matching database account must have status = 1 and type = admin or user. Other Google accounts using third-party email addresses must use password login. Apply migrations/001_unique_user_email.sql once per database to prevent duplicate accounts during concurrent registrations. It has been applied to the configured development database. No new dependency is needed. Google-created accounts have an undisclosed random password hash and must use Google to sign in; password setup/recovery is not implemented.

## Google Cloud Console

1. Open https://console.cloud.google.com/ and select or create a project.
2. Open Google Auth Platform. Complete Branding with your app name, support email and developer contact information.
3. Under Audience, choose External for personal Gmail users, or Internal only for your Workspace organization. During testing, add the Google accounts you will test with under Test users.
4. Under Data Access, configure only the basic identity scopes: openid, email, profile (the console may show the latter two as userinfo.email and userinfo.profile).
5. Under Clients, create an OAuth client with application type Web application.
6. Add this exact Authorized redirect URI for local development:

   http://localhost:3000/api/auth/google/callback

   For production add your actual HTTPS address, for example:

   https://your-domain.com/api/auth/google/callback

   This server redirect flow does not require Authorized JavaScript origins. Do not put /login in the redirect URI field. Protocol, hostname, port, path and trailing slash must match exactly.
7. Copy the client ID and client secret into your local environment. Never expose the secret using a NEXT_PUBLIC_ variable.

## Environment

Add these values to `.env.local`, retaining your existing JWT_SECRET and database settings:

```dotenv
APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

APP_URL is the browser-facing origin, without a path. This project currently serves at the domain root. Use localhost consistently rather than switching to 127.0.0.1. If using a different port, change both APP_URL and the registered redirect URI.

Restart `npm run dev` after changing environment variables. For deployment, set these variables in your hosting environment, set APP_URL to the production HTTPS origin, and redeploy. Production cookies require HTTPS.

## Email registration

The /signup form sends name, email, optional phone, and password to POST /api/auth/register. The server validates input, hashes the password with bcrypt, and always assigns type=user and status=1 regardless of client-supplied role/status. Successful email registration returns 201 and the form takes the user to /login. Existing email addresses return 409.

The Google signup flow uses the same client credentials and callback URL as login. No additional Google Console settings are required.

## Verify

- Open /signup and choose Sign up with Google with a new Gmail/Workspace account; confirm it creates a regular user and reaches /user/dashboard.
- Repeat with that account; confirm no duplicate account is created.
- Register with email/password and verify password login.
- Open /login and choose Sign in with Google.
- An active matching account should reach /admin/dashboard or /user/dashboard according to its database role.
- Cancel at Google and confirm an error appears on /login.
- An inactive or unmatched account must not receive an application session.
- A callback without a valid browser transaction must fail.
- Confirm password login still works.

Before public launch, configure your real app domain and required homepage/privacy-policy links in Branding; move the External app to production under Audience and complete any verification Google requests. Basic identity scopes do not require sensitive/restricted-scope verification, but branding verification may apply.

## Troubleshooting

- `redirect_uri_mismatch`: match the exact URI above to APP_URL plus /api/auth/google/callback.
- Configuration error: check all three environment variables and restart the server.
- Access denied by Google: check Audience, test users, and Workspace administrator policies.
- No matching account: ensure the Google email matches one existing active database account with a supported role.
- Session expired: start again from /login in the same browser; the transaction expires after 10 minutes. A second sign-in attempt in another tab replaces the first transaction.
- Generic failure: verify the client secret, database connection, and outbound HTTPS access to Google's token and public-key endpoints.

References:
- https://developers.google.com/identity/openid-connect/openid-connect
- https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
- https://developers.google.com/workspace/guides/configure-oauth-consent
