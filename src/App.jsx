import { useState, useEffect, createContext } from 'react'
import './App.css'
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

export const ShopContext = createContext(null);

function App() {

  const [products, setProducts] = useState('')
  const [allProducts, setAllProducts] = useState('')
  const [product, setProduct] = useState('')
  const [categories, setCategories] = useState('')
  const [id, setId] = useState(0)
  const [cart, setCart] = useState([])
  const [quantity, setQuantity] = useState('')
  const [subtotal, setSubtotal] = useState(0)
  const [active, setActive] = useState('home')
  const [error, setError] = useState(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchingAllProducts() {
      try {    
          const response = await fetch(
              `https://fakestoreapi.com/products`, 
              {mode:'cors'}
              )
          const data = await response.json()
          setProducts(data)
          setAllProducts(data)
      }
      catch(err) {
          setError(err)
      }
   }
   fetchingAllProducts()
   navigate('/')
  }, [])

  useEffect(() => {
    async function fetchingCategories() {
      try {    
          const response = await fetch(
              `https://fakestoreapi.com/products/categories`, 
              {mode:'cors'}
              )
          const data = await response.json()
          setCategories(data)
      }
      catch(err) {
          setError(err)
      }
   }
   fetchingCategories()
  }, [])

  {error && <div className='home'>oops... {error}</div>}

  return (
    <>
      <div className='home'>
        <div className="header">
          <span>touché</span>
          <nav>
            <ul>
              <li>
                <Link 
                  className={`link ${active == 'home' ? 'active' : ''}`} 
                  onClick={() => setActive('home')} 
                  to="/">
                    Home
                </Link>
              </li>
              <li>
                <Link 
                  className={`link ${active == 'shop' ? 'active' : ''}`} 
                  onClick={() => setActive('shop')} 
                  to="/shop">
                    Shop
                </Link>
              </li>
              <li>
                <Link 
                  className={`link ${active == 'cart' ? 'active' : ''}`} 
                  onClick={() => setActive('cart')} 
                  to="/cart">
                    Cart 
                    <div className="header-subtotal">${subtotal.toFixed(2)}</div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <ShopContext.Provider value={{products, setProducts, allProducts, product, setProduct, categories,
          cart, setCart, quantity, setQuantity, subtotal, setSubtotal, id, setId, setActive}}>
          <TransitionGroup>
            <SwitchTransition>
              <CSSTransition unmountOnExit timeout={500} classNames='page' key={location.pathname}>
                <Outlet/>
              </CSSTransition>
            </SwitchTransition>
          </TransitionGroup>
        </ShopContext.Provider>
        <div className="footer">
          &copy; Kevin Campa
        </div>
      </div>      
    </>
  )
}

export default App
