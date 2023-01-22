import axios from 'axios';

// Use axios to make a request to the OpenAI API
const apiUrl = "https://api.openai.com/v1/edits";

export async function aiResponse(apiKey: string | undefined, input: any) {
    const response = await axios.post(apiUrl, {
        model: "text-davinci-edit-001",
        input: input,
        instruction: "refactor the code and then add tests by using unittest library",
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    }).then(res => {
        return res.data.choices[0].text;
    });
    return response;
    // Extract the generated text from the API response
}
