import { useContext } from "react";
import { CartContext } from "../CartFilled/CartContext.tsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faHeart as AsideIcon } from '@fortawesome/free-solid-svg-icons';
import "./CartFilled.css";

export const CartFilled = () =>
    {

        const { items, addItemToCart, removeItemFromCart } = useContext(CartContext);

        if (!addItemToCart || !removeItemFromCart) {
            throw new Error("addItemToCart or removeItemFromCart is not defined in the context");
        }

        const onQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>, item: any)=> {
            const newQuantity = parseInt(event.currentTarget.value);
            addItemToCart(item.id, newQuantity - item.quantity);
        };

        const calculateItemPrice = (item: any) => {
            return item.price * item.quantity;
        };

        const calculateTotalPrice = () => {
            return items.reduce((total, item) => total + item.price * item.quantity, 0);
        };
    
        return (

            <div className="container">
            <div className="row">
                <section className="reductions">
                        <div className="cardReductions">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group"> <label>Un coupon ?</label>
                                            <div className="input-group"> 
                                                <input type="text" className="form-control coupon" name="" placeholder="N° Coupon" />
                                                <span className="input-group-append">
                                                    <button type="submit" className="ajouter" title="Ajouter un coupon de réduction">Ajouter</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </section>
                    <section className="productlist">
                        <div className="productlistCard">
                            <div className="table-responsive">
                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted" >
                                            <tr className="tblTitle">
                                                <th className = "colProduct" scope="col">Produit</th>
                                                <th className = "colQuantity" scope="col">Quantité</th>
                                                <th className = "colPrice" scope="col">Prix</th>
                                                <th className = "colRetired" scope="col"></th>
                                            </tr>
                                    </thead>
                                    {items.map((item) => (
                                        <>
                                        <tbody key={item.id}>
                                            <tr>
                                                <td>
                                                    <figure className="itemside align-items-center">
                                                        <div className="aside"><img title={item.textAltImg} src={item.urlImg} className="img-sm" /></div>
                                                        <figcaption className="info"> 
                                                            <a href="#" className="itemtitle text-dark" data-abc="true">{item.name}</a>
                                                            <p className="text-muted small">Format: <br /> Sachet</p>
                                                        </figcaption>
                                                    </figure>
                                                </td>
                                                <td> <select 
                                                        title="Quantité de produit dans le panier"
                                                        name="Quantité" 
                                                        className="form-control"
                                                        defaultValue = {item.quantity}
                                                        onChange={(event) => onQuantityChange(event, item)}
                                                    >
                                                        {[...Array(10).keys()].map((num) => (
                                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                        ))}
                                                    </select> 
                                                </td>
                                                <td>
                                                    <div className="price-wrap"> 
                                                        <var className="price">{calculateItemPrice(item)} €</var> 
                                                        <small className="text-muted"> {item.price} € chacun </small>
                                                    </div>
                                                </td>
                                                <td className="text-right d-none d-md-block">
                                                    <a  
                                                        data-original-title="Mettre de côté"
                                                        title="Mettre de côté" 
                                                        href="" 
                                                        className="btn btn-light" 
                                                        data-toggle="tooltip" 
                                                        data-abc="true"
                                                    >
                                                        <FontAwesomeIcon id="AsideIcon" icon={AsideIcon}/>
                                                    </a>
                                                    <button type="submit" className="ajouter" onClick={() => removeItemFromCart(item.id)}>
                                                        Retirer
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </>
                                    ))
                                }
                                </table>
                            </div>
                        </div>
                    </section>
                    <section className="paiement" >
                        <div className="paiementCard">
                            <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>Prix total : </dt>
                                    <dd className="text-right">
                                        &nbsp;{calculateTotalPrice()} €
                                    </dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Réduction : </dt>
                                    <dd className="text-right text-danger">
                                        &nbsp;0.00 €
                                    </dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Total : </dt>
                                    <dd className="text-right text-dark">
                                        <strong>&nbsp;0.00 €</strong>
                                    </dd>
                                </dl>
                                <hr /> 
                                <button type="submit" className="ajouter">Payer</button>
                                <button type="submit" className="retour">
                                    <Link to={`/Boutique`}>
                                        Poursuivre mes achats
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
    );
};