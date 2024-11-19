"use client";

import { useState } from "react";
import { ChevronRight, CreditCard, DollarSign, WalletIcon } from "lucide-react";
import CustomAlert from "./CustomAlert"; // Asegúrate de que la ruta sea correcta
import toast from "react-hot-toast";

interface TotalOrderProps {
  totalCost: number;
}

function TotalOrder({ totalCost }: TotalOrderProps) {
  const otherCardsCost = totalCost * 1.65;

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const messages = [
    "¿Estás seguro que queres pagar mas? 🧐",
    "Wallbit también es una tarjeta, ¿sabias? 🤔",
    "Pensalo bien, ¡Wallbit es la que va! ✨",
    "Esto puede tardar más, ¿eh? ⏳",
    "Wallbit ofrece transferencias sin costo o con una comisión mínima",
    "No digas que no te lo advertí... 🙄",
    "Última oportunidad para cambiar de opinión... ¡Wallbit! 🚀",
  ];

  const handleOtherCardPayment = () => {
    setIsAlertVisible(true);
  };

  const handlePayWithWallbit = () => {
    toast(
      () => (
        <div className="flex items-center  bg-white p-4 rounded-lg ">
          <img
            src="tuki.webp" // Reemplaza con la ruta de tu imagen
            alt="Custom Icon"
            className="w-12 h-12 object-cover r"
          />
        </div>
      ),
      {
        duration: 4000,
        position: "top-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      }
    );
  };

  const handleAlertFinish = () => {
    setIsAlertVisible(false);
    console.log("Alerta finalizada");
    toast.error("Pagaste mas caro por no usar wallbit");
  };

  return (
    <div className="bg-wallbit-card rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4 ">
        <WalletIcon className="w-5 h-5 text-wallbit-blue" />
        <h2 className="text-xl font-semibold text-white">Resumen de compra</h2>
      </div>

      <div className="border-gray-700 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-green-500" />
              <p className="text-sm text-gray-400">
                Pago con tu cuenta en USA de Wallbit
              </p>
            </div>
            <p className="text-lg font-semibold text-white">
              ${totalCost.toFixed(2)} USD
            </p>
          </div>
          <div>
            <div className="flex items-center space-x-1 mb-1">
              <DollarSign className="w-4 h-4 text-red-400" />
              <p className="text-sm text-gray-400">
                Otras (+65% Dolar Tarjeta)
              </p>
            </div>
            <p className="text-lg font-semibold text-red-400">
              ${otherCardsCost.toFixed(2)} USD
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handlePayWithWallbit}
          className="bg-wallbit-dark text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-between w-full"
        >
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-wallbit-blue" />
            <span>Pagar con </span>
            <img
              src="favicon.png"
              alt="Wallbit Logo"
              className="w-5 h-5 ml-2 mr-1 object-contain"
            />
            <span className="font-medium"> Wallbit</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-between"
          onClick={handleOtherCardPayment}
        >
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Pagar con otra tarjeta
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Alerta personalizada */}
      {isAlertVisible && (
        <CustomAlert messages={messages} onFinish={handleAlertFinish} />
      )}
    </div>
  );
}

export default TotalOrder;
