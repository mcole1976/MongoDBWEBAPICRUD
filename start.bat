@echo off
cd /d "C:\Users\Marcus\Documents\Code\NodeJS\MVC_Start"
start "Node Server" node server.js
timeout /t 2 >nul
start "" "http://localhost:3000/entry"
exit