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
'meta-llama/Llama-2-7b-chat-hf',
'meta-llama/Llama-2-13b-chat-hf',
'meta-llama/Llama-2-70b-chat-hf',
'codellama/CodeLlama-34b-Instruct-hf',
'mistralai/Mistral-7B-Instruct-v0.1',
'mistralai/Mixtral-8x7B-Instruct-v0.1',
'HuggingFaceH4/zephyr-7b-beta',
'Open-Orca/Mistral-7B-OpenOrca'
]
export const defaultModel = 'mistralai/Mixtral-8x7B-Instruct-v0.1';

// export const modelMaxToken = {
//   'mistral-7b-instruct': 8192,
//   'pplx-7b-chat': 4096,
//   'pplx-70b-chat': 4096,
//   'pplx-7b-online': 4096,
//   'pplx-70b-online': 4096,
//   'llama-2-70b-chat': 4096,
//   'codellama-34b-instruct': 4096
// };

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
