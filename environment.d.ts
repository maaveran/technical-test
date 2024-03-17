declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'pre-production' | 'production';
    TSPORT: string;
    STATIC_AUTH: string;
  }
}
  