const baseUrl =
  process.env._NODE_ENV === "production"
    ? "https://deployment-url.now.sh"
    : "http://localhost:3000";

export default baseUrl;
