import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
	children: ReactNode;
}

interface UpdateProductAmount {
	productId: number;
	amount: number;
}

interface CartContextData {
	cart: Product[];
	addProduct: (productId: number) => Promise<boolean>;
	removeProduct: (productId: number) => void;
	updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
	sendMessage: (message: string, type: 'success' | 'error' | 'info') => void;
	sendOrder: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);
const localStorageKey = 'cart-products'

export function CartProvider({ children }: CartProviderProps): JSX.Element {
	const [cart, setCart] = useState<Product[]>(() => {
		const storagedCart = localStorage.getItem(localStorageKey)

		if (storagedCart) {
			return JSON.parse(storagedCart);
		}

		return [];
	});

	const addProduct = async (productId: number): Promise<boolean> => {
		try {
			const { data: product } = await api.get<Product>(`products/${productId}`)

			const isValid = await searchAndIncrementProductInCart(product)

			if (isValid) sendMessage('Produto incluído com sucesso!', 'success');

			return true;

		} catch (err) {
			sendMessage('Erro na adição do produto', 'error')
			return false;
		}
	};

	const removeProduct = (productId: number) => {
		try {
			const productRemoved = cart.filter(x => {
				if (x.id !== productId) {
					return x
				}
			})
			localStorageControl(productRemoved)
		} catch (err) {
			sendMessage('Erro na remoção do produto', 'error')
		}
	};

	const updateProductAmount = async ({
		productId,
		amount,
	}: UpdateProductAmount) => {
		try {
			const isValid = await verifyExistStockProduct(productId, amount)

			if (isValid) {
				const products = cart.map(x => {
					if (x.id === productId)
						x.amount = amount;
					return x
				})
				localStorageControl(products)
			}

		} catch (err) {
			sendMessage('Erro na alteração de quantidade do produto', 'error')
		}
	};

	const searchAndIncrementProductInCart = async (product: Product) => {
		const searched = cart.find(x => x.id === product.id)
		let newProducts: Product[]

		product.amount = 1

		const isValid = await verifyExistStockProduct(product.id, searched ? searched.amount + 1 : product.amount);

		if (isValid) {
			if (searched) {
				newProducts = cart.map(x => {
					if (x.id === product.id) {
						x.amount++
						return x
					} else {
						return x
					}
				})

				product.amount = searched.amount + 1

			} else {
				product.amount = 1;
				newProducts = [...cart, product]
			}

			localStorageControl(newProducts)
		}
		return isValid
	};

	const sendOrder = () => {
		setCart([])
		localStorage.clear()
		sendMessage('Pedido enviado com sucesso', 'success')
	}

	const verifyExistStockProduct = async (productId: number, amount: number): Promise<boolean> => {
		const { data: stock } = await api.get<Stock>(`stock/${productId}`)
		const isValid = stock.amount >= amount

		if (!isValid) {
			sendMessage('Quantidade solicitada fora de estoque', 'error')
			return false;
		}

		return true;
	};

	const sendMessage = (message: string, type: 'success' | 'error' | 'info') => {
		if (type === 'success')
			toast.success(message);
		else
			toast.error(message);
	}

	const localStorageControl = (products: Product[]) => {
		setCart(products)
		localStorage.setItem(localStorageKey, JSON.stringify(products))
	}

	return (
		<CartContext.Provider
			value={{ cart, addProduct, removeProduct, updateProductAmount, sendMessage, sendOrder }}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart(): CartContextData {
	const context = useContext(CartContext);

	return context;
}
