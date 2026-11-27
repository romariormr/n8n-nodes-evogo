# Evolution GO no n8n — referência para agentes

Gerado a partir do node `@romariormr/n8n-nodes-evogo` v0.7.0 (tipo `@romariormr/n8n-nodes-evogo.evolutionGo`, typeVersion 1).
Use este node no lugar de **HTTP Request**: ele resolve o token da instância, monta o corpo certo de cada endpoint e trata erros.

## Como usar

- **Credencial:** `evolutionGoApi` (Base URL + API Key). Com a **API Key global**, o parâmetro `instanceId` recebe o **ID (UUID) da instância** (pegue em `resource: "instance"`, `operation: "listAll"`) e o node resolve o token dela sozinho. Com o token de uma instância na credencial, deixe `instanceId` vazio (`""`).
- **No n8n com projetos:** o workflow só enxerga credenciais do próprio projeto ou compartilhadas com ele.
- **Parâmetros:** todo node tem `resource` e `operation`; os demais dependem dos dois (tabelas abaixo). Os nomes são os internos do n8n (o que vai no JSON do workflow), não o rótulo da tela.
- **Número:** só dígitos com DDI (`5511999999999`), ou JID completo (`...@s.whatsapp.net`, grupo `...@g.us`, canal `...@newsletter`).
- **Mídia:** URLs precisam ser acessíveis pelo **servidor do Evolution GO**, não pelo n8n. Para arquivo vindo de outro node, use as opções que aceitam binário ou data URI.

### Exemplo de node no JSON do workflow

```json
{
  "type": "@romariormr/n8n-nodes-evogo.evolutionGo",
  "typeVersion": 1,
  "name": "Enviar texto",
  "parameters": {
    "resource": "message",
    "operation": "sendText",
    "instanceId": "<uuid-da-instancia ou vazio>",
    "number": "5511999999999",
    "text": "Olá!"
  },
  "credentials": { "evolutionGoApi": { "id": "<id-da-credencial>", "name": "Evolution GO" } }
}
```

## Índice

