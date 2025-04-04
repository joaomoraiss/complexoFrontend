import { useEffect } from "react";

const ChatbotLoader = () => {
  useEffect(() => {
    // Se já existir o script, não carregar novamente
    if (document.getElementById("chatling-embed-script")) return;

    // Definir a configuração antes de carregar o script
    window.chtlConfig = { chatbotId: "1248536282" };

    // Criar o script
    const script = document.createElement("script");
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.setAttribute("data-id", "1248536282");
    script.id = "chatling-embed-script";

    // Adicionar ao body
    document.body.appendChild(script);
    
    // Opcional: Log para verificar se foi carregado
    script.onload = () => console.log("Chatling carregado!");
    script.onerror = () => console.error("Erro ao carregar o Chatling!");
  }, []);

  return null;
};

export default ChatbotLoader;
