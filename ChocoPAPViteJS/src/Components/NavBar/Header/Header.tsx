import { useState, useContext } from "react";

import logo from "../../../logo.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars as Hamburger, faCartShopping as CartIco,} from '@fortawesome/free-solid-svg-icons';

import { Link } from "react-router-dom";

import { CartContext } from "../../Shop/CartFilled/CartContext";

export const Cart = ( ) => 
    {
      const { items } = useContext(CartContext);

      return (
        <>
          &nbsp;{items.length} &nbsp;<FontAwesomeIcon id="panier" icon={CartIco} bounce className="panier"/>
        </ >
      );
    };

import "./Header.css"


const Logo = () => (
  <img id="logo" src={logo} className="App-logo" alt="logo" />
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
                  <li className="nav-item text-style1">
                    Accueil
                  </li>
                </Link>
                <Link to={`/Boutique`} onClick={() => setOpen((prev) => !prev)}>
                  <li className="nav-item text-style1">
                    Boutique
                  </li>
                </Link>
                <li className="nav-item panier" onClick={() => setOpen((prev) => !prev)}>
                  <Link to={`/Panier`}><Cart />Panier</Link>
                </li>
              </ul>
            </nav>
        </section>
      </header>
    );
  };

