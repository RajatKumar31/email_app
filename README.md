# email_app

# Tech Stack :
Backend : NodeJS, ExpressJS, Postgresql, BullMQ, Drizzle ORM
Frontend : Nextjs, Shadcn/ui, Tailwind css

# Steps to setup the project:
1. Clone the project.
2. Move to backend folder and do "npm i".
3. Create a .env file and add the following:
   
    DATABASE_URL= postgresql://username:password@localhost:5432/email_sender (pgsql db connection string)
   
    RESEND_API_KEY= re_KKEEo8hN_asdfQFx7pccRgsXh23G3QgF (resend api key)
   
    REDIS_URL= redis://localhost:6379 (redis connection url)

5. Run "npx drizzle-kit push"
6. Run "npm start" to run the project.

7. Move to the frontend folder and do "npm i".
8. Create a .env file and add the following:

   NEXT_PUBLIC_API_URL = http://localhost:5000/api/emails  (api base url)
 
