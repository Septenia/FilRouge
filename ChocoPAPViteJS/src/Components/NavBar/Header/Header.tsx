import { useState, useContext, useEffect } from "react";

import logo from "../../../logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars as Hamburger, faCartShopping as CartIco,} from '@fortawesome/free-solid-svg-icons';

import { Link, useLocation } from "react-router-dom";

import { CartContext } from "../../Shop/CartFilled/CartContext";

export const Cart = ( ) => 
    {
      const { items } = useContext(CartContext);
      const initialValue = 0;
      const sumQuantity = items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        initialValue,
      );

      return (
        <>
          &nbsp;{sumQuantity} &nbsp;<FontAwesomeIcon id="panier" icon={CartIco} bounce className="panier"/>
        </ >
      );
    };

import "./Header.css"


const Logo = () => (
  <Link to={`/`}>
    <img id="logo" src={logo} className="App-logo" alt="logo" />
  </Link>

);

export const Burger = ( ) => 
  {
    return (
      <FontAwesomeIcon id="imenuToggle" icon={Hamburger}/>
    );
  };

export const Header = ( ) =>
  {
    const [isOpen, setOpen] = useState(false);
    const [isActive, setIsActive] = useState('home');
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;
      if (path === '/') {
          setIsActive('home');
      } else if (path === '/Boutique') {
          setIsActive('shop');
      } else if (path === '/Panier') {
          setIsActive('cart');
      }
  }, [location]);


    return (

      <header id="entetePrincipale">
        <section id="HMenu">
          <h1 className="accessibility">Menu Principal</h1>
          <p className="accessibility">
            <a
              href="#ContenuPrincipal"
              title="Accéder directement au contenu principal de cette page"
            >
              Passer le menu
            </a>
          </p>
  
          <Link to={`/`}><Logo /></Link>


          <button
            id="menuToggle"
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            title="Afficher/masquer le menu"
          >
            <Burger />
          </button>
            <nav
              role="navigation"
              id="navbarSupportedContent"
              className={isOpen ? '' : 'hide'}
            >
              <ul className="navbar-nav ">
                <Link to={`/`} onClick={() => setOpen((prev) => !prev)}>
                  <li 
                    className={ 
                      isActive === 'home' ?
                      'active nav-item text-style1' : 
                      'nav-item text-style1'
                    }
                  >
                    Accueil
                  </li>
                </Link>
                <Link to={`/Boutique`} onClick={() => setOpen((prev) => !prev)}>
                  <li
                    className={ 
                      isActive === 'shop' ?
                      'active nav-item text-style1' : 
                      'nav-item text-style1'
                    } 
                  >
                    Boutique
                  </li>
                </Link>
                <Link to={`/Panier`}onClick={() => setOpen((prev) => !prev)}>
                  <li
                      className={ 
                        isActive === 'cart' ?
                        'active nav-item panier' : 
                        'nav-item panier'
                      } 
                    >
                      <Cart />Panier
                    </li>
                </Link>
              </ul>
            </nav>
        </section>
      </header>
    );
  };

