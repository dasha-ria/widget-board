declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TIBBER_API_KEY: string;
    }
  }
}

export {};
