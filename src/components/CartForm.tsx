import { FormEvent, useState } from "react";
import { Loader } from "lucide-react";

interface CartFormProps {
  onSubmit: (productId: number, quantity: number) => Promise<void>;
  loading: boolean;
}

function CartForm({ onSubmit, loading }: CartFormProps) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (productId && quantity) {
      onSubmit(parseInt(productId), parseInt(quantity));
      setProductId("");
      setQuantity("1");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 min-w-0">
        <label
          htmlFor="productId"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          ID del Producto
        </label>
        <input
          type="number"
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          min="1"
          required
          className="w-full px-4 py-2 bg-wallbit-dark border border-gray-700 rounded-md focus:ring-2 focus:ring-wallbit-blue focus:border-wallbit-blue text-white placeholder-gray-500"
          placeholder="Ingresar ID del Producto"
        />
      </div>

      <div className="w-full sm:w-32">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Cantidad
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
          className="w-full px-4 py-2 bg-wallbit-dark border border-gray-700 rounded-md focus:ring-2 focus:ring-wallbit-blue focus:border-wallbit-blue text-white"
        />
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-6 py-2 bg-wallbit-blue text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-wallbit-blue focus:ring-offset-2 focus:ring-offset-wallbit-card disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>...</span>
            </>
          ) : (
            <span>Agregar al Carrito</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default CartForm;
