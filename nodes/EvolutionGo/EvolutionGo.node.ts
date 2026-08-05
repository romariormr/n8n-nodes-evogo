import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class EvolutionGo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Evolution GO',
		name: 'evolutionGo',
		icon: 'file:evolutiongo.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Envia mensagens WhatsApp via Evolution GO (texto, mídia, botões, listas, carrossel, grupos, canais)',
		defaults: {
			name: 'Evolution GO',
		},
		inputs: ['main'] as never[],
		outputs: ['main'] as never[],
		credentials: [
			{
				name: 'evolutionGoApi',
				required: true,
			},
		],
		properties: [
			// ── Resource ─────────────────────────────────────────────
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Mensagem', value: 'message' },
					{ name: 'Grupo', value: 'group' },
					{ name: 'Canal', value: 'channel' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Instância', value: 'instance' },
				],
				default: 'message',
			},

			// ── Operations: Message ─────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['message'] } },
				options: [
					{ name: 'Enviar Texto', value: 'sendText', action: 'Enviar texto' },
					{ name: 'Enviar Mídia (Imagem/Vídeo/Áudio/Documento)', value: 'sendMedia', action: 'Enviar midia' },
					{ name: 'Enviar Botões', value: 'sendButtons', action: 'Enviar botoes' },
					{ name: 'Enviar Lista', value: 'sendList', action: 'Enviar lista' },
					{ name: 'Enviar Carrossel', value: 'sendCarousel', action: 'Enviar carrossel' },
					{ name: 'Enviar Enquete', value: 'sendPoll', action: 'Enviar enquete' },
					{ name: 'Enviar Localização', value: 'sendLocation', action: 'Enviar localizacao' },
					{ name: 'Enviar Contato', value: 'sendContact', action: 'Enviar contato' },
					{ name: 'Enviar Sticker', value: 'sendSticker', action: 'Enviar sticker' },
					{ name: 'Reagir a Mensagem', value: 'react', action: 'Reagir a mensagem' },
					{ name: 'Marcar Como Lida', value: 'markRead', action: 'Marcar como lida' },
					{ name: 'Editar Mensagem', value: 'editMessage', action: 'Editar mensagem' },
					{ name: 'Apagar Mensagem', value: 'deleteMessage', action: 'Apagar mensagem' },
					{ name: 'Presença (Digitando/Gravando)', value: 'presence', action: 'Enviar presenca' },
				],
				default: 'sendText',
			},

			// ── Operations: Group ────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['group'] } },
				options: [
					{ name: 'Listar Grupos', value: 'list', action: 'Listar grupos' },
					{ name: 'Meus Grupos (Admin)', value: 'myGroups', action: 'Meus grupos' },
					{ name: 'Informações Do Grupo', value: 'info', action: 'Info do grupo' },
					{ name: 'Criar Grupo', value: 'create', action: 'Criar grupo' },
					{ name: 'Link De Convite', value: 'inviteLink', action: 'Link de convite' },
					{ name: 'Entrar Via Link', value: 'join', action: 'Entrar via link' },
					{ name: 'Sair Do Grupo', value: 'leave', action: 'Sair do grupo' },
					{ name: 'Gerenciar Participantes', value: 'participants', action: 'Gerenciar participantes' },
					{ name: 'Alterar Nome', value: 'setName', action: 'Alterar nome' },
					{ name: 'Alterar Descrição', value: 'setDescription', action: 'Alterar descricao' },
					{ name: 'Alterar Foto', value: 'setPhoto', action: 'Alterar foto' },
					{ name: 'Atualizar Configurações', value: 'updateSettings', action: 'Atualizar configuracoes' },
				],
				default: 'list',
			},

			// ── Operations: Channel ──────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['channel'] } },
				options: [
					{ name: 'Listar Canais (Inscritos)', value: 'list', action: 'Listar canais' },
					{ name: 'Informações Do Canal', value: 'info', action: 'Info do canal' },
					{ name: 'Buscar Por Convite', value: 'byInvite', action: 'Buscar por convite' },
					{ name: 'Inscrever-Se', value: 'subscribe', action: 'Inscrever se' },
					{ name: 'Mensagens Do Canal', value: 'messages', action: 'Mensagens do canal' },
					{ name: 'Criar Canal', value: 'create', action: 'Criar canal' },
				],
				default: 'list',
			},

			// ── Operations: Chat ─────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['chat'] } },
				options: [
					{ name: 'Fixar Conversa', value: 'pin', action: 'Fixar conversa' },
					{ name: 'Desfixar Conversa', value: 'unpin', action: 'Desfixar conversa' },
					{ name: 'Arquivar Conversa', value: 'archive', action: 'Arquivar conversa' },
					{ name: 'Desarquivar Conversa', value: 'unarchive', action: 'Desarquivar conversa' },
					{ name: 'Silenciar Conversa', value: 'mute', action: 'Silenciar conversa' },
					{ name: 'Dessilenciar Conversa', value: 'unmute', action: 'Dessilenciar conversa' },
					{
						name: 'Buscar Histórico De Mensagens',
						value: 'historySync',
						action: 'Buscar historico de mensagens',
					},
					{ name: 'Procurar Mensagens', value: 'findMessages', action: 'Procurar mensagens' },
				],
				default: 'pin',
			},

			// ── Operations: Instance ─────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['instance'] } },
				options: [
					{ name: 'Listar Todas (API Key Global)', value: 'listAll', action: 'Listar instancias' },
					{ name: 'Configurar Webhook/Eventos', value: 'configureWebhook', action: 'Configurar webhook' },
				],
				default: 'listAll',
			},

			// ── Instância (dropdown) ─────────────────────────────────
			{
				displayName: 'Instância',
				name: 'instanceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getInstances',
				},
				default: '',
				description:
					'Instância WhatsApp que envia. Deixe no valor padrão pra usar a chave da credencial direto (funciona com chave de instância OU global). A lista de instâncias só carrega com chave GLOBAL — normal falhar aqui se sua chave for de uma instância só. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				displayOptions: {
					show: { resource: ['message', 'group', 'channel', 'chat'] },
				},
			},
			{
				displayName: 'Instância',
				name: 'instanceId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getInstances',
				},
				default: '',
				description:
					'Instância alvo da configuração. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				displayOptions: {
					show: { resource: ['instance'], operation: ['configureWebhook'] },
				},
			},

			// ── Common: number ───────────────────────────────────────
			{
				displayName: 'Número',
				name: 'number',
				type: 'string',
				default: '',
				placeholder: '5585999999999 ou 120363...@g.us',
				description: 'Número destino (DDI+DDD+número) ou JID de grupo',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: [
							'sendText',
							'sendMedia',
							'sendButtons',
							'sendList',
							'sendCarousel',
							'sendPoll',
							'sendLocation',
							'sendContact',
							'sendSticker',
							'react',
							'markRead',
							'editMessage',
							'deleteMessage',
							'presence',
						],
					},
				},
			},

			// ── sendText ─────────────────────────────────────────────
			{
				displayName: 'Texto',
				name: 'text',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendText'] } },
			},

			// ── sendMedia ────────────────────────────────────────────
			{
				displayName: 'Tipo De Mídia',
				name: 'mediaType',
				type: 'options',
				options: [
					{ name: 'Imagem', value: 'image' },
					{ name: 'Vídeo', value: 'video' },
					{ name: 'Áudio (PTT)', value: 'audio' },
					{ name: 'Documento', value: 'document' },
				],
				default: 'image',
				displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
			},
			{
				displayName: 'URL Da Mídia',
				name: 'mediaUrl',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://exemplo.com/arquivo.jpg',
				displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
			},
			{
				displayName: 'Legenda',
				name: 'caption',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
			},
			{
				displayName: 'Nome Do Arquivo',
				name: 'filename',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } },
			},

			// ── sendButtons ──────────────────────────────────────────
			{
				displayName: 'Título',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendButtons', 'sendList'] } },
			},
			{
				displayName: 'Descrição (Corpo)',
				name: 'description',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendButtons', 'sendList'] } },
			},
			{
				displayName: 'Rodapé',
				name: 'footer',
				type: 'string',
				default: '',
				description: 'Não enviar vazio — omitido se em branco',
				displayOptions: { show: { resource: ['message'], operation: ['sendButtons'] } },
			},
			{
				displayName: 'Botões',
				name: 'buttons',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				default: {},
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendButtons'] } },
				options: [
					{
						name: 'button',
						displayName: 'Botão',
						values: [
							{
								displayName: 'Tipo',
								name: 'type',
								type: 'options',
								options: [
									{ name: 'Reply (Resposta Rápida)', value: 'reply' },
									{ name: 'URL', value: 'url' },
									{ name: 'Ligação', value: 'call' },
									{ name: 'Copiar', value: 'copy' },
									{ name: 'PIX', value: 'pix' },
								],
								default: 'reply',
							},
							{
								displayName: 'Texto Do Botão',
								name: 'displayText',
								type: 'string',
								default: '',
							},
							{
								displayName: 'ID (Rastreio - Reply)',
								name: 'id',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['reply'] } },
							},
							{
								displayName: 'URL',
								name: 'url',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['url'] } },
							},
							{
								displayName: 'Telefone',
								name: 'phoneNumber',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['call'] } },
							},
							{
								displayName: 'Texto a Copiar',
								name: 'copyCode',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['copy'] } },
							},
							{
								displayName: 'PIX: Nome Do Recebedor',
								name: 'pixName',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['pix'] } },
							},
							{
								displayName: 'PIX: Tipo Da Chave',
								name: 'pixKeyType',
								type: 'options',
								options: [
									{ name: 'CPF', value: 'CPF' },
									{ name: 'CNPJ', value: 'CNPJ' },
									{ name: 'Email', value: 'EMAIL' },
									{ name: 'Telefone', value: 'PHONE' },
									{ name: 'Aleatória', value: 'EVP' },
								],
								default: 'CPF',
								displayOptions: { show: { type: ['pix'] } },
							},
							{
								displayName: 'PIX: Chave',
								name: 'pixKey',
								type: 'string',
								default: '',
								displayOptions: { show: { type: ['pix'] } },
							},
						],
					},
				],
			},

			// ── sendList ─────────────────────────────────────────────
			{
				displayName: 'Texto Do Botão Da Lista',
				name: 'buttonText',
				type: 'string',
				default: 'Ver Menu',
				displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
			},
			{
				displayName: 'Rodapé',
				name: 'footerText',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
			},
			{
				displayName: 'Seções (JSON)',
				name: 'sections',
				type: 'json',
				default:
					'[\n  {\n    "title": "Seção 1",\n    "rows": [\n      {"title": "Opção 1", "description": "Descrição", "rowId": "opcao_1"}\n    ]\n  }\n]',
				required: true,
				description: 'Array de seções: [{title, rows: [{title, description, rowId}]}]',
				displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
			},

			// ── sendCarousel ─────────────────────────────────────────
			{
				displayName: 'Corpo Principal',
				name: 'carouselBody',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendCarousel'] } },
			},
			{
				displayName: 'Rodapé Principal',
				name: 'carouselFooter',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendCarousel'] } },
			},
			{
				displayName: 'Cards (JSON)',
				name: 'cards',
				type: 'json',
				default:
					'[\n  {\n    "header": {"title": "Card 1", "imageUrl": "https://placehold.co/600x400"},\n    "body": "Texto do card",\n    "buttons": [{"type": "REPLY", "displayText": "Escolher", "id": "card_1"}]\n  },\n  {\n    "header": {"title": "Card 2", "imageUrl": "https://placehold.co/600x400"},\n    "body": "Texto do card 2",\n    "buttons": [{"type": "REPLY", "displayText": "Escolher", "id": "card_2"}]\n  }\n]',
				required: true,
				description: 'Mínimo 2 cards, todos com imageUrl. Tipos de botão: REPLY, URL, CALL, COPY.',
				displayOptions: { show: { resource: ['message'], operation: ['sendCarousel'] } },
			},

			// ── sendPoll ─────────────────────────────────────────────
			{
				displayName: 'Pergunta',
				name: 'pollName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } },
			},
			{
				displayName: 'Opções (Uma Por Linha)',
				name: 'pollOptions',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } },
			},
			{
				displayName: 'Máximo De Seleções',
				name: 'selectableCount',
				type: 'number',
				default: 1,
				displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } },
			},

			// ── sendLocation ─────────────────────────────────────────
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } },
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } },
			},
			{
				displayName: 'Nome Do Local',
				name: 'locationName',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } },
			},
			{
				displayName: 'Endereço',
				name: 'address',
				type: 'string',
				default: '',
				displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } },
			},

			// ── sendContact ──────────────────────────────────────────
			{
				displayName: 'Nome Do Contato',
				name: 'contactName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendContact'] } },
			},
			{
				displayName: 'Telefone Do Contato',
				name: 'contactPhone',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['sendContact'] } },
			},

			// ── sendSticker ──────────────────────────────────────────
			{
				displayName: 'URL Do Sticker',
				name: 'stickerUrl',
				type: 'string',
				default: '',
				required: true,
				description: 'URL de imagem (convertida para sticker WebP)',
				displayOptions: { show: { resource: ['message'], operation: ['sendSticker'] } },
			},

			// ── react / markRead / edit / delete ─────────────────────
			{
				displayName: 'ID Da Mensagem',
				name: 'messageId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['react', 'markRead', 'editMessage', 'deleteMessage'],
					},
				},
			},
			{
				displayName: 'Emoji',
				name: 'emoji',
				type: 'string',
				default: '👍',
				description: 'Emoji da reação (vazio remove a reação)',
				displayOptions: { show: { resource: ['message'], operation: ['react'] } },
			},
			{
				displayName: 'Novo Texto',
				name: 'newText',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['message'], operation: ['editMessage'] } },
			},

			// ── presence ─────────────────────────────────────────────
			{
				displayName: 'Estado',
				name: 'presenceState',
				type: 'options',
				options: [
					{ name: 'Digitando', value: 'composing' },
					{ name: 'Gravando Áudio', value: 'recording' },
					{ name: 'Pausado', value: 'paused' },
				],
				default: 'composing',
				displayOptions: { show: { resource: ['message'], operation: ['presence'] } },
			},

			// ── Message: opções extras ───────────────────────────────
			{
				displayName: 'Opções Adicionais',
				name: 'additionalOptions',
				type: 'collection',
				placeholder: 'Adicionar opção',
				default: {},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: [
							'sendText',
							'sendMedia',
							'sendButtons',
							'sendList',
							'sendCarousel',
							'sendPoll',
							'sendLocation',
							'sendContact',
							'sendSticker',
						],
					},
				},
				options: [
					{
						displayName: 'Delay (Ms)',
						name: 'delay',
						type: 'number',
						default: 0,
						description: 'Atraso antes de enviar, em milissegundos',
					},
					{
						displayName: 'Mencionar Todos (Grupos)',
						name: 'mentionAll',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Citar Mensagem (ID)',
						name: 'quotedMessageId',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Formatar JID Automaticamente',
						name: 'formatJid',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'Incluir Info Da Instância',
						name: 'includeInstanceInfo',
						type: 'boolean',
						default: false,
						description:
							'Whether to identify which instance actually sent the message (extra call to /instance/status with the same key used) — useful when "Instância" ficou no valor padrão e não dá pra saber qual instância é só pelos outros campos',
					},
				],
			},

			// ── Group fields ─────────────────────────────────────────
			{
				displayName: 'JID Do Grupo',
				name: 'groupJid',
				type: 'string',
				default: '',
				placeholder: '120363XXXXXXXXXX@g.us',
				required: true,
				displayOptions: {
					show: {
						resource: ['group'],
						operation: [
							'info',
							'inviteLink',
							'leave',
							'participants',
							'setName',
							'setDescription',
							'setPhoto',
							'updateSettings',
						],
					},
				},
			},
			{
				displayName: 'Ação',
				name: 'groupSettingsAction',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Somente Admins Enviam Mensagens', value: 'announcement' },
					{ name: 'Todos Podem Enviar Mensagens', value: 'not_announcement' },
					{ name: 'Somente Admins Editam Grupo (Nome/Descrição/Foto)', value: 'locked' },
					{ name: 'Todos Podem Editar Grupo', value: 'unlocked' },
					{ name: 'Aprovação De Novos Membros: Ativar', value: 'approval_on' },
					{ name: 'Aprovação De Novos Membros: Desativar', value: 'approval_off' },
					{ name: 'Somente Admins Adicionam Membros', value: 'admin_add' },
					{ name: 'Todos Podem Adicionar Membros', value: 'all_member_add' },
				],
				default: 'announcement',
				displayOptions: { show: { resource: ['group'], operation: ['updateSettings'] } },
			},
			{
				displayName: 'Nome Do Grupo',
				name: 'groupName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['group'], operation: ['create', 'setName'] } },
			},
			{
				displayName: 'Participantes (Um Número Por Linha)',
				name: 'participantsList',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['group'], operation: ['create', 'participants'] } },
			},
			{
				displayName: 'Ação',
				name: 'participantAction',
				type: 'options',
				options: [
					{ name: 'Adicionar', value: 'add' },
					{ name: 'Remover', value: 'remove' },
					{ name: 'Promover a Admin', value: 'promote' },
					{ name: 'Rebaixar Admin', value: 'demote' },
				],
				default: 'add',
				displayOptions: { show: { resource: ['group'], operation: ['participants'] } },
			},
			{
				displayName: 'Link De Convite',
				name: 'inviteLinkUrl',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://chat.whatsapp.com/XXXX',
				displayOptions: { show: { resource: ['group'], operation: ['join'] } },
			},
			{
				displayName: 'Descrição',
				name: 'groupDescription',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				required: true,
				displayOptions: { show: { resource: ['group'], operation: ['setDescription'] } },
			},
			{
				displayName: 'URL Da Foto',
				name: 'photoUrl',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['group'], operation: ['setPhoto'] } },
			},

			// ── Channel fields ───────────────────────────────────────
			{
				displayName: 'JID Do Canal',
				name: 'channelJid',
				type: 'string',
				default: '',
				placeholder: '120363XXXXXXXXXX@newsletter',
				required: true,
				description: 'Use a operação "Listar Canais" para descobrir o JID',
				displayOptions: { show: { resource: ['channel'], operation: ['info', 'subscribe', 'messages'] } },
			},
			{
				displayName: 'Chave Do Convite',
				name: 'inviteKey',
				type: 'string',
				default: '',
				placeholder: 'XXXXXXXXXXXXXXXXXXXX',
				required: true,
				description: 'Código no fim do link de convite do canal (https://whatsapp.com/channel/XXXX)',
				displayOptions: { show: { resource: ['channel'], operation: ['byInvite'] } },
			},
			{
				displayName: 'Nome Do Canal',
				name: 'channelName',
				type: 'string',
				default: '',
				required: true,
				displayOptions: { show: { resource: ['channel'], operation: ['create'] } },
			},
			{
				displayName: 'Descrição',
				name: 'channelDescription',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				displayOptions: { show: { resource: ['channel'], operation: ['create'] } },
			},
			{
				displayName: 'Quantidade De Mensagens',
				name: 'messagesCount',
				type: 'number',
				default: 20,
				displayOptions: { show: { resource: ['channel'], operation: ['messages'] } },
			},
			{
				displayName: 'Antes Do ID (Paginação)',
				name: 'messagesBeforeId',
				type: 'number',
				default: 0,
				description: 'Deixe 0 para trazer as mensagens mais recentes',
				displayOptions: { show: { resource: ['channel'], operation: ['messages'] } },
			},

			// ── Chat fields ──────────────────────────────────────────
			{
				displayName: 'Chat (Número/JID)',
				name: 'chatJid',
				type: 'string',
				default: '',
				placeholder: '5585999999999 ou 120363...@g.us',
				description: 'Número destino (DDI+DDD+número) ou JID de grupo',
				required: true,
				displayOptions: {
					show: {
						resource: ['chat'],
						operation: [
							'pin',
							'unpin',
							'archive',
							'unarchive',
							'mute',
							'unmute',
							'historySync',
							'findMessages',
						],
					},
				},
			},
			{
				displayName: 'Página',
				name: 'findPage',
				type: 'number',
				default: 1,
				description: 'Página da paginação (começa em 1)',
				displayOptions: { show: { resource: ['chat'], operation: ['findMessages'] } },
			},
			{
				displayName: 'Quantidade Por Página',
				name: 'findLimit',
				type: 'number',
				default: 20,
				description: 'Máximo 100',
				displayOptions: { show: { resource: ['chat'], operation: ['findMessages'] } },
			},
			{
				displayName:
					'Só encontra mensagens RECEBIDAS que já chegaram desde a atualização 0.2.5 do node (mensagens enviadas via API ou de antes dessa versão não são indexadas ainda).',
				name: 'findMessagesNote',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['chat'], operation: ['findMessages'] } },
			},
			{
				displayName: 'ID Da Mensagem De Referência',
				name: 'referenceMessageId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID de uma mensagem já conhecida desse chat — o WhatsApp usa como ponto de partida pra reenviar o histórico mais antigo',
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},
			{
				displayName: 'Timestamp Da Mensagem De Referência',
				name: 'referenceTimestamp',
				type: 'dateTime',
				default: '',
				required: true,
				description: 'Data/hora da mensagem de referência acima',
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},
			{
				displayName: 'Mensagem De Referência É Minha',
				name: 'referenceIsFromMe',
				type: 'boolean',
				default: false,
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},
			{
				displayName: 'É Grupo',
				name: 'referenceIsGroup',
				type: 'boolean',
				default: false,
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},
			{
				displayName: 'Quantidade De Mensagens',
				name: 'historyCount',
				type: 'number',
				default: 50,
				description: 'Quantas mensagens antigas pedir pro WhatsApp reenviar',
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},
			{
				displayName:
					'Isso só solicita o reenvio ao WhatsApp — não retorna as mensagens nesta resposta. O histórico chega depois pelos eventos normais de mensagem recebida (webhook), igual a qualquer outra mensagem.',
				name: 'historySyncNote',
				type: 'notice',
				default: '',
				displayOptions: { show: { resource: ['chat'], operation: ['historySync'] } },
			},

			// ── Instance fields ──────────────────────────────────────
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://wknew.gruponewland.com.br/webhook/meu-fluxo',
				displayOptions: { show: { resource: ['instance'], operation: ['configureWebhook'] } },
			},
			{
				displayName: 'Eventos',
				name: 'subscribeEvents',
				type: 'multiOptions',
				options: [
					{ name: 'BUTTON_CLICK', value: 'BUTTON_CLICK' },
					{ name: 'CALL', value: 'CALL' },
					{ name: 'CONNECTION', value: 'CONNECTION' },
					{ name: 'GROUP', value: 'GROUP' },
					{ name: 'MESSAGE', value: 'MESSAGE' },
					{ name: 'PRESENCE', value: 'PRESENCE' },
					{ name: 'READ_RECEIPT', value: 'READ_RECEIPT' },
					{ name: 'SEND_MESSAGE', value: 'SEND_MESSAGE' },
				],
				default: ['MESSAGE', 'BUTTON_CLICK'],
				displayOptions: { show: { resource: ['instance'], operation: ['configureWebhook'] } },
			},
		],
	};

	methods = {
		loadOptions: {
			async getInstances(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const defaultOption: INodePropertyOptions = {
					name: '— Usar Chave Da Credencial —',
					value: '',
					description: 'Sem seleção: a API key da credencial é usada direto (token de instância)',
				};

				const credentials = await this.getCredentials('evolutionGoApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				let instances: IDataObject[] = [];
				let loadError = '';
				let isAuthError = false;
				try {
					const response = (await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/instance/all`,
						headers: { apikey: credentials.apiKey as string },
						json: true,
						skipSslCertificateValidation: credentials.allowUnauthorizedCerts === true,
					})) as IDataObject[] | IDataObject;
					if (Array.isArray(response)) {
						instances = response;
					} else if (response && Array.isArray((response as IDataObject).data)) {
						instances = (response as IDataObject).data as IDataObject[];
					} else {
						loadError = `resposta inesperada: ${JSON.stringify(response).slice(0, 80)}`;
					}
				} catch (error) {
					const message = (error as Error).message || '';
					isAuthError = message.includes('401') || message.includes('403');
					loadError = message.slice(0, 100) || 'erro desconhecido';
				}

				if (loadError) {
					// 401/403 aqui é o caso ESPERADO quando a credencial tem uma chave de
					// instância (não a GLOBAL) — listar todas as instâncias é uma operação
					// só de admin. Não é erro do usuário, então não usa tom de alerta.
					if (isAuthError) {
						return [
							defaultOption,
							{
								name: 'ℹ️ Não foi possível listar instâncias (chave não é GLOBAL)',
								value: '__error__',
								description:
									'Normal se você está usando uma chave de instância — deixe no valor padrão acima pra usar essa chave direto, sem precisar listar nada.',
							},
						];
					}
					return [
						defaultOption,
						{
							name: `⚠️ Falha Ao Listar Instâncias: ${loadError}`,
							value: '__error__',
							description: 'Confira a Base URL da credencial e a conectividade com o servidor',
						},
					];
				}

				return [
					defaultOption,
					...instances
						.map((inst) => ({
							name: `${inst.name} ${inst.connected ? '🟢 open' : '🔴 close'}`,
							value: inst.id as string,
							description: (inst.jid as string) || '',
						}))
						.sort((a, b) => a.name.localeCompare(b.name)),
				];
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('evolutionGoApi');
		const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
		const skipSsl = credentials.allowUnauthorizedCerts === true;

		// Cache do /instance/all para resolver token da instância selecionada
		let instancesCache: IDataObject[] | undefined;
		const resolveInstanceToken = async (instanceId: string): Promise<string> => {
			if (instancesCache === undefined) {
				try {
					const resp = (await this.helpers.httpRequest({
						method: 'GET',
						url: `${baseUrl}/instance/all`,
						headers: { apikey: credentials.apiKey as string },
						json: true,
						skipSslCertificateValidation: skipSsl,
					})) as IDataObject[] | IDataObject;
					instancesCache = Array.isArray(resp)
						? resp
						: Array.isArray((resp as IDataObject)?.data)
							? ((resp as IDataObject).data as IDataObject[])
							: [];
				} catch {
					instancesCache = [];
				}
			}
			const found = instancesCache.find(
				(inst) => inst.id === instanceId || inst.name === instanceId || inst.token === instanceId,
			);
			return (found?.token as string) || '';
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let method: IHttpRequestMethods = 'POST';
				let endpoint = '';
				const body: IDataObject = {};

				const addExtras = () => {
					const extras = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
					if (extras.delay) body.delay = extras.delay;
					if (extras.mentionAll) body.mentionAll = true;
					if (extras.formatJid === false) body.formatJid = false;
					if (extras.quotedMessageId) body.quoted = { messageId: extras.quotedMessageId };
				};

				const parseJsonParam = (name: string): unknown => {
					const raw = this.getNodeParameter(name, i);
					if (typeof raw === 'string') {
						try {
							return JSON.parse(raw);
						} catch {
							throw new NodeOperationError(this.getNode(), `Parâmetro "${name}" não é JSON válido`, {
								itemIndex: i,
							});
						}
					}
					return raw;
				};

				if (resource === 'message') {
					body.number = this.getNodeParameter('number', i) as string;

					switch (operation) {
						case 'sendText':
							endpoint = '/send/text';
							body.text = this.getNodeParameter('text', i) as string;
							addExtras();
							break;

						case 'sendMedia':
							endpoint = '/send/media';
							body.type = this.getNodeParameter('mediaType', i) as string;
							body.url = this.getNodeParameter('mediaUrl', i) as string;
							{
								const caption = this.getNodeParameter('caption', i, '') as string;
								const filename = this.getNodeParameter('filename', i, '') as string;
								if (caption) body.caption = caption;
								if (filename) body.filename = filename;
							}
							addExtras();
							break;

						case 'sendButtons': {
							endpoint = '/send/button';
							const title = this.getNodeParameter('title', i, '') as string;
							const footer = this.getNodeParameter('footer', i, '') as string;
							if (title) body.title = title;
							if (footer) body.footer = footer;
							body.description = this.getNodeParameter('description', i) as string;
							const collection = this.getNodeParameter('buttons', i, {}) as IDataObject;
							const rows = (collection.button as IDataObject[]) || [];
							body.buttons = rows.map((b) => {
								const type = b.type as string;
								if (type === 'reply')
									return { type, displayText: b.displayText, id: b.id };
								if (type === 'url') return { type, displayText: b.displayText, url: b.url };
								if (type === 'call')
									return { type, displayText: b.displayText, phoneNumber: b.phoneNumber };
								if (type === 'copy')
									return { type, displayText: b.displayText, copyCode: b.copyCode };
								return {
									type: 'pix',
									currency: 'BRL',
									name: b.pixName,
									keyType: b.pixKeyType,
									key: b.pixKey,
								};
							});
							addExtras();
							break;
						}

						case 'sendList': {
							endpoint = '/send/list';
							const title = this.getNodeParameter('title', i, '') as string;
							const footerText = this.getNodeParameter('footerText', i, '') as string;
							if (title) body.title = title;
							if (footerText) body.footerText = footerText;
							body.description = this.getNodeParameter('description', i) as string;
							body.buttonText = this.getNodeParameter('buttonText', i, 'Ver Menu') as string;
							body.sections = parseJsonParam('sections') as IDataObject[];
							addExtras();
							break;
						}

						case 'sendCarousel': {
							endpoint = '/send/carousel';
							const cBody = this.getNodeParameter('carouselBody', i, '') as string;
							const cFooter = this.getNodeParameter('carouselFooter', i, '') as string;
							if (cBody) body.body = cBody;
							if (cFooter) body.footer = cFooter;
							body.cards = parseJsonParam('cards') as IDataObject[];
							addExtras();
							break;
						}

						case 'sendPoll': {
							endpoint = '/send/poll';
							body.name = this.getNodeParameter('pollName', i) as string;
							body.options = (this.getNodeParameter('pollOptions', i) as string)
								.split('\n')
								.map((o) => o.trim())
								.filter(Boolean);
							body.selectableCount = this.getNodeParameter('selectableCount', i, 1) as number;
							addExtras();
							break;
						}

						case 'sendLocation':
							endpoint = '/send/location';
							body.latitude = this.getNodeParameter('latitude', i) as number;
							body.longitude = this.getNodeParameter('longitude', i) as number;
							{
								const name = this.getNodeParameter('locationName', i, '') as string;
								const address = this.getNodeParameter('address', i, '') as string;
								if (name) body.name = name;
								if (address) body.address = address;
							}
							addExtras();
							break;

						case 'sendContact':
							endpoint = '/send/contact';
							body.name = this.getNodeParameter('contactName', i) as string;
							body.phone = this.getNodeParameter('contactPhone', i) as string;
							addExtras();
							break;

						case 'sendSticker':
							endpoint = '/send/sticker';
							body.url = this.getNodeParameter('stickerUrl', i) as string;
							addExtras();
							break;

						case 'react':
							endpoint = '/message/react';
							body.messageId = this.getNodeParameter('messageId', i) as string;
							body.emoji = this.getNodeParameter('emoji', i, '') as string;
							break;

						case 'markRead':
							endpoint = '/message/markread';
							body.messageId = this.getNodeParameter('messageId', i) as string;
							break;

						case 'editMessage':
							endpoint = '/message/edit';
							body.messageId = this.getNodeParameter('messageId', i) as string;
							body.text = this.getNodeParameter('newText', i) as string;
							break;

						case 'deleteMessage':
							endpoint = '/message/delete';
							body.messageId = this.getNodeParameter('messageId', i) as string;
							break;

						case 'presence':
							endpoint = '/message/presence';
							body.state = this.getNodeParameter('presenceState', i) as string;
							break;

						default:
							throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
								itemIndex: i,
							});
					}
				} else if (resource === 'group') {
					switch (operation) {
						case 'list':
							method = 'GET';
							endpoint = '/group/list';
							break;
						case 'myGroups':
							method = 'GET';
							endpoint = '/group/myall';
							break;
						case 'info':
							endpoint = '/group/info';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							break;
						case 'create':
							endpoint = '/group/create';
							body.groupName = this.getNodeParameter('groupName', i) as string;
							body.participants = (this.getNodeParameter('participantsList', i) as string)
								.split('\n')
								.map((p) => p.trim())
								.filter(Boolean);
							break;
						case 'inviteLink':
							endpoint = '/group/invitelink';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							break;
						case 'join':
							endpoint = '/group/join';
							body.link = this.getNodeParameter('inviteLinkUrl', i) as string;
							break;
						case 'leave':
							endpoint = '/group/leave';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							break;
						case 'participants':
							endpoint = '/group/participant';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							body.action = this.getNodeParameter('participantAction', i) as string;
							body.participants = (this.getNodeParameter('participantsList', i) as string)
								.split('\n')
								.map((p) => p.trim())
								.filter(Boolean);
							break;
						case 'setName':
							endpoint = '/group/name';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							body.name = this.getNodeParameter('groupName', i) as string;
							break;
						case 'setDescription':
							endpoint = '/group/description';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							body.description = this.getNodeParameter('groupDescription', i) as string;
							break;
						case 'setPhoto':
							endpoint = '/group/photo';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							body.url = this.getNodeParameter('photoUrl', i) as string;
							break;
						case 'updateSettings':
							endpoint = '/group/settings';
							body.groupJid = this.getNodeParameter('groupJid', i) as string;
							body.action = this.getNodeParameter('groupSettingsAction', i) as string;
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
								itemIndex: i,
							});
					}
				} else if (resource === 'channel') {
					switch (operation) {
						case 'list':
							method = 'GET';
							endpoint = '/newsletter/list';
							break;
						case 'info':
							endpoint = '/newsletter/info';
							body.jid = this.getNodeParameter('channelJid', i) as string;
							break;
						case 'byInvite':
							endpoint = '/newsletter/link';
							body.key = this.getNodeParameter('inviteKey', i) as string;
							break;
						case 'subscribe':
							endpoint = '/newsletter/subscribe';
							body.jid = this.getNodeParameter('channelJid', i) as string;
							break;
						case 'messages':
							endpoint = '/newsletter/messages';
							body.jid = this.getNodeParameter('channelJid', i) as string;
							body.count = this.getNodeParameter('messagesCount', i, 20) as number;
							body.before_id = this.getNodeParameter('messagesBeforeId', i, 0) as number;
							break;
						case 'create':
							endpoint = '/newsletter/create';
							body.name = this.getNodeParameter('channelName', i) as string;
							body.description = this.getNodeParameter('channelDescription', i, '') as string;
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
								itemIndex: i,
							});
					}
				} else if (resource === 'chat') {
					switch (operation) {
						case 'pin':
							endpoint = '/chat/pin';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'unpin':
							endpoint = '/chat/unpin';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'archive':
							endpoint = '/chat/archive';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'unarchive':
							endpoint = '/chat/unarchive';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'mute':
							endpoint = '/chat/mute';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'unmute':
							endpoint = '/chat/unmute';
							body.chat = this.getNodeParameter('chatJid', i) as string;
							break;
						case 'historySync':
							endpoint = '/chat/history-sync';
							body.messageInfo = {
								Chat: this.getNodeParameter('chatJid', i) as string,
								IsFromMe: this.getNodeParameter('referenceIsFromMe', i, false) as boolean,
								IsGroup: this.getNodeParameter('referenceIsGroup', i, false) as boolean,
								ID: this.getNodeParameter('referenceMessageId', i) as string,
								Timestamp: this.getNodeParameter('referenceTimestamp', i) as string,
							};
							body.count = this.getNodeParameter('historyCount', i, 50) as number;
							break;
						case 'findMessages':
							endpoint = '/chat/find-messages';
							body.remoteJid = this.getNodeParameter('chatJid', i) as string;
							body.page = this.getNodeParameter('findPage', i, 1) as number;
							body.limit = this.getNodeParameter('findLimit', i, 20) as number;
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
								itemIndex: i,
							});
					}
				} else if (resource === 'instance') {
					switch (operation) {
						case 'listAll':
							method = 'GET';
							endpoint = '/instance/all';
							break;
						case 'configureWebhook':
							endpoint = '/instance/connect';
							body.webhookUrl = this.getNodeParameter('webhookUrl', i) as string;
							body.subscribe = this.getNodeParameter('subscribeEvents', i) as string[];
							break;
						default:
							throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`, {
								itemIndex: i,
							});
					}
				}

				// Token da instância selecionada (dropdown); vazio = usa a chave da credencial
				let apikey = credentials.apiKey as string;
				const needsInstance = !(resource === 'instance' && operation === 'listAll');
				if (needsInstance) {
					const instanceId = this.getNodeParameter('instanceId', i, '') as string;
					if (instanceId) {
						const token = await resolveInstanceToken(instanceId);
						if (token) apikey = token;
					}
				}

				const response = await this.helpers.httpRequest({
					method,
					url: baseUrl + endpoint,
					headers: { apikey },
					body: method === 'GET' ? undefined : body,
					json: true,
					skipSslCertificateValidation: skipSsl,
				});

				// Round-trip JSON: remove qualquer referência circular (sockets/agent) antes de devolver ao n8n
				let out: IDataObject;
				try {
					const plain = JSON.parse(JSON.stringify(response ?? {}));
					out = Array.isArray(plain) ? { data: plain } : (plain as IDataObject);
				} catch {
					out = { data: String(response) };
				}

				// Identifica qual instância enviou de fato (mesma chave usada na requisição
				// acima) — útil quando "Instância" ficou no valor padrão (chave da
				// credencial) e não dá pra saber qual instância é só olhando os outros campos.
				const wantsInstanceInfo =
					(this.getNodeParameter('additionalOptions', i, {}) as IDataObject)
						.includeInstanceInfo === true;
				if (wantsInstanceInfo) {
					try {
						const statusResp = (await this.helpers.httpRequest({
							method: 'GET',
							url: `${baseUrl}/instance/status`,
							headers: { apikey },
							json: true,
							skipSslCertificateValidation: skipSsl,
						})) as IDataObject;
						out._instance = (statusResp?.data as IDataObject) ?? statusResp;
					} catch (statusError) {
						out._instance = {
							error:
								(statusError as Error).message?.slice(0, 100) ||
								'não foi possível identificar a instância',
						};
					}
				}

				returnData.push({ json: out, pairedItem: { item: i } });
			} catch (error) {
				const e = error as IDataObject & { response?: IDataObject; message?: string };
				let detail = e.message || 'erro desconhecido';
				const respBody = (e.response as IDataObject | undefined)?.body;
				if (respBody) {
					try {
						detail += ` — API: ${JSON.stringify(respBody).slice(0, 300)}`;
					} catch {
						/* ignore */
					}
				}
				if (this.continueOnFail()) {
					returnData.push({ json: { error: detail }, pairedItem: { item: i } });
					continue;
				}
				if (error instanceof NodeOperationError) throw error;
				throw new NodeOperationError(this.getNode(), `Evolution GO: ${detail}`, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
