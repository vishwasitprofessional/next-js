# Password reset setup

1. Apply `migrations/002_password_resets.sql` to the same MySQL database used by the app. The users table must already exist.
2. Add these server-only settings to `.env.local` (and your deployment environment):

   ```dotenv
   APP_URL=http://localhost:3000
   SMTP_HOST=mail.example.com
   SMTP_PORT=465
   SMTP_USER=security@example.com
   SMTP_PASS=your-mailbox-password
   SMTP_FROM=Your App <security@example.com>
   ```

   Use the public HTTPS application URL in production. Email delivery uses Nodemailer with your domain mailbox SMTP credentials. Port 465 uses implicit TLS; other ports (typically 587) require STARTTLS. Use the host and port provided by your email provider. `SMTP_FROM` must be a sender your mailbox is authorized to use.
3. Restart the application.
4. From `/login`, select **Forgot password?**, enter an active user's email, and open the emailed link. Enter the same new password in both fields, submit, and sign in with it.

Tokens expire after 30 minutes. Only their SHA-256 hashes are stored. Requesting another link invalidates the previous one; successful resets consume the token atomically. Email requests are limited to one per account per minute, including across application instances. Configure perimeter rate limits for public auth endpoints to also limit abusive requests across accounts/IPs.

Unknown/inactive accounts and email provider failures receive the same generic response to avoid exposing registered accounts. This response does not confirm email delivery. Delivery failures log the SMTP error code and a safe diagnostic reason, without the recipient, mailbox password, reset token, or raw provider payload. Missing configuration returns a service-unavailable error. Reset links are never returned in API responses or intentionally logged; redact token query parameters from hosting access logs.

If an email does not arrive:

- Check the server terminal for `Password reset email delivery failed`. For `EAUTH`, verify `SMTP_USER` and `SMTP_PASS`, then restart the app.
- Verify `SMTP_FROM` is authorized by your domain email provider. For connection errors, check `SMTP_HOST`, `SMTP_PORT`, TLS support, and outbound SMTP access.
- Wait at least one minute before requesting again; failed sends also retain the rate limit.
- Check your email provider's delivery or bounce logs and the recipient's spam folder. SMTP acceptance alone does not guarantee inbox delivery.
- Only existing users with `status = 1` receive reset emails. Use a public HTTPS `APP_URL` in production; localhost links only work on the machine running the app.

Existing JWT login sessions retain their normal expiry after a reset. This flow does not revoke other devices' sessions.

Manual verification: check delivery, matching/mismatching passwords, login with the new password, rejection of the old password, reused/expired/malformed links, unknown email, provider failure, and two concurrent submissions of the same token (only one should succeed).
