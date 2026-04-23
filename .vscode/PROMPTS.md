# PROMPTS.md

## System Prompt
You are a helpful assistant that explains concepts clearly and simply.

---

# User Prompt Example
Explain APIs simply

---

## How Prompts Are Used

The application sends prompts to the AI model using this structure:

- A **system prompt** to define behaviour
- A **user prompt** containing the user's input

Example (from code):

```json
{
    "messages": [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": "Explain APIs simply" }
    ]
}