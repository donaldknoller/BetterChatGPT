import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040
export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `You are ChatGPT, a large language model trained by OpenAI.
Carefully heed the user's instructions. 
Respond using Markdown.`;

export const modelOptions: ModelOptions[] = [
  'mistral-7b-instruct',
  'pplx-7b-online',
  'pplx-70b-online',
  'llama-2-70b-chat',
  'mixtral-8x7b-instruct'
]
export const defaultModel = 'mixtral-8x7b-instruct';

// export const modelMaxToken = {
//   'gpt-3.5-turbo': 4096,
//   'gpt-3.5-turbo-0301': 4096,
//   'gpt-3.5-turbo-0613': 4096,
//   'gpt-3.5-turbo-16k': 16384,
//   'gpt-3.5-turbo-16k-0613': 16384,
//   'gpt-3.5-turbo-1106': 16384,
//   'gpt-4': 8192,
//   'gpt-4-0314': 8192,
//   'gpt-4-0613': 8192,
//   'gpt-4-32k': 32768,
//   'gpt-4-32k-0314': 32768,
//   'gpt-4-32k-0613': 32768,
//   'gpt-4-1106-preview': 128000,
//   'mistral-7b-instruct': 8192,
//   'pplx-7b-chat': 4096,
//   'pplx-70b-chat': 4096,
//   'pplx-7b-online': 4096,
//   'pplx-70b-online': 4096,
//   'llama-2-70b-chat': 4096,
//   'codellama-34b-instruct': 4096
// };

const flatModel =  {
  prompt: { price: 0.0015, unit: 1000 },
  completion: { price: 0.002, unit: 1000 },
}
export const modelCost = {
  'mistral-7b-instruct': {
    prompt: { price: 0.03, unit: 1000 },
    completion: { price: 0.06, unit: 1000 },
  },
  'pplx-7b-chat': flatModel,
  'pplx-70b-chat': flatModel,
  'pplx-7b-online': flatModel,
  'pplx-70b-online': flatModel,
  'llama-2-70b-chat': flatModel,
  'mixtral-8x7b-instruct': flatModel,
  'codellama-34b-instruct': flatModel,
};

export const defaultUserMaxToken = 4000;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 1,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0.1,
};

export const generateDefaultChat = (
  title?: string,
  folder?: string
): ChatInterface => ({
  id: uuidv4(),
  title: title ? title : 'New Chat',
  messages:
    useStore.getState().defaultSystemMessage.length > 0
      ? [{ role: 'system', content: useStore.getState().defaultSystemMessage }]
      : [],
  config: { ...useStore.getState().defaultChatConfig },
  titleSet: false,
  folder,
});

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
