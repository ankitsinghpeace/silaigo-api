interface MailParams {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
}
export declare function sendMail(params: MailParams): Promise<void>;
export {};
