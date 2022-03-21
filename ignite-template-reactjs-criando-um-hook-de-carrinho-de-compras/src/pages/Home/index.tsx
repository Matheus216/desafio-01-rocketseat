import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = (productId:number):number => { 
    return cart.find(z => z.id === productId)?.amount || 0;
  }

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('products')

      setProducts(data)
    }

    loadProducts();
  }, []);

  async function handleAddProduct(id: number) {
    await addProduct(id)
  }

  return (
    <ProductList>
      {
        products.map(x => {
          return (
            <li key={x.id}>
              <img src={x.image} />
              <strong>{x.title}</strong>
              <span>{formatPrice(x.price)}</span>
              <button
                type="button"
                data-testid="add-product-button"
                onClick={() => handleAddProduct(x.id)}
              >
                <div data-testid="cart-product-quantity">
                  <MdAddShoppingCart size={16} color="#FFF" />
                  {cartItemsAmount(x.id)}
                </div>

                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          )
        })
      }
    </ProductList>
  );
};

export default Home;