- [Mensagem](#message) — `resource: "message"`
- [Status (Stories)](#status) — `resource: "status"`
- [Grupo](#group) — `resource: "group"`
- [Comunidade](#community) — `resource: "community"`
- [Canal](#channel) — `resource: "channel"`
- [Chat](#chat) — `resource: "chat"`
- [Contato](#contact) — `resource: "contact"`
- [Histórico](#history) — `resource: "history"`
- [Agendamento](#schedule) — `resource: "schedule"`
- [Campanha](#campaign) — `resource: "campaign"`
- [Resposta Automática](#autoreply) — `resource: "autoReply"`
- [Perfil](#profile) — `resource: "profile"`
- [Integração](#integration) — `resource: "integration"`
- [Instância](#instance) — `resource: "instance"`

## Mensagem
<a id="message"></a>

`resource: "message"`

### Enviar Texto — `operation: "sendText"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `text` | string | sim |  |  |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Mídia (Imagem/Vídeo/Áudio/Documento) — `operation: "sendMedia"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `mediaType` | options |  | "image" | valores: `image`, `video`, `audio`, `document`, `gif` |
| `mediaUrl` | string | sim |  |  |
| `caption` | string |  |  |  |
| `filename` | string |  |  |  |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Álbum (Várias Fotos/Vídeos) — `operation: "sendAlbum"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `albumItems` | fixedCollection | sim |  | De 2 a 30 imagens/vídeos. URL http(s) ou data URI (data:image/jpeg;base64,...).; campos: `item{url, type, caption}` |
| `albumCaption` | string |  |  | Vai na primeira mídia, se ela não tiver legenda própria |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Enviar Link (Prévia Rica) — `operation: "sendLink"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `linkText` | string | sim |  | Corpo da mensagem. A URL precisa aparecer aqui para a prévia renderizar |
| `linkUrl` | string | sim |  |  |
| `linkTitle` | string |  |  |  |
| `linkDescription` | string |  |  |  |
| `linkImgUrl` | string |  |  | Miniatura mostrada no cartão da prévia |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Botões — `operation: "sendButtons"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `title` | string |  |  |  |
| `buttonImageSource` | options |  | "none" | Foto no topo da mensagem de botões (foto + botões numa mensagem só). Binário/Data URI não dependem de URL acessível pelo servidor. JPEG é o mais estável.; valores: `none`, `binary`, `dataUri`, `url` |
| `buttonImageBinaryProperty` | string | sim | "data" | Propriedade binária do item com a imagem (JPEG ou PNG); só se `buttonImageSource` = `"binary"` |
| `buttonImageDataUri` | string | sim |  | só se `buttonImageSource` = `"dataUri"` |
| `buttonImageUrl` | string | sim |  | A imagem é baixada pelo servidor Evolution — a URL precisa ser acessível por ele; só se `buttonImageSource` = `"url"` |
| `description` | string | sim |  |  |
| `footer` | string |  |  | Não enviar vazio — omitido se em branco |
| `buttons` | fixedCollection | sim |  | campos: `button{type, displayText, id, url, phoneNumber, copyCode, pixName, pixKeyType, pixKey}` |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Lista — `operation: "sendList"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `listNativeFlow` | boolean |  | false | Whether to send the list as the modern "native flow" drawer (single_select) instead of the legacy list message. Teste no seu WhatsApp: em alguns aparelhos o formato antigo não aparece. |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `title` | string |  |  |  |
| `description` | string | sim |  |  |
| `buttonText` | string |  | "Ver Menu" |  |
| `footerText` | string |  |  |  |
| `sections` | json | sim | "[\n  {\n    \"title\": \"Seção 1\",\n    \"rows\": [\n  ... | Array de seções: [{title, rows: [{title, description, rowId}]}] |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Carrossel — `operation: "sendCarousel"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `carouselBody` | string |  |  |  |
| `carouselFooter` | string |  |  |  |
| `cards` | json | sim | "[\n  {\n    \"header\": {\"title\": \"Card 1\", \"imageU... | Mínimo 2 cards, todos com imageUrl. O "body" do card é objeto {"text": "..."}, não string — string derruba o bind da API com 400. Tipos de botão: REPLY, URL, CALL, COPY. |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Enquete — `operation: "sendPoll"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `pollName` | string | sim |  |  |
| `pollOptions` | string | sim |  |  |
| `selectableCount` | number |  | 1 |  |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Localização — `operation: "sendLocation"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `latitude` | number | sim | 0 |  |
| `longitude` | number | sim | 0 |  |
| `locationName` | string |  |  |  |
| `address` | string |  |  |  |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Contato — `operation: "sendContact"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `contactName` | string | sim |  |  |
| `contactPhone` | string | sim |  |  |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Enviar Sticker — `operation: "sendSticker"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `stickerSource` | options |  | "url" | Binário evita depender de uma URL acessível pelo servidor Evolution; valores: `url`, `binary` |
| `stickerUrl` | string | sim |  | URL http(s), data URI (data:image/png;base64,...) ou base64 puro. PNG/JPG/WebP/GIF — vira WebP 512x512.; só se `stickerSource` = `"url"` |
| `stickerBinaryProperty` | string | sim | "data" | Nome da propriedade binária do item com a imagem (PNG/JPG/WebP/GIF); só se `stickerSource` = `"binary"` |
| `stickerOptions` | collection |  |  | campos: `packName`, `packPublisher`, `emojis`, `audio` |
| `additionalOptions` | collection |  |  | campos: `delay`, `mentionAll`, `quotedMessageId`, `formatJid`, `includeInstanceInfo` |

### Resultado Da Enquete — `operation: "pollResults"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `pollMessageId` | string | sim |  | ID devolvido no envio da enquete (Enviar Enquete) |
| `pollResultOptions` | string |  |  | Opcional: rotula os votos quando o servidor não guardou a definição da enquete (ex.: enquete enviada antes da atualização) |

### Reagir a Mensagem — `operation: "react"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `messageId` | string | sim |  |  |
| `emoji` | string |  | "👍" | Emoji da reação (vazio remove a reação) |

### Marcar Como Lida — `operation: "markRead"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `messageId` | string | sim |  |  |

### Editar Mensagem — `operation: "editMessage"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `messageId` | string | sim |  |  |
| `newText` | string | sim |  |  |

### Apagar Mensagem — `operation: "deleteMessage"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `messageId` | string | sim |  |  |

### Presença (Digitando/Gravando) — `operation: "presence"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `number` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `presenceState` | options |  | "composing" | valores: `composing`, `recording`, `paused` |

## Status (Stories)
<a id="status"></a>

`resource: "status"`

### Status De Texto — `operation: "statusText"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `statusText` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Status De Mídia (Imagem/Vídeo) — `operation: "statusMedia"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `statusMediaType` | options |  | "image" | valores: `image`, `video` |
| `statusMediaSource` | options |  | "binary" | De onde vem a mídia. Binário/Data URI não dependem de URL acessível pelo servidor (MinIO interno costuma ser recusado).; valores: `binary`, `dataUri`, `url` |
| `statusBinaryProperty` | string | sim | "data" | só se `statusMediaSource` = `"binary"` |
| `statusDataUri` | string | sim |  | só se `statusMediaSource` = `"dataUri"` |
| `statusMediaUrl` | string | sim |  | A mídia é baixada pelo servidor Evolution — a URL precisa ser acessível por ele; só se `statusMediaSource` = `"url"` |
| `statusCaption` | string |  |  | Texto + link (o link fica como texto, não clicável no status) |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Grupo
<a id="group"></a>

`resource: "group"`

### Listar Grupos — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Meus Grupos (Admin) — `operation: "myGroups"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Informações Do Grupo — `operation: "info"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |

### Criar Grupo — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupName` | string | sim |  |  |
| `participantsList` | string | sim |  |  |

### Link De Convite — `operation: "inviteLink"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |

### Entrar Via Link — `operation: "join"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `inviteLinkUrl` | string | sim |  |  |

### Sair Do Grupo — `operation: "leave"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |

### Gerenciar Participantes — `operation: "participants"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |
| `participantsList` | string | sim |  |  |
| `participantAction` | options |  | "add" | valores: `add`, `remove`, `promote`, `demote` |

### Alterar Nome — `operation: "setName"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |
| `groupName` | string | sim |  |  |

### Alterar Descrição — `operation: "setDescription"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |
| `groupDescription` | string | sim |  |  |

### Alterar Foto — `operation: "setPhoto"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |
| `photoSource` | options |  | "binary" | De onde vem a imagem. Binário e Data URI evitam depender de uma URL acessível pelo servidor — URLs internas de MinIO costumam ser recusadas.; valores: `binary`, `dataUri`, `url` |
| `photoBinaryProperty` | string | sim | "data" | Nome da propriedade binária do item que contém a imagem (JPEG ou PNG); só se `photoSource` = `"binary"` |
| `photoDataUri` | string | sim |  | Deve começar com data:image/jpeg;base64, ou data:image/png;base64,; só se `photoSource` = `"dataUri"` |
| `photoUrl` | string | sim |  | A imagem é baixada pelo servidor Evolution — a URL precisa ser acessível por ele; só se `photoSource` = `"url"` |

### Alterar Foto (Lote) — `operation: "setPhotoBatch"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `photoSource` | options |  | "binary" | De onde vem a imagem. Binário e Data URI evitam depender de uma URL acessível pelo servidor — URLs internas de MinIO costumam ser recusadas.; valores: `binary`, `dataUri`, `url` |
| `photoBinaryProperty` | string | sim | "data" | Nome da propriedade binária do item que contém a imagem (JPEG ou PNG); só se `photoSource` = `"binary"` |
| `photoDataUri` | string | sim |  | Deve começar com data:image/jpeg;base64, ou data:image/png;base64,; só se `photoSource` = `"dataUri"` |
| `photoUrl` | string | sim |  | A imagem é baixada pelo servidor Evolution — a URL precisa ser acessível por ele; só se `photoSource` = `"url"` |
| `batchGroupJids` | string | sim |  | Um JID de grupo por linha. A mesma foto é aplicada a todos, um de cada vez. |
| `batchDryRun` | boolean |  | false | Whether to only report which groups would be updated, without changing any photo |
| `batchRetries` | number |  | 2 | Novas tentativas em falha temporária (5xx, 429 ou rede). Erro de validação (4xx) não é repetido. |
| `batchDelayMs` | number |  | 1500 | Pausa entre um grupo e o próximo, e entre novas tentativas |

### Atualizar Configurações — `operation: "updateSettings"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `groupJid` | string | sim |  |  |
| `groupSettingsAction` | options |  | "announcement" | valores: `announcement`, `not_announcement`, `locked`, `unlocked`, `approval_on`, `approval_off`, `admin_add`, `all_member_add` |

## Comunidade
<a id="community"></a>

`resource: "community"`

### Listar Comunidades — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Informações Da Comunidade — `operation: "info"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityJid` | string | sim |  | JID da comunidade (rode "Listar Comunidades" para ver). Aceita só o número. |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Participantes Da Comunidade — `operation: "participants"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityJid` | string | sim |  | JID da comunidade (rode "Listar Comunidades" para ver). Aceita só o número. |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Enviar Aviso — `operation: "announce"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityJid` | string | sim |  | JID da comunidade (rode "Listar Comunidades" para ver). Aceita só o número. |
| `announcementText` | string | sim |  | Enviado no grupo de avisos da comunidade (só admins da comunidade conseguem) |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Criar Comunidade — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityName` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Vincular Grupos — `operation: "link"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityJid` | string | sim |  | JID da comunidade (rode "Listar Comunidades" para ver). Aceita só o número. |
| `communityGroups` | string | sim |  | Um JID de grupo por linha |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Desvincular Grupos — `operation: "unlink"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `communityJid` | string | sim |  | JID da comunidade (rode "Listar Comunidades" para ver). Aceita só o número. |
| `communityGroups` | string | sim |  | Um JID de grupo por linha |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Canal
<a id="channel"></a>

`resource: "channel"`

### Listar Canais (Inscritos) — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Informações Do Canal — `operation: "info"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `channelJid` | string | sim |  | Use a operação "Listar Canais" para descobrir o JID |

### Buscar Por Convite — `operation: "byInvite"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `inviteKey` | string | sim |  | Código no fim do link de convite do canal (https://whatsapp.com/channel/XXXX) |

### Inscrever-Se — `operation: "subscribe"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `channelJid` | string | sim |  | Use a operação "Listar Canais" para descobrir o JID |

### Mensagens Do Canal — `operation: "messages"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `channelJid` | string | sim |  | Use a operação "Listar Canais" para descobrir o JID |
| `messagesCount` | number |  | 20 |  |
| `messagesBeforeId` | number |  | 0 | Deixe 0 para trazer as mensagens mais recentes |

### Criar Canal — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `channelName` | string | sim |  |  |
| `channelDescription` | string |  |  |  |

## Chat
<a id="chat"></a>

`resource: "chat"`

### Fixar Conversa — `operation: "pin"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Desfixar Conversa — `operation: "unpin"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Arquivar Conversa — `operation: "archive"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Desarquivar Conversa — `operation: "unarchive"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Silenciar Conversa — `operation: "mute"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Dessilenciar Conversa — `operation: "unmute"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |

### Buscar Histórico De Mensagens — `operation: "historySync"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `referenceMessageId` | string | sim |  | ID de uma mensagem já conhecida desse chat — o WhatsApp usa como ponto de partida pra reenviar o histórico mais antigo |
| `referenceTimestamp` | dateTime | sim |  | Data/hora da mensagem de referência acima |
| `referenceIsFromMe` | boolean |  | false |  |
| `referenceIsGroup` | boolean |  | false |  |
| `historyCount` | number |  | 50 | Quantas mensagens antigas pedir pro WhatsApp reenviar |

### Procurar Mensagens — `operation: "findMessages"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `chatJid` | string | sim |  | Número destino (DDI+DDD+número) ou JID de grupo |
| `findPage` | number |  | 1 | Página da paginação (começa em 1) |
| `findLimit` | number |  | 20 | Máximo 100 |

## Contato
<a id="contact"></a>

`resource: "contact"`

### Verificar Números No WhatsApp — `operation: "check"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `contactNumbers` | string | sim |  | Um número por linha (DDI+DDD+número) |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Foto Do Contato — `operation: "avatar"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `contactNumber` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Listar Contatos — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Bloquear — `operation: "block"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `contactNumber` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Desbloquear — `operation: "unblock"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `contactNumber` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Listar Bloqueados — `operation: "blocklist"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Histórico
<a id="history"></a>

`resource: "history"`

### Buscar Mensagens — `operation: "search"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `historyChat` | string |  |  | Filtra uma conversa (número ou JID). Vazio = todas. |
| `historyQuery` | string |  |  | Busca no texto/legenda (full-text em português: "pedido" também acha "pedidos") |
| `historyFilters` | collection |  |  | campos: `fromMe`, `type`, `after`, `before`, `limit` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Listar Conversas — `operation: "chats"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Buscar Mensagem Por ID — `operation: "get"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `historyMessageId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Agendamento
<a id="schedule"></a>

`resource: "schedule"`

### Agendar Mensagem — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `scheduleNumber` | string | sim |  |  |
| `scheduleType` | options |  | "text" | Mesmo corpo do envio correspondente em Mensagem. Tipos além de texto requerem Evolution GO com suporte a link/media/poll/location/contact no agendamento.; valores: `text`, `link`, `media`, `poll`, `location`, `contact` |
| `scheduleText` | string | sim |  | No tipo Link, a URL precisa aparecer no texto para a prévia renderizar; só se `scheduleType` = `"text"`, `"link"` |
| `scheduleLinkUrl` | string | sim |  | só se `scheduleType` = `"link"` |
| `scheduleLinkTitle` | string |  |  | só se `scheduleType` = `"link"` |
| `scheduleLinkDescription` | string |  |  | só se `scheduleType` = `"link"` |
| `scheduleLinkImgUrl` | string |  |  | só se `scheduleType` = `"link"` |
| `scheduleMediaType` | options |  | "image" | valores: `image`, `video`, `audio`, `document`, `gif`; só se `scheduleType` = `"media"` |
| `scheduleMediaUrl` | string | sim |  | Baixada pelo servidor na hora do envio — precisa ser acessível por ele (envio por arquivo não é suportado no agendamento); só se `scheduleType` = `"media"` |
| `scheduleCaption` | string |  |  | só se `scheduleType` = `"media"` |
| `scheduleFilename` | string |  |  | só se `scheduleType` = `"media"` |
| `schedulePollQuestion` | string | sim |  | só se `scheduleType` = `"poll"` |
| `schedulePollOptions` | string | sim |  | Mínimo 2 opções; só se `scheduleType` = `"poll"` |
| `schedulePollMaxAnswer` | number |  | 1 | só se `scheduleType` = `"poll"` |
| `scheduleLatitude` | number | sim | 0 | só se `scheduleType` = `"location"` |
| `scheduleLongitude` | number | sim | 0 | só se `scheduleType` = `"location"` |
| `scheduleLocationName` | string |  |  | só se `scheduleType` = `"location"` |
| `scheduleAddress` | string |  |  | só se `scheduleType` = `"location"` |
| `scheduleContactName` | string | sim |  | só se `scheduleType` = `"contact"` |
| `scheduleContactPhone` | string | sim |  | só se `scheduleType` = `"contact"` |
| `scheduleMode` | options |  | "once" | valores: `once`, `cron` |
| `scheduleSendAt` | dateTime | sim |  | só se `scheduleMode` = `"once"` |
| `scheduleCron` | string | sim | "0 9 * * 1-5" | 5 campos: minuto hora dia mês dia-da-semana. Ex.: "0 9 * * 1-5" = dias úteis às 09:00.; só se `scheduleMode` = `"cron"` |
| `scheduleOptions` | collection |  |  | campos: `timezone`, `description` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Listar Agendamentos — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `scheduleStatus` | options |  |  | valores: ``, `scheduled`, `paused`, `sent`, `failed` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Pausar — `operation: "pause"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `scheduleId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Retomar — `operation: "resume"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `scheduleId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Apagar — `operation: "delete"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `scheduleId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Campanha
<a id="campaign"></a>

`resource: "campaign"`

### Criar Campanha — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignName` | string |  |  | Vazio = "Campanha dd/mm hh:mm" |
| `campaignType` | options |  | "text" | valores: `text`, `media` |
| `campaignText` | string | sim |  | Use {{name}} para o nome do destinatário e {{chave}} para variáveis informadas no JSON de destinatários; só se `campaignType` = `"text"` |
| `campaignMediaType` | options |  | "image" | valores: `image`, `video`, `audio`, `document`, `gif`; só se `campaignType` = `"media"` |
| `campaignMediaUrl` | string | sim |  | Baixada pelo servidor Evolution — precisa ser acessível por ele; só se `campaignType` = `"media"` |
| `campaignCaption` | string |  |  | Aceita {{name}} e {{chave}}; só se `campaignType` = `"media"` |
| `campaignFilename` | string |  |  | só se `campaignType` = `"media"` |
| `campaignNumbers` | string |  |  | Lista simples de destinatários (também aceita vírgula ou ;). Pode combinar com o JSON abaixo; repetidos são removidos. |
| `campaignRecipients` | json |  | "[]" | Opcional: [{"number": "5511999999999", "name": "Ana", "vars": {"pedido": "123"}}] — name e vars preenchem {{name}} e {{chave}} no texto |
| `campaignStart` | boolean |  | false | Whether to start the campaign right away (otherwise it is saved as a draft and started later with "Iniciar") |
| `campaignOptions` | collection |  |  | campos: `startAt`, `delayMinMs`, `delayMaxMs` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Listar Campanhas — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Buscar Campanha — `operation: "get"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Destinatários — `operation: "recipients"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `campaignRecipientFilters` | collection |  |  | campos: `status`, `limit`, `offset` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Iniciar — `operation: "start"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Pausar — `operation: "pause"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Cancelar — `operation: "cancel"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Reenviar Falhas — `operation: "retry"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Apagar — `operation: "delete"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `campaignId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Descadastro: Listar — `operation: "optOutList"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Descadastro: Adicionar — `operation: "optOutAdd"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `optOutNumber` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Descadastro: Remover — `operation: "optOutRemove"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `optOutNumber` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Resposta Automática
<a id="autoreply"></a>

`resource: "autoReply"`

### Listar Regras — `operation: "list"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Criar Regra — `operation: "create"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `autoReplyName` | string |  |  |  |
| `autoReplyEnabled` | boolean |  | true | Whether the rule is active |
| `autoReplyTrigger` | options |  | "keyword" | valores: `keyword`, `away`, `welcome` |
| `autoReplyMatchType` | options |  | "contains" | valores: `contains`, `equals`, `startsWith`, `regex`; só se `autoReplyTrigger` = `"keyword"` |
| `autoReplyPattern` | string | sim |  | Texto (sem diferenciar maiúsculas) ou regex; só se `autoReplyTrigger` = `"keyword"` |
| `autoReplyResponse` | string | sim |  | Até 4096 caracteres. {{name}} vira o nome do contato. |
| `autoReplyDays` | string |  | "1,2,3,4,5" | 0=domingo … 6=sábado, separados por vírgula; só se `autoReplyTrigger` = `"away"` |
| `autoReplyStartTime` | string |  | "08:00" | só se `autoReplyTrigger` = `"away"` |
| `autoReplyEndTime` | string |  | "18:00" | Pode virar o dia (ex.: 22:00 às 06:00); só se `autoReplyTrigger` = `"away"` |
| `autoReplyOptions` | collection |  |  | Na atualização, o que não for informado aqui mantém o valor atual da regra; campos: `priority`, `cooldownMinutes`, `skipIfAgent`, `timezone` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Atualizar Regra — `operation: "update"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `autoReplyRuleId` | string | sim |  |  |
| `autoReplyName` | string |  |  |  |
| `autoReplyEnabled` | boolean |  | true | Whether the rule is active |
| `autoReplyTrigger` | options |  | "keyword" | valores: `keyword`, `away`, `welcome` |
| `autoReplyMatchType` | options |  | "contains" | valores: `contains`, `equals`, `startsWith`, `regex`; só se `autoReplyTrigger` = `"keyword"` |
| `autoReplyPattern` | string | sim |  | Texto (sem diferenciar maiúsculas) ou regex; só se `autoReplyTrigger` = `"keyword"` |
| `autoReplyResponse` | string | sim |  | Até 4096 caracteres. {{name}} vira o nome do contato. |
| `autoReplyDays` | string |  | "1,2,3,4,5" | 0=domingo … 6=sábado, separados por vírgula; só se `autoReplyTrigger` = `"away"` |
| `autoReplyStartTime` | string |  | "08:00" | só se `autoReplyTrigger` = `"away"` |
| `autoReplyEndTime` | string |  | "18:00" | Pode virar o dia (ex.: 22:00 às 06:00); só se `autoReplyTrigger` = `"away"` |
| `autoReplyOptions` | collection |  |  | Na atualização, o que não for informado aqui mantém o valor atual da regra; campos: `priority`, `cooldownMinutes`, `skipIfAgent`, `timezone` |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Apagar Regra — `operation: "delete"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `autoReplyRuleId` | string | sim |  |  |
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

## Perfil
<a id="profile"></a>

`resource: "profile"`

### Buscar Perfil — `operation: "getProfile"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `profileNumber` | string | sim |  |  |

### Buscar Perfil Profissional — `operation: "getBusinessProfile"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `profileNumber` | string | sim |  |  |

### Atualizar Nome Do Perfil — `operation: "setProfileName"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `profileName` | string | sim |  |  |

### Atualizar Status — `operation: "setProfileStatus"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `profileStatus` | string | sim |  |  |

### Atualizar Foto Do Perfil — `operation: "setProfilePicture"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `profilePictureUrl` | string | sim |  | JPEG — outros formatos podem ser rejeitados pelo WhatsApp |

### Remover Foto Do Perfil — `operation: "removeProfilePicture"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Buscar Configurações De Privacidade — `operation: "getPrivacy"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |

### Atualizar Configurações De Privacidade — `operation: "setPrivacy"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só.; lista dinâmica (instâncias da credencial) |
| `privacyGroupAdd` | options |  | "all" | valores: `all`, `contacts`, `contact_blacklist` |
| `privacyLastSeen` | options |  | "all" | valores: `all`, `contacts`, `contact_blacklist`, `none` |
| `privacyStatus` | options |  | "all" | valores: `all`, `contacts`, `contact_blacklist`, `none` |
| `privacyProfile` | options |  | "all" | valores: `all`, `contacts`, `contact_blacklist`, `none` |
| `privacyReadReceipts` | options |  | "all" | valores: `all`, `none` |
| `privacyCallAdd` | options |  | "all" | valores: `all`, `known` |
| `privacyOnline` | options |  | "all" | valores: `all`, `match_last_seen` |

## Integração
<a id="integration"></a>

`resource: "integration"`

### Buscar Configuração Do Chatwoot — `operation: "getChatwoot"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options | sim |  | Escolha uma instância real da lista — diferente das outras operações, a config de Chatwoot precisa do ID explícito da instância na URL. Deixar no valor padrão "— Usar Chave Da Credencial —" vai falhar.; lista dinâmica (instâncias da credencial) |

### Definir Configuração Do Chatwoot — `operation: "setChatwoot"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options | sim |  | Escolha uma instância real da lista — diferente das outras operações, a config de Chatwoot precisa do ID explícito da instância na URL. Deixar no valor padrão "— Usar Chave Da Credencial —" vai falhar.; lista dinâmica (instâncias da credencial) |
| `chatwootEnabled` | boolean |  | true |  |
| `chatwootUrl` | string | sim |  |  |
| `chatwootAccountId` | string | sim |  |  |
| `chatwootToken` | string | sim |  |  |
| `chatwootNameInbox` | string |  |  | Se não existir e "Criar Inbox Automaticamente" estiver ativo, tenta criar |
| `chatwootAdditionalOptions` | collection |  |  | campos: `signMsg`, `reopenConversation`, `conversationPending`, `importContacts`, `importMessages`, `daysLimitImportMessages`, `autoCreate`, `organization`, `logo` |

### Remover Configuração Do Chatwoot — `operation: "deleteChatwoot"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options | sim |  | Escolha uma instância real da lista — diferente das outras operações, a config de Chatwoot precisa do ID explícito da instância na URL. Deixar no valor padrão "— Usar Chave Da Credencial —" vai falhar.; lista dinâmica (instâncias da credencial) |

### Resetar Status Da Conversa — `operation: "resetChatwootStatus"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options | sim |  | Escolha uma instância real da lista — diferente das outras operações, a config de Chatwoot precisa do ID explícito da instância na URL. Deixar no valor padrão "— Usar Chave Da Credencial —" vai falhar.; lista dinâmica (instâncias da credencial) |

## Instância
<a id="instance"></a>

`resource: "instance"`

### Listar Todas (API Key Global) — `operation: "listAll"`

_Sem parâmetros além de resource/operation._

### Configurar Webhook/Eventos — `operation: "configureWebhook"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `webhookUrl` | string | sim |  |  |
| `subscribeEvents` | multiOptions |  | ["MESSAGE", "BUTTON_CLICK"] | valores: `BUTTON_CLICK`, `CALL`, `CONNECTION`, `GROUP`, `MESSAGE`, `PRESENCE`, `READ_RECEIPT`, `SEND_MESSAGE` |

### Listar Webhooks Extras — `operation: "webhookList"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |

### Adicionar Webhook Extra — `operation: "webhookAdd"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `extraWebhookUrl` | string | sim |  | Webhook adicional que recebe os mesmos eventos do principal |

### Remover Webhook Extra — `operation: "webhookRemove"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `extraWebhookUrl` | string | sim |  | Webhook adicional que recebe os mesmos eventos do principal |

### Testar Webhooks — `operation: "webhookTest"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |

### Entregas De Webhook (Log) — `operation: "webhookDeliveries"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `webhookDeliveryFilters` | collection |  |  | campos: `status`, `limit` |

### Reenviar Entrega De Webhook — `operation: "webhookResend"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `webhookDeliveryId` | string | sim |  | ID da entrega (veja "Entregas De Webhook (Log)") |

### Buscar Configurações Avançadas — `operation: "getAdvancedSettings"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |

### Atualizar Configurações Avançadas — `operation: "updateAdvancedSettings"`

| Parâmetro | Tipo | Obrig. | Padrão | Observações |
|---|---|---|---|---|
| `instanceId` | options |  |  | Instância alvo da configuração.; lista dinâmica (instâncias da credencial) |
| `advancedSettings` | collection |  |  | Só os campos informados mudam; o resto mantém o valor atual (o node lê as configurações antes de gravar); campos: `alwaysOnline`, `rejectCall`, `msgRejectCall`, `readMessages`, `ignoreGroups`, `ignoreStatus`, `antiBanEnabled`, `antiBanLimit`, `antiBanWindowSec`, `antiBanDelayMinMs`, `antiBanDelayMaxMs`, `antiBanTyping` |
