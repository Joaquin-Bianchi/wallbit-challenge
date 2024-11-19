import { useState, useEffect } from "react";
import { Package, ShoppingCart } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import CartForm from "./components/CartForm";
import CartTable from "./components/CartTable";
import CartStats from "./components/CartStats";
import { CartItem, Product } from "./cart.interface";
import TotalOrder from "./components/TotalOrder";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = saved ? JSON.parse(saved) : [];
    return initialValue;
  });
  const [createdAt] = useState<Date>(() => {
    const saved = localStorage.getItem("cartCreatedAt");
    return saved ? new Date(saved) : new Date();
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    if (!localStorage.getItem("cartCreatedAt")) {
      localStorage.setItem("cartCreatedAt", createdAt.toISOString());
    }
  }, [cartItems, createdAt]);

  const addToCart = async (productId: number, quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (!response.ok) throw new Error("Product not found");

      const product: Product = await response.json();
      const existingItem = cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
        toast.success("Cantidad Actulizada");
      } else {
        setCartItems([...cartItems, { product, quantity }]);
        toast.success("Producto añadido al carrito");
      }
    } catch (error) {
      toast.error("Error: Producto no encontrado");
      console.error("Error fetching :", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
    toast.success("Producto eliminado del carrito!");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="min-h-screen bg-wallbit-dark ">
        <header className="bg-wallbit-card shadow-lg pb-4 pt-6 mb-8 mt">
          <div className="container mx-auto flex items-center justify-between">
            <a href="https://wallbit.io/" target="_blank">
              <div className="flex items-baseline gap-2  ">
                <img
                  src="logo.png"
                  alt="Wallbit Logo"
                  width={180}
                  height={80}
                  className=""
                />
                <h1 className="text-xl font-bold text-wallbit-blue ">Merch</h1>
              </div>
            </a>
            <div>
              <a
                href="https://app.wallbit.io/sign-up"
                target="_blank"
                className="px-4 py-2 rounded-lg font-bold bg-white text-black"
              >
                Obten tu cuenta en EE.UU
              </a>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4">
          <div className="grid gap-8">
            <div className="bg-wallbit-card rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Package className="w-5 h-5 text-wallbit-blue" />
                <h2 className="text-xl font-semibold text-white">
                  Agregar Productos
                </h2>
              </div>
              <CartForm onSubmit={addToCart} loading={loading} />
            </div>

            <div className="bg-wallbit-card rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-wallbit-blue" />
                <h2 className="text-xl font-semibold text-white">Carrito</h2>
              </div>

              {cartItems.length > 0 ? (
                <>
                  <CartStats
                    totalItems={totalItems}
                    totalCost={totalCost}
                    createdAt={createdAt}
                  />
                  <CartTable items={cartItems} onRemove={removeFromCart} />
                </>
              ) : (
                <div className="flex flex-col justify-center text-center py-12 text-gray-400">
                  <div>
                    <img
                      className="m-auto"
                      width={230}
                      height={80}
                      src="empty.png"
                      alt=""
                    />
                    <p className="text-sm font-medium text-gray-400">
                      No agregaste nada al carrito todavia. Agrega los productos
                      usando los IDs que obviamente ya sabes!
                    </p>
                  </div>
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <TotalOrder totalCost={totalCost}></TotalOrder>
            )}
          </div>
        </main>
        <footer className="pt-8 flex justify-center">
          <div className="text-white text-sm mb-4 flex gap-1">
            <p>Desarrolado por </p>

            <a
              className="text-wallbit-blue hover:underline"
              href="https://joaquin-bianchi-portfolio.vercel.app/"
              target="_blank"
            >
              Joaquin Bianchi
            </a>
            <img src="tuki.webp" alt="Wallbit Logo" className="w-5 h-5 ml-1" />
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
