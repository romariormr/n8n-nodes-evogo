# n8n-nodes-evolutiongo

Node customizado do n8n para a API **[Evolution GO](https://github.com/romariormr/evolution-go-custom)** (WhatsApp),
no estilo do `n8n-nodes-evolution-api` — com **dropdown dinâmico de instâncias** e resolução automática de token.

![npm](https://img.shields.io/npm/v/n8n-nodes-evolutiongo)

## Instalação

**Pela UI do n8n** (recomendado): *Settings → Community Nodes → Install* → `n8n-nodes-evolutiongo`

**Manual** (self-hosted): copiar os arquivos de `dist/` para a pasta apontada por `N8N_CUSTOM_EXTENSIONS` e reiniciar o n8n.

## Recursos

| Resource | Operações |
|---|---|
| **Mensagem** | Texto, Mídia (imagem/vídeo/áudio/documento por URL), Botões (reply/url/call/copy/**pix**), Lista, Carrossel, Enquete, Localização, Contato, Sticker, Reagir, Marcar como lida, Editar, Apagar, Presença (digitando/gravando) |
| **Grupo** | Listar, Meus grupos, Info, Criar, Link de convite, Entrar via link, Sair, Participantes (add/remove/promote/demote), Nome, Descrição, Foto |
| **Instância** | Listar todas (API key global), Configurar webhook/eventos |

## Credencial `Evolution GO API`

| Campo | Descrição |
|---|---|
| **Base URL** | URL da API, ex.: `https://evolutiongo.exemplo.com` ou `http://10.0.0.5:4000` |
| **API Key** | **API Key Global** (recomendado — habilita o dropdown de instâncias) ou token de uma instância específica |
| **Ignorar Erros TLS** | Para certificados self-signed / wildcard não-correspondente |

### Modelo de instâncias

- Credencial com **API key global** → campo **Instância** lista todas as instâncias com status
  (`teste 🟢 open` / `x 🔴 close`); o node resolve o **token da instância** automaticamente na execução.
- Credencial com **token de instância** → deixe o campo Instância em "— Usar Chave Da Credencial —".

## Receber eventos (webhook)

Configure o webhook da instância apontando para um **Webhook trigger** do n8n
(operação *Instância → Configurar Webhook/Eventos*, eventos `MESSAGE` + `BUTTON_CLICK`).

Payload do clique em botão:

```json
{
  "event": "ButtonClick",
  "data": { "buttonId": "opcao_a", "buttonText": "Opção A", "phone": "55...", ... }
}
```

> ⚠️ Bug conhecido do Evolution GO: cliques do tipo `template_button_reply` chegam sem
> `phone`/`jid` — use fallback no fluxo (ex.: capturar o remetente pelo evento `Message`).

## Exemplo: menu interativo com submenu e "voltar"

```
Webhook ─► É clique? ─┬─ sim ─► roteia por buttonId ─► submenus / voltar / confirmação
                      └─ não ─► msg de texto recebida? ─► envia Menu Principal
```

Anti-loop: filtre `fromMe != true` e exija `message.conversation` não-vazio antes de responder menu.

## Build a partir do fonte

```bash
npm install
npm run build   # tsc + copia o ícone → dist/
```

## Licença

MIT
