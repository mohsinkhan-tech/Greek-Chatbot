import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendMessageToAI = async (model, message) => {
  const response = await axios.post(`${API_BASE_URL}api/chat`, {
    model,
    message,
  });

  return response.data.reply;
};
