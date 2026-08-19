# n8n-nodes-evogo

Node customizado do n8n para a API **[Evolution GO](https://github.com/romariormr/evolution-go-custom)** (WhatsApp),
no estilo do `n8n-nodes-evolution-api` — com **dropdown dinâmico de instâncias** e resolução automática de token.

![npm](https://img.shields.io/npm/v/%40romariormr%2Fn8n-nodes-evogo)

## Instalação

**Pela UI do n8n** (recomendado): *Settings → Community Nodes → Install* → `@romariormr/n8n-nodes-evogo`

**Manual** (self-hosted): copiar os arquivos de `dist/` para a pasta apontada por `N8N_CUSTOM_EXTENSIONS` e reiniciar o n8n.

## Recursos

| Resource | Operações |
|---|---|
| **Mensagem** | Texto, **Link (prévia rica)**, Mídia (imagem/vídeo/áudio/documento por URL), Botões (reply/url/call/copy/**pix**, com **imagem no cabeçalho** — URL / Data URI / Binário), Lista, Carrossel, Enquete, Localização, Contato, Sticker, Reagir, Marcar como lida, Editar, Apagar, Presença (digitando/gravando) |
| **Grupo** | Listar, Meus grupos, Info, Criar, Link de convite, Entrar via link, Sair, Participantes (add/remove/promote/demote), Nome, Descrição, **Foto** (URL / Data URI / **Binário**), **Foto em Lote** (N grupos, retry, dry-run, resumo), **Atualizar Configurações** (announce/locked/aprovação/quem adiciona) |
| **Canal** | Listar canais inscritos, Info, Buscar por convite, Inscrever-se, Mensagens do canal, Criar canal. *Editar nome/descrição/foto de canal não é suportado — a lib WhatsApp do Evolution GO não expõe essa operação.* |
| **Chat** | Fixar, Desfixar, Arquivar, Desarquivar, Silenciar, Dessilenciar, Buscar histórico de mensagens (solicita reenvio ao WhatsApp — async), **Procurar Mensagens** (busca por número, paginado — só mensagens recebidas desde a 0.2.6) |
| **Perfil** | Buscar perfil, Buscar perfil profissional (Business), Atualizar nome, Atualizar status, Atualizar/Remover foto, Buscar/Atualizar configurações de privacidade |
| **Integração** | Chatwoot: buscar/definir/remover configuração, resetar status da conversa (precisa selecionar uma instância real, não a chave da credencial) |
| **Instância** | Listar todas (API key global), Configurar webhook/eventos |

> 💬 **Enviar mensagem para um canal**: use o resource **Mensagem** normalmente, colocando o
> JID do canal (termina em `@newsletter`) no campo **Número**. Use **Canal → Listar Canais**
> pra descobrir o JID de cada canal que você segue.

## Foto de grupo (Grupo → Alterar Foto)

Campo **Origem Da Foto**:

- **Binário** *(padrão)* — usa uma propriedade binária do item (ex.: um JPEG vindo do MinIO
  via *HTTP Request → binário*). O node converte pra `data:image/jpeg;base64,...` e envia. Não
  depende de a URL ser acessível pelo servidor Evolution — que é o motivo de URLs internas de
  MinIO serem recusadas.
- **Data URI** — cole `data:image/jpeg;base64,...` (ou PNG) direto.
- **URL Externa** — a imagem é **baixada pelo servidor Evolution**, então a URL precisa ser
  acessível *por ele*, não pelo n8n.

WhatsApp aceita **JPEG** ou PNG; JPEG baseline ~512–640px é o mais estável. O node valida o
binário (é imagem? jpeg/png? ≤ 5 MB?) antes de enviar e devolve a resposta do Evolution.
O token operacional da instância é resolvido internamente a partir do campo **Instância** —
não precisa de nó HTTP + Code pra extrair token.

**Grupo → Alterar Foto (Lote)**: aplica a mesma foto a vários grupos (um JID por linha),
um de cada vez, com **retry + atraso** em falha temporária (5xx/429/rede; 4xx não repete),
opção **dry-run** e um **resumo** no fim (`total`, `updated`, `failed`, `results[]` com o
motivo de cada falha). Nenhum token/chave aparece na saída.

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

## ☕ Apoie O Projeto

Se esse node te ajudou, considere apoiar:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-☕-FFDD00?style=for-the-badge)](https://buymeacoffee.com/romariormr)

## Licença

MIT
