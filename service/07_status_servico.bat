@echo off
chcp 65001 >nul

echo ============================================
echo   Status do Servico - Vendas de Fertilizante de Solo
echo ============================================
echo.

set "NSSM_EXE=%~dp0nssm\nssm.exe"
set "SERVICE_NAME=SoloFertilDashboard"

if not exist "%NSSM_EXE%" (
    echo [ERRO] NSSM nao encontrado. O servico ainda nao foi instalado.
    echo Execute primeiro: 01_instalar_servico.bat
    pause
    exit /b 1
)

echo [INFO] Status do servico:
"%NSSM_EXE%" status %SERVICE_NAME%

echo.
echo ============================================
echo   Informacoes do Servico
echo ============================================
echo.
echo Nome do Servico: %SERVICE_NAME%
echo.
echo Enderecos de acesso:
echo   - Local:  http://localhost:3000
echo.
echo   - IPs de Rede local disponiveis:
powershell -Command "[string[]](Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Ethernet*', 'Wi-Fi*').IPAddress"
echo.
echo   (Abra o navegador no endereco: http://[SEU_IP]:3000)
echo.
echo Logs disponiveis em:
echo   %~dp0logs\
echo.

pause
