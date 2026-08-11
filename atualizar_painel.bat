@echo off
chcp 65001 >nul

echo ============================================
echo   Atualizacao de Dados e Rebuild do Painel
echo ============================================
echo.
echo [1/3] Processando planilha "Analítico - Venda Gerencial.xlsx"...
node build_data.js
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao processar a planilha. Verifique se o arquivo "Analítico - Venda Gerencial.xlsx" existe e nao esta aberto no Excel.
    pause
    exit /b 1
)

echo.
echo [2/3] Recompilando a interface do painel (dist)...
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao recompilar o painel.
    pause
    exit /b 1
)

echo.
echo [3/3] Reiniciando o servico do servidor...
if exist "%~dp0service\nssm\nssm.exe" (
    "%~dp0service\nssm\nssm.exe" restart SoloFertilDashboard >nul 2>&1
)

echo.
echo ============================================
echo   [OK] Dados e Painel Atualizados com Sucesso!
echo ============================================
echo Por favor, recarregue a pagina no seu navegador (pressione Ctrl + F5 para limpar o cache se necessario).
echo.
pause
