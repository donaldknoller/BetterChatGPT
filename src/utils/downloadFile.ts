
const downloadFile = async (data: any, filename: string): Promise<boolean> => {
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
  const dataname = data[0].title;
  const secretCode = data[0].config.secretCode

  const newdata = {
    messages: data[0].messages,
    model: data[0].config.model,
    temperature: data[0].config.temperature ?? 1,
    frequency_penalty: data[0].config.frequency_penalty ?? 0,
    presence_penalty: data[0].config.presence_penalty ?? 0,
  }
  console.dir(secretCode)
  console.dir(dataname)
  console.dir(newdata)
  
  // const blob = new Blob([JSON.stringify(newdata)], { type: 'application/json' });
  try {
    const response = await fetch(`https://promptline-uploader.danksyapp.workers.dev/${dataname}.json`, {
            method: "PUT",
            // mode: 'no-cors', // Disable CORS
            headers: {
                "Content-Type": "application/json",
                "X-SECRET-CODE": `${secretCode}`
            },
            body: JSON.stringify(newdata)
        });
  }catch(e){
    console.error(e)
    return false
  }
  // const url = URL.createObjectURL(blob);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = filename;
  // link.click();
  // link.remove();
  return true
};

export default downloadFile;
