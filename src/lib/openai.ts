import { error } from "console";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(config);

export async function generateImagePrompt(name: string) {
  try {
    const resp = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative assistant capable of generating interesting thumbnail descriptions for my notebooks. Your output will be used as input to the DALL-E API to create a thumbnail. I want the description to create an image that is minimalistic",
        },

        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook title, ${name}`,
        },
      ],
    });

    const data = await resp.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    // console.log(error);
    return "";
  }
}

export async function generateImage(description: string) {
  try {
    const resp = await openai.createImage({
      prompt: description,
      n: 1,
      size: "256x256",
    });

    const data = await resp.json();
    const image = data.data[0];
    return image as string;
  } catch (error) {
    // console.log(error);
    return undefined;
  }
}
