export default {
  async fetch(request, env) {
    try {
      if (request.method === "POST") {
        const { message } = await request.json();

        if (!env.AI) {
          return new Response(JSON.stringify({ error: "AI binding missing" }), {
            headers: { "Content-Type": "application/json" }
          });
        }

        const aiResponse = await env.AI.run(
          "@cf/meta/llama-3-8b-instruct",
          {
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: message }
            ]
          }
        );

        const reply =
          aiResponse?.response ||
          aiResponse?.result?.response ||
          JSON.stringify(aiResponse);

        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response("NEW VERSION WORKING");
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  },
};