@echo off
chcp 65001 >nul

echo ============================================
echo   Atualizacao de Dados e Rebuild do Painel
echo ============================================
echo.
echo [1/3] Processing "Analitico - Venda Gerencial.xlsx"...
cd /d "%~dp0"
node build_data.js
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Failed to process the workbook. Ensure "Analitico - Venda Gerencial.xlsx" exists and is closed in Excel.
    pause
    exit /b 1
)

echo.
echo [2/3] Rebuilding the dashboard UI (dist)...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Build failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Restarting server service (if installed)...
if exist "%~dp0service\nssm\nssm.exe" (
    "%~dp0service\nssm\nssm.exe" restart SoloFertilDashboard >nul 2>&1
)

echo.
echo ============================================
echo   [OK] Data and Dashboard Updated Successfully!
echo ============================================
echo Please reload the page in your browser (Ctrl+F5 to clear cache if needed).
echo.
pause
