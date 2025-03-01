import 'dotenv/config';

export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      geminiApiKey: process.env.GEMINI_API_KEY,
    },
  };
}; 