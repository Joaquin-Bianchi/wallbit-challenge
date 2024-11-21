import { Calendar, Package2, DollarSign } from "lucide-react";

interface CartStatsProps {
  totalItems: number;
  totalCost: number;
  createdAt: Date;
}

function CartStats({ totalItems, totalCost, createdAt }: CartStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-wallbit-dark p-4 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2 text-wallbit-blue mb-1">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Fecha de creación</span>
        </div>
        <p className="text-lg font-semibold text-white">
          {createdAt.toLocaleDateString()}
        </p>
      </div>

      <div className="bg-wallbit-dark p-4 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-2 text-wallbit-blue mb-1">
          <Package2 className="w-4 h-4" />
          <span className="text-sm font-medium">Cantidad de items</span>
        </div>
        <p className="text-lg font-semibold text-white">{totalItems}</p>
      </div>

      <div className="bg-wallbit-dark p-4 rounded-lg border border-gray-700">
        <div className="flex items-center space-x-0.5 text-wallbit-blue mb-1">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm font-medium">SubTotal</span>
        </div>
        <p className="text-lg font-semibold text-white">
          ${totalCost.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default CartStats;

