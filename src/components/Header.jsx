import { useMemo } from 'react'

const Header = ({
	cart,
	handleDeleteItem,
	handleIncreaseAmount,
	handleRemoveAmount,
	clearCart
}) => {
	const isEmpty = useMemo(() => cart.length === 0, [cart])
	const totalPayable = useMemo(
		() => cart.reduce((acc, item) => acc + item.amount * item.price, 0),
		[cart]
	)

	return (
		<header className='py-5 header'>
			<div className='container-xl'>
				<div className='row justify-content-center justify-content-md-between'>
					<div className='col-8 col-md-3'>
						<a href='index.html'>
							<img
								className='img-fluid'
								src='/img/logo.svg'
								alt='imagen logo'
							/>
						</a>
					</div>
					<nav className='col-md-6 a mt-5 d-flex align-items-start justify-content-end'>
						<div className='carrito'>
							<img
								className='img-fluid'
								src='/img/carrito.png'
								alt='imagen carrito'
							/>

							<div id='carrito' className='bg-white p-3'>
								{isEmpty ? (
									<p className='text-center'>Shopping Cart is Empty</p>
								) : (
									<>
										<table className='w-100 table'>
											<thead>
												<tr>
													<th>Image</th>
													<th>Name</th>
													<th>Price</th>
													<th>Quantity</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{cart.map(guitar => (
													<tr key={guitar.id}>
														<td>
															<img
																className='img-fluid'
																src={`/img/${guitar.image}.jpg`}
																alt='imagen guitarra'
															/>
														</td>
														<td>{guitar.name}</td>
														<td className='fw-bold'>${guitar.price}</td>
														<td className='flex align-items-start gap-4'>
															<button
																type='button'
																className='btn btn-dark'
																onClick={() => handleRemoveAmount(guitar.id)}
															>
																-
															</button>
															{guitar.amount}
															<button
																type='button'
																className='btn btn-dark'
																onClick={() => handleIncreaseAmount(guitar.id)}
															>
																+
															</button>
														</td>
														<td>
															<button
																className='btn btn-danger'
																type='button'
																onClick={() => handleDeleteItem(guitar.id)}
															>
																X
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
										<p className='text-end'>
											Total payable:{' '}
											<span className='fw-bold'>${totalPayable}</span>
										</p>
									</>
								)}

								<button
									className='btn btn-dark w-100 mt-3 p-2'
									onClick={clearCart}
								>
									Empty Cart
								</button>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header
