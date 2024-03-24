import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { guitars } from './db'
import { useShoppingCart } from './hooks/useShoppingCart'

function App() {
	const {
		cart,
		handleShoppingCart,
		handleDeleteItem,
		handleIncreaseAmount,
		handleDecreaseAmount,
		clearCart
	} = useShoppingCart()

	return (
		<>
			<Header
				cart={cart}
				handleDeleteItem={handleDeleteItem}
				handleIncreaseAmount={handleIncreaseAmount}
				handleDecreaseAmount={handleDecreaseAmount}
				clearCart={clearCart}
			/>

			<main className='container-xl mt-5'>
				<h2 className='text-center'>Our Guitar Collection</h2>

				<div className='row mt-5'>
					{guitars.map(guitar => (
						<Guitar
							key={guitar.id}
							guitar={guitar}
							handleShoppingCart={handleShoppingCart}
						/>
					))}
				</div>
			</main>

			<Footer />
		</>
	)
}

export default App
