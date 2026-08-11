# Serviço Windows - Painel de Controle de Fertilizantes de Solo Cooxupé

Este diretório contém os scripts utilitários para configurar e gerenciar o servidor do painel como um Serviço do Windows, permitindo o acesso de qualquer dispositivo na rede local de forma ininterrupta.

## 📋 Pré-requisitos

1. **Node.js** instalado e configurado no PATH do Windows.
2. **NSSM (Non-Sucking Service Manager)** - Baixado automaticamente durante a instalação pelo script.
3. **Permissões de Administrador** para instalar, parar, iniciar ou remover o serviço.

## 🚀 Instalação

### Passo 1: Instalar o serviço
1. Clique com o **botão direito** no arquivo `01_instalar_servico.bat`
2. Selecione **"Executar como administrador"**
3. Aguarde o download do NSSM e a instalação automática na porta `3000`.

### Passo 2: Acesso na Rede
Qualquer dispositivo conectado à mesma rede Wi-Fi ou rede cabeada que o seu notebook poderá acessar o painel abrindo o navegador no endereço exibido ao final da instalação, no formato:
`http://[IP_DO_SEU_NOTEBOOK]:3000`

---

## 🎮 Scripts de Gerenciamento

| Arquivo | Função |
|---------|--------|
| `01_instalar_servico.bat` | Instala o serviço no Windows e inicia o servidor (executar como admin) |
| `02_iniciar_servico.bat` | Inicia o serviço caso esteja parado (executar como admin) |
| `03_parar_servico.bat` | Interrompe o servidor temporariamente (executar como admin) |
| `04_reiniciar_servico.bat` | Reinicia o servidor para aplicar mudanças de código (executar como admin) |
| `05_limpeza_profunda_servidor.bat` | Encerra processos node.exe fantasmas e inicia o serviço limpo (executar como admin) |
| `06_remover_servico.bat` | Remove o serviço completamente do registro do Windows (executar como admin) |
| `07_status_servico.bat` | Exibe o estado do serviço e os endereços IP ativos para acesso na rede |

## 📁 Logs do Servidor

Caso ocorra qualquer erro de conexão ou o painel não abra, consulte os arquivos de logs gerados em:
*   `service\logs\stdout.log` (Mensagens do sistema)
*   `service\logs\stderr.log` (Relatórios de erros)
