import { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { ShopContext } from '/src/App.jsx';
import './Shop.css'
import '/src/App.css'

export default function Shop() {

    const {products, setProducts, allProducts, setProduct, categories} = useContext(ShopContext)
    const [category, setCategory] = useState('')
    const [categoryIndex, setCategoryIndex] = useState()
    const [categoryProducts, setCategoryProducts] = useState('')
    const [input, setInput] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchPerCategory() {
          try {    
              const response = await fetch(
                  `https://fakestoreapi.com/products/category/${category}`, 
                  {mode:'cors'}
                  )
              const data = await response.json()
              setProducts(data)
              setCategoryProducts(data)
          }
          catch(err) {
              setError(err)
          }
       }

       async function fetchingAllProducts() {
        try {    
            const response = await fetch(
                `https://fakestoreapi.com/products`, 
                {mode:'cors'}
                )
            const data = await response.json()
            setProducts(data)
        }
        catch(err) {
            setError(err)
        }
    }

        {category && fetchPerCategory()}
        {!category && fetchingAllProducts()}
      
    }, [category])

    useEffect(() => {
        if (category) {
            if (input.length >= 1) {
                let categoryFiltered = categoryProducts.filter(
                    (product) => product.title.toLowerCase().includes(input.toLowerCase())
                )
                setProducts(categoryFiltered)
            }
            if (input == '') {
                setProducts(categoryProducts)
            }
        }
        else if (!category) {
            if (input.length >= 1) {
                let filtered = allProducts.filter(
                    (product) => product.title.toLowerCase().includes(input.toLowerCase())
                )
                setProducts(filtered)
            } 
            if (input == '') {
                setProducts(allProducts)
            }
        }
    }, [input])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleInput(e) {
        setInput(e.target.value)
    }

    function handleCategory(category, index) {
        setInput('')
        setCategory(category)
        setCategoryIndex(index)

        if (category == '' && index == '') {
            setCategoryIndex()
        }
    }

    {error && <div className='shop'>{error}</div>}

    return (
        <>
            <div className="shop">
                <h2>Kakaroto Shop</h2>
                <h3>Select a product to see details</h3>
                <div className="products">
                    <div className="categories">
                        <h3>Categories</h3>
                        <ul>
                            <li onClick={() => handleCategory('', '')}>All</li>
                        {categories ? (
                                categories.map((category, index) => (
                                    <li 
                                        key={category + index} 
                                        onClick={() => handleCategory(category, index)} 
                                        className={`category${index} ${index == categoryIndex ? 'active' : ''}`}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </li>
                                ))
                            ) : (
                                    <li>...</li>
                        )}
                        </ul>
                    </div>
                    <div className="catalog">
                        <div className="search-bar">
                            <span>Search</span>
                            <input onChange={(e) => handleInput(e)} value={input} type="text"/>
                        </div>
                        <div className="products-grid">
                            {products ? (
                                products.map((product, index) => (
                                    <div key={product + index} className="product">
                                        <img src={product.image} alt="img" />
                                        <p className="product-name">{product.title}</p>
                                        <p className="price">${product.price.toFixed(2)}</p>
                                        <div className="cart-details">
                                            <Link className='link' to="/product-info">
                                                <button onClick={() => setProduct(product)} className="see-details-btn">See details</button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                    <div className="product">...</div>
                            )}
                        </div>
                    </div>
                </div>                
            </div>
        </>
    )
}