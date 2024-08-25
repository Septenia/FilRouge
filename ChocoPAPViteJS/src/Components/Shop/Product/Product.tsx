import "./Product.css";

import { Rating } from "../Rating/Rating";
import { DOMAttributes, FC, useContext, useState } from "react";
import { prdList } from '../../../Datas/prdList.ts';
import { CartContext } from "../CartFilled/CartContext.tsx";

export type ProductProps = {
  idArticle: number;
  urlImg: string ;
  titleArticle : string ;
  ratingArticle : number ;
  priceArticle : number ;
  available : boolean ;
  categories?: Array<string>;
}
  
function Exist({available}:{available : boolean}) {
  if (available) {
    return (
      <span>&nbsp;</span>
    );
  }
  return (
    <span className="card-text-exist">* Indisponible</span>
  );
}

export const Product: FC<ProductProps> = ({
  idArticle,
  urlImg,
  titleArticle,
  ratingArticle,
  priceArticle,
  available,
}) => {

      const [nbToAdd, setNbToAdd] = useState<number>(0);
      // const [prdCartListChange, setprdCartListChange] = useState<any[]>([]);

      const onNbToAddChange: DOMAttributes<HTMLInputElement>['onChange']  = (event) => {
        const newNbToAdd = event.currentTarget.valueAsNumber;
        setNbToAdd(newNbToAdd);
        console.log(nbToAdd);
      };

      // const {onAddedToCartValidation = (id: number) => {
      //   const newPrdCartList = prdList.map(product => product.idArticle === id ? 
      //     {...product, nbToAdd: nbToAdd } : product );
      //     setprdCartListChange(newPrdCartList);
      //     console.log(prdCartListChange);
      // }; 

      const { addItemToCart } = useContext(CartContext);

    {
      return (

        <div className="card">
          <img className="cardImg" src={urlImg} alt={`photo du ${titleArticle}`} title={`photo du ${titleArticle}`} />
          <h1 className="cardTitle">{titleArticle}</h1>
          <Exist available={available}></Exist>
          <p className="card-text-tarif">{priceArticle} €</p>
          <div className="card-text-rating">
            <Rating score={ratingArticle}></Rating>
          </div>

          <form
            className="formAjouter"
            action=""
            title="Ajouter l'article au panier"
          >
            <div className="group">
              <label htmlFor="nbArticles" className="d-block">
                <p className="BIP">{nbToAdd} article(s) ajoutés au panier'</p>
              </label>
              <input
                type="number"
                name="nbArticles"
                id="nbArticles"
                title="Nombre d'articles à ajouter"
                min="0"
                max="100"
                placeholder="0"
                required
                value={nbToAdd}
                onChange={onNbToAddChange}
              />
              <button 
                type="button" 
                className="btnAjouter" 
                onClick={() => addItemToCart(idArticle)}>
                  Ajouter au panier
              </button>
            </div>
          </form>
        </div>
      );
    };
};
