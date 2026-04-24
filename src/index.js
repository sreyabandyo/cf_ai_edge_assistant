export default {
  async fetch(request, env) {
    console.log("ENV:", env); // debug

    const url = new URL(request.url);

    // Handle AI chat
    if (url.pathname === "/chat" && request.method === "POST") {
      try {
        const { message } = await request.json();

        const response = await env.AI.run(
          "@cf/meta/llama-3.1-8b-instruct",
          {
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: message }
            ]
          }
        );

        // Handle different response shapes
        const reply =
          response.response ||
          response.result?.response ||
          "No response from AI";

        return new Response(
          JSON.stringify({ reply }),
          {
            headers: { "Content-Type": "application/json" }
          }
        );

      } catch (err) {
        console.log("ERROR:", err);

        return new Response(
          JSON.stringify({ error: err.message }),
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      }
    }

    // Serve your frontend (from /public)
    return new Response(
      await (await fetch("http://localhost:8787/index.html")).text(),
      {
        headers: { "Content-Type": "text/html" }
      }
    );
  }
};