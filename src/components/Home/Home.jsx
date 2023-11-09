import './Home.css'
import '/src/App.css'
import { Link } from "react-router-dom";
import { useEffect, useContext } from 'react'
import { ShopContext } from '/src/App.jsx';


export default function Home() {

    const { setActive } = useContext(ShopContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="intro">
                <div className='intro-content'>
                    <h2>Welcome to touché store</h2>
                    <Link className='link' onClick={() => setActive('shop')} to="/shop">
                        <button className='intro-btn'>See our inventory</button>
                    </Link>
                </div> 
            </div>
            <div className="info">
                <div className="info-content">
                    <img src='https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1600' alt='img'/>
                    <div className="info-text-btn">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                            Ratione nulla sed incidunt quaerat dolores similique, praesentium et nam. 
                            Totam voluptate dolores at minus culpa adipisci fuga doloremque aut corporis ullam.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, ut.
                        </p>
                        <Link className='link' onClick={() => setActive('shop')} to="/shop">
                            <button className="info-btn">Start shopping</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}