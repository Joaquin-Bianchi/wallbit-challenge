import { useState, useEffect } from "react";

interface CustomAlertProps {
  messages: string[];
  onFinish: () => void;
}

export default function CustomAlert({ messages, onFinish }: CustomAlertProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => {
          setCurrentMessageIndex((prev) => prev + 1);
        }, 300); // Delay para la animación de salida
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      onFinish();
    }
  }, [currentMessageIndex, messages, onFinish]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentMessageIndex((prev) => prev + 1);
    }, 300); // Delay para la animación de salida
  };

  if (currentMessageIndex >= messages.length) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>
      <div className="bg-wallbit-card rounded-lg shadow-xl p-6 max-w-sm w-full z-50 transform transition-all duration-300 ease-in-out">
        <h2 className="text-xl font-bold mb-4 text-white">Atención</h2>
        <p className="mb-6 text-white">{messages[currentMessageIndex]}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
