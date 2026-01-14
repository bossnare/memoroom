# DIARY

Small app to create notes online, share ideas

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

## MIGRATE BACKEND TO PRISMA/PG+NestJS

- before: Drizzle/Pg+ElysiaJS
- after: Prisma/Pg+NestJS
