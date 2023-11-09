import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { ShopContext } from '/home/kevineitor/repos/shopping-cart/src/App.jsx';
import '/home/kevineitor/repos/shopping-cart/src/components/Cart/Cart.css'
import '/home/kevineitor/repos/shopping-cart/src/App.css'

export default function Cart() {

    const { cart, setCart, subtotal, setSubtotal, setProduct} = useContext(ShopContext)
    const [taxes, setTaxes] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (subtotal < 100) {
            setTaxes(subtotal * 0.06)
        }
        else if (subtotal >= 100 && subtotal < 500) {
            setTaxes(subtotal * 0.05)
        }
        else if (subtotal >= 500) {
            setTaxes(subtotal * 0.04)
        }
    }, [subtotal])

    useEffect(() => {
        setTotal(subtotal + taxes)
    }, [taxes])

    useEffect(() => {
        let sbt = 0 
        cart.map((item) => (
            sbt += item.product.price * item.qty        
        ))
        const timer = setTimeout(() => {
            setSubtotal(sbt)    
        }, 500)
        return () => clearTimeout(timer);
    }, [cart])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="cart">
                <h2>Cart</h2>
                <div className="cart-container">
                    <div className="cart-items">
                    {cart ? (
                        cart.map((item, index) => (
                            <div key={item + index} className="cart-item">
                                <img src={item.product.image} alt="aver" />
                                <div className="cart-item-info">
                                    <p className="cart-item-title">{item.product.title}</p>
                                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                                    <p className="cart-item-qty">Qty: {item.qty}</p>
                                    <div className="cart-item-options">
                                        <Link className='link' to="/product-info">
                                            <button onClick={() => setProduct(cart[index].product)} className="see-details-btn">See details</button>
                                        </Link>
                                        <button onClick={() => {
                                            setCart(cart.filter(i => i.id !== item.id))
                                        }} className="remove-item-btn">
                                            Remove from cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="cart-item">caaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                    )}
                    </div>
                    <div className="checkout">
                        <h3>Checkout</h3>
                        <div className="subtotal">
                            <p>Subtotal: </p>
                            <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="taxes">
                            <p>Taxes: </p>
                            <p>${taxes.toFixed(2)}</p>
                        </div>
                        <div className="total">
                            <p>Total: </p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <button className="checkout-btn">Pum</button>
                    </div>
                </div>
            </div>
        </>
    )
}