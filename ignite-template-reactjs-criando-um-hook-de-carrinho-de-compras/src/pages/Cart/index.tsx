import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';

import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount, sendOrder } = useCart();

  // const cartFormatted = cart.map(product => ({
  //   // TODO
  // }))
  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += (product.price * product.amount)

        return sumTotal; 
      }, 0)
    )

  async function handleProductIncrement(product: Product) {
    await updateProductAmount({ productId: product.id, amount: product.amount + 1})
  }

  async function handleProductDecrement(product: Product) {
    await updateProductAmount({ productId: product.id, amount: product.amount - 1})
  }

  async function handleRemoveProduct(productId: number) {
    await removeProduct(productId)
  }

  async function handleSendOrder() { 
    sendOrder()
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {
            cart.map(x => {
              return (
                <tr data-testid="product" key={x.id}>
                  <td>
                    <img src={x.image} alt="Tênis de Caminhada Leve Confortável" />
                  </td>
                  <td>
                    <strong>Tênis de Caminhada Leve Confortável</strong>
                    <span>{formatPrice(x.price)}</span>
                  </td>
                  <td>
                    <div>
                      <button
                        type="button"
                        data-testid="decrement-product"
                        disabled={x.amount <= 1}
                        onClick={() => handleProductDecrement(x)}
                      >
                        <MdRemoveCircleOutline size={20} />
                      </button>
                      <input
                        type="text"
                        data-testid="product-amount"
                        readOnly
                        value={isNaN(x.amount) ? 0 : x.amount}
                      />
                      <button
                        type="button"
                        data-testid="increment-product"
                        onClick={() => handleProductIncrement(x)}
                      >
                        <MdAddCircleOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{formatPrice(x.price)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={() => handleRemoveProduct(x.id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </ProductTable>

      <footer>
        <button type="button" onClick={handleSendOrder}>Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong> {total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
