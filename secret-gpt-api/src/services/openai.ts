import openai from 'src/lib/openai'

async function createCompletion({ prompt }: { prompt: string }) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 7,
    temperature: 0
  })
  return response.data
}
async function listEngines() {
  const response = await openai.listEngines()
  return response.data
}

export { createCompletion, listEngines }
