/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  export interface ProcessEnv {
    SUPABASE_URL: string,
    SUPABASE_KEY: string,
    TOKEN_SECRET: string,
    TOKEN_EXPIRATION: string,
  }
}
