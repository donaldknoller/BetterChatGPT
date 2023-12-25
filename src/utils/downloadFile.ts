const downloadFile = (data: any, filename: string) => {
// data example:
//[
//     {
//       "id": "9e565a09-dedf-44db-b8b2-b7b84a31d751",
//       "title": "testchat",
//       "messages": [
//           {
//               "role": "system",
//               "content": "You are ChatGPT, a large language model trained by OpenAI.\nCarefully heed the user's instructions. \nRespond using Markdown."
//           }
//       ],
//       "config": {
//           "model": "gpt-3.5-turbo",
//           "max_tokens": 4000,
//           "temperature": 1,
//           "presence_penalty": 0,
//           "top_p": 1,
//           "frequency_penalty": 0
//       },
//       "titleSet": false
//   }
// ]

// For anyscale
  const newdata = {
    filename: data[0].title,
    messages: data[0].messages,
    model: data[0].config.model,
    temperature: data[0].config.temperature ?? 1,
    frequency_penalty: data[0].config.frequency_penalty ?? 0,
    presence_penalty: data[0].config.presence_penalty ?? 0,
  }
  const blob = new Blob([JSON.stringify(newdata)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  link.remove();
};

export default downloadFile;
