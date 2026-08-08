interface DDAgentConfig {
    service: string;
    env: string;
}
interface MongoConfig {
    user: string;
    password: string;
    host: string;
    db: string;
}
interface Config {
    nodeEnv: string;
    appPort: number;
    ddagent: DDAgentConfig;
    mongo: MongoConfig;
    seedData: boolean;
    razorpay: RazorpayConfig;
}
interface RazorpayConfig {
    keyId: string;
    keySecret: string;
}
declare const _default: () => Config;
export default _default;
