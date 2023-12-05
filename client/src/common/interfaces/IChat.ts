export interface IChat {
    role: "user" | "assistant" | "system";
    content: string;
}