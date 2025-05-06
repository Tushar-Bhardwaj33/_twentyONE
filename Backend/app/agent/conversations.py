from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from datetime import datetime, timezone

class ConversationSession:
    def __init__(self, agent_executor, thread_id="default", system_prompt=None, max_history=10):
        self.agent_executor = agent_executor
        self.thread_id = thread_id
        self.max_history = max_history
        self.messages = []

        if system_prompt:
            self.set_system_prompt(system_prompt)

    def set_system_prompt(self, prompt):
        self.messages = [SystemMessage(content=prompt)]

    def append_user_message(self, content):
        self.messages.append(HumanMessage(content=content))

    def append_ai_message(self, content, sources=None):
        metadata = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "sources": sources or ["internal_knowledge"]
        }
        self.messages.append(AIMessage(content=content, metadata=metadata))

    def truncate_history(self):
        if len(self.messages) > self.max_history:
            self.messages = [self.messages[0]] + self.messages[-(self.max_history - 1):]

    def run(self, user_input):
        self.append_user_message(user_input)

        full_response = []
        config = {"configurable": {"thread_id": self.thread_id}}
        try:
            for step in self.agent_executor.stream(
                {"messages": self.messages},
                config,
                stream_mode="values"
            ):
                chunk = step["messages"][-1].content
                print(chunk, end="", flush=True)
                full_response.append(chunk)

            self.append_ai_message("".join(full_response))
            self.truncate_history()

        except Exception as e:
            print(f"\n⚠️ Error: {str(e)}")
            self.append_ai_message("Let me try that again...")


# Example usage
def main():
    from Backend.src.agent.my_agent_initializer import TwentyONE

    SYSTEM_PROMPT = """You are TwentyONE — a world-class AI meeting assistant designed to deliver clarity, insight, and productivity at scale.

**Core Capabilities:**
1. Meeting summarization with action items
2. Decision tracking
3. Context-aware follow-ups
4. Multilingual support (auto-detect)

**Style Guide:**
- Professional yet approachable
- Bullet points for complex information
- Emoji sparingly (max 1 per message) ✨

**Few-Shot Examples:**

User: "Summarize the key decisions from this engineering sync"
AI: '''Key Decisions:
• Approved migration to Kubernetes (target: Q3)
• Backend team will prototype new API by Friday
• Action: @Lisa to share cost estimates by EOD'''

User: "What's pending from marketing?"
AI: '''Pending Items:
1. Campaign assets review (due: tomorrow)
2. Budget approval from Finance
3. Action: @Raj to confirm influencer contracts'''

User: "Translate this to French"
AI: '''Je traduis cela maintenant...'''

User: "Who disagreed about the timeline?"
AI: '''@Alex expressed concerns about the QA phase duration. Alternative proposal: extend deadline by 1 week.'''
"""

    session = ConversationSession(TwentyONE, thread_id="aaff", system_prompt=SYSTEM_PROMPT)

    try:
        while True:
            user_input = input("\nAsk TwentyONE: ")
            session.run(user_input)
    except KeyboardInterrupt:
        print("\nSession saved. Goodbye!")


if __name__ == "__main__":
    main()
