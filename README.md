# TableTrack Restaurant Ordering

A runnable MVP for a public menu, cart, checkout, token-based order tracking, authenticated admin order board, PostgreSQL persistence, Supabase Realtime, and a WhatsApp Cloud API webhook entry point.

## Quick start

1. Install Node.js 20+ and the Supabase CLI.
2. Copy `.env.example` to `.env` and add your Supabase project URL and anon key.
3. Run `supabase db push` against your project, then run `supabase/seed.sql` in the SQL editor.
4. Create an admin user in Supabase Auth, then insert a matching row into `public.profiles`:
   `insert into public.profiles(id, full_name, role) values ('AUTH_USER_UUID','Restaurant Owner','owner');`
5. Run `npm install` and `npm run dev`.

## WhatsApp setup

Deploy with `supabase functions deploy whatsapp-webhook --no-verify-jwt`. Set `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, and `WHATSAPP_APP_SECRET` using `supabase secrets set`. Configure the deployed function URL as the Meta webhook. The included webhook creates draft orders from incoming text; production use should also validate `X-Hub-Signature-256`, deduplicate message IDs, retain raw messages, and map conversational line items before automatic pricing.

## Security notes

- Prices are loaded from `menu_items` inside the database function, never trusted from the browser.
- Public tracking uses a random UUID token and a narrow security-definer function.
- Admin order access requires Supabase Auth plus a row in `profiles`.
- Never expose the service-role key in the Vite frontend.
- Before production, add rate limiting/CAPTCHA to checkout and Meta webhook signature verification.

## Included status flow

`draft → incoming → in_production → ready → out_for_delivery`

## Repository map

- `src/`: React/Vite client, TanStack Router, Query, Zustand cart, admin board
- `supabase/migrations/`: PostgreSQL schema, RLS, functions, audit trigger, realtime
- `supabase/functions/whatsapp-webhook/`: WhatsApp Cloud API webhook
- `supabase/seed.sql`: sample menu
