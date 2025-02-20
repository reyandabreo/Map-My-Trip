import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Function to clean Markdown formatting and extract JSON
const cleanResponse = (text) => {
  // Remove Markdown code block syntax (e.g., ```json and ```)
  const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return cleanedText;
};

export async function POST(request) {
  try {
    // Parse the request body
    const { budget, people, startDate, endDate, place } = await request.json();
    console.log("Received request body:", { budget, people, startDate, endDate, place });

    // Validate the request body
    if (!budget || !people || !startDate || !endDate || !place) {
      throw new Error("Missing required fields in the request body.");
    }
    // Generate the prompt for the Google API
    const prompt = `Create a detailed travel itinerary for ${people} people traveling to ${place} from ${startDate} to ${endDate} with a budget of ${budget}. Return the response as a JSON array of days, where each day contains a list of activities.`;
    console.log("Generated prompt:", prompt);

    // Call the Google API to generate the itinerary
    const result = await model.generateContent(prompt);
    console.log("Google API response:", result);

    // Clean the response to remove Markdown formatting
    const cleanedResponse = cleanResponse(result.response.text());
    console.log("Cleaned response:", cleanedResponse);

    // Parse the cleaned response into JSON
    const itinerary = JSON.parse(cleanedResponse);
    console.log("Parsed itinerary:", itinerary);

    // Return the itinerary as a JSON response
    return new Response(JSON.stringify({ itinerary }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/auto-create:", error);

    // Return a 500 error with the error message
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}