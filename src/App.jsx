import { useEffect, useState } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import Footer from './components/Footer'
import { guitars } from './db'

//Max and min amount of items in shopping cart
const MAX_ITEMS = 5
const MIN_ITEMS = 1

function App() {
	const [cart, setCart] = useState(
		JSON.parse(localStorage.getItem('shoppingCart')) ?? []
	)

	useEffect(() => {
		localStorage.setItem('shoppingCart', JSON.stringify(cart))
	}, [cart])

	function handleShoppingCart(item) {
		const itemExist = cart.findIndex(guitar => guitar.id === item.id)

		if (itemExist >= 0) {
			const updatedCart = [...cart]
			updatedCart[itemExist].amount++
			setCart(updatedCart)
		} else {
			item.amount = 1
			setCart([...cart, item])
		}
	}

	function handleDeleteItem(id) {
		setCart(prevState => prevState.filter(item => item.id !== id))
	}

	function handleIncreaseAmount(id) {
		const updatedCart = cart.map(guitar => {
			if (guitar.id === id && guitar.amount < MAX_ITEMS) {
				return { ...guitar, amount: guitar.amount + 1 }
			}
			return guitar
		})

		setCart(updatedCart)
	}

	function handleRemoveAmount(id) {
		const updatedCart = cart.map(guitar => {
			if (guitar.id === id && guitar.amount > MIN_ITEMS) {
				return { ...guitar, amount: guitar.amount - 1 }
			}
			return guitar
		})

		setCart(updatedCart)
	}

	function clearCart() {
		setCart([])
	}

	return (
		<>
			<Header
				cart={cart}
				handleDeleteItem={handleDeleteItem}
				handleIncreaseAmount={handleIncreaseAmount}
				handleRemoveAmount={handleRemoveAmount}
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
