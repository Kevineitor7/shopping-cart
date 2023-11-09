import { useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import { ShopContext } from '/home/kevineitor/repos/shopping-cart/src/App.jsx';
import '/home/kevineitor/repos/shopping-cart/src/components/ProductInfo/ProductInfo.css'
import '/home/kevineitor/repos/shopping-cart/src/App.css'

export default function ProductInfo() {

    const { product, quantity, setCart, cart,
            setQuantity, setSubtotal, id, setId, setActive } = useContext(ShopContext)

    function handleCart(product) {
        if (quantity == '' || quantity == 0) return
        setCart([...cart, {id: id, product: product, qty: quantity}])
    }

    function handleQty(e) {
        setQuantity(Number(e.target.value))
    }

    useEffect(() => {
        setId(id + 1)
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
        {product &&
            <div className="product-info">
                <div className="product-info-container">
                    <img src={product.image} alt="aa" />
                    <div className="product-details">
                        <p className="details-title">{product.title}</p>
                        <p className="details-category">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        <p className="details-price">${product.price.toFixed(2)}</p>
                        <p className="details-description">{product.description}</p>
                        <div className="details-qty">
                            <label>Qty: <input onChange={handleQty} type="number"/></label>
                            <button onClick={() => handleCart(product)} className="add2cart">Add to cart</button>
                        </div>
                        <Link className='link' onClick={() => setActive('shop')} to="/shop">
                            <button className='back2shop-btn'>Back to shop</button>
                        </Link>
                    </div>
                </div>
            </div>
        }
        </>
    )
}