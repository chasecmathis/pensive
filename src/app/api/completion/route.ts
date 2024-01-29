import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt } = await req.json();

  try {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
              You have expert knowledge and are helpful, clever, and articulate. You should always prioritize having correct grammar.
              You are eager to provide vivid and thoughtful responses to the user. Always respond by simply finishing the users train of thought, nothing more.`,
        },
        {
          role: "user",
          content: `
          I am writing a piece of text in a text editor app.
          Help me complete my train of thought here and append to what I have written: ##${prompt}##
          Keep the tone of the text consistent with the rest of the text.
          Keep the response short and sweet.
          `,
        },
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
