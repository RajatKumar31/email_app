# email_app

# Tech Stack :
Backend : NodeJS, ExpressJS, Postgresql, BullMQ, Drizzle ORM

Frontend : Nextjs, React Query, Shadcn/ui, Tailwind css

# Steps to setup the project:
1. Clone the project.
2. Move to backend folder and do "npm i".
3. Create a .env file and add the following:
   
    DATABASE_URL= postgresql://username:password@localhost:5432/email_sender (pgsql db connection string)
   
    RESEND_API_KEY= re_KKEEo8hN_asdfQFx7pccRgsXh23G3QgF (resend api key)
   
    REDIS_URL= redis://localhost:6379 (redis connection url)

4. Run "npx drizzle-kit push"
5. Run "npm start" to run the backend.

6. Move to the frontend folder and do "npm i".
7. Create a .env file and add the following:

   NEXT_PUBLIC_API_URL = http://localhost:5000/api/emails  (api base url)

8. Run "npm run dev" to run the frontend.
 
