// On-device AI services using Chrome's built-in AI
export class OnDeviceAI {
  async summarize(text: string): Promise<string> {
    // TODO: Implement Summarizer API
    return text.substring(0, 100) + '...';
  }

  async generateTags(content: string): Promise<string[]> {
    // TODO: Implement Prompt API for tagging
    return ['placeholder'];
  }
}