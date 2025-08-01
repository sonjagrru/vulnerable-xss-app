How to run this simple app?

You need to start sql server for full experience and to load data via dump_init.sql:
open cmd
net start MySql80
mysql -u root -p < "path do sql_dump.sql"

Open the app via VS code and do the following in terminal:
cd backend
npm init -y // if you don't have package.json
npm install express mysql2 body-parser cors
node server.js // this is how you run the app

For full experience run Google without XSS protection:
start chrome.exe --disable-web-security --user-data-dir="C:\temp\chrome-xss"

Your app is now on
localhost:3000
