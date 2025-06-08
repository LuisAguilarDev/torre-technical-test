## Expectations

- If you join our team, you’ll work as a full-stack product engineer. As such, we’ll evaluate your potential in **both front-end and back-end development.**
- You can use whatever languages or frameworks you feel more comfortable with.
- This test aims to understand your skills and strengths regarding:
  - Creativity
  - Project structure and architecture
  - Code readability and scalability
  - Separation of concerns
  - Quality and speed of the app
  - Usability, UI/UX
  - Attention to detail
  - Resourcefulness

POST https://torre.ai/api/entities/_searchStream
(searches for people and organizations using streams)

GET https://torre.ai/api/genome/bios/$username
(retrieves the genome information of any given $username)

WEB https://arda.torre.co/webjars/swagger-ui/index.html
(people search documentation)

WEB https://search.torre.co/webjars/swagger-ui/index.html
(job search documentation)

## Requirements:

- [ ] Build whatever you believe can be achievable with the resources provided. Be creative.
      _OR, for inspiration:_
  - [ ] Create a page allowing users to search for names and display a list of people matching a given name.
  - [ ] Additionally, you can implement one or more functionalities of your choice. These can include skill analysis, data processing and visualization, profile or job recommendations, trend analysis, summarization, or anything else you'd like to showcase.
- [ ] Ensure your solution is consistent and usable.

## Deliverables:

- Ultimately, you must provide links to the project/s over a version control system (git).
- Also, provide the production-ready environment/URL where we can test your implementation.
- Record a quick demo video (~5 minutes) explaining the project.
  - What was built? Why did you decide to do so?
  - How does the project structure and architecture look?
  - Is there something you'd like to improve?
- Regarding LLM/AI usage: Send all the prompts you used to build this.
  - Send only the prompts, not their replies.
  - For each prompt, specify each tool and model you've used.
  - We suggest you document and commit them directly in the repository. Examples:
    > **Ask the LLM to make the main CTA blue**
    > Tool: Cursor
    > Model: Gemini-1.0-flash
    > Prompt: Update the styling of the primary call-to-action button to have a blue background color that stands out visually. Use a medium or bold blue like #1E90FF. Ensure the text remains readable and the style is consistent across all themes.
    > **Ask the LLM to debug and fix an error.**
    > Tool: ChatGPT
    > Model: GPT-4o
    > Prompt: I'm encountering a 400 Bad Request error when making a POST request to Firestore’s Write endpoint:
    > POST https://firestore.googleapis.com/google.firestore.v1.Firestore/Write/channel...
    >
    > Help me:
    >
    > - Identify the likely root cause of this error
    > - Suggest actionable fixes (with examples if possible)
    > - Offer multiple diagnostic angles (e.g., malformed payload, auth issues, wrong endpoint usage, etc.)
    >
    > Let me know if you need the full request payload or headers.
- Optionally, send any other valuable materials, such as documentation, diagrams, screenshots, etc.

1. Career Path Navigator: How do a person reach fron Iternship -> Senior Software Developer
2. Skill Gap Analyzer(Tutor): Compare genomes by evaluating the diffs and proposing courses
