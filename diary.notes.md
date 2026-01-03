# NOTI

Small app to create notes online

## Stack

- React Vite
- Bun server
- Drizzle & PostgreSQL

## Auth

- Users (Supabase "auth.users")
- Supabase Auth (providers: Google, GitHub)
- Google (Client ID only), GitHub(Client ID/Key)
- pkg: @supabase/supabase-js
- Supabase*(Supabase URL, Public Anon Key)

## Schema (suapabase auth)

- use authUsers id reference --> profiles table id
- create a **function** and **trigger** to create auth.users.id & profiles.id on Supabase dashboard **(supabase docs recomandation)**
