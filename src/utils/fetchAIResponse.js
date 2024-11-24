import axios from 'axios';

// Helper function to call the OpenAI API
export const fetchAIResponse = async (apiMessages) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Use gpt-4 if needed
                messages: apiMessages,
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        //console.log("AI response:", response.data.choices[0].message.content);        

        //return response.data.choices[0].message.content;
        return {
            content: response.data.choices[0].message.content,
            id: response.data.id,
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        throw new Error("Unable to fetch AI response.");
    }
};
