import { Trash2 } from "lucide-react";
import { CartItem } from "../cart.interface";

interface CartTableProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
}

function CartTable({ items, onRemove }: CartTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full mt-6">
        <thead>
          <tr className="bg-wallbit-dark border-b border-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Producto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Cantidad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {items.map((item) => (
            <tr key={item.product.id} className="hover:bg-wallbit-card-hover">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-12 h-12 object-contain rounded bg-white p-1"
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-200">
                      {item.product.title}
                    </div>
                    <div className="text-sm text-wallbit-blue">
                      ID: {item.product.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200">
                  ${item.product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200">{item.quantity}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-200">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;
