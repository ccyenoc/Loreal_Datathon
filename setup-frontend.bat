@echo off
echo Setting up Loreal Datathon Frontend...
echo.

cd /d "%~dp0frontend"

echo Installing Node.js dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: Failed to install dependencies!
    echo Please ensure Node.js and npm are installed.
    pause
    exit /b 1
)

echo.
echo Setup complete! Starting development server...
echo.
echo The application will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server.
echo.

call npm run dev

pause
