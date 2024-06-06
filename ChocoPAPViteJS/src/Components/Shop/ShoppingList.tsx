import { useState } from 'react';
import { prdList } from '../../Datas/PrdList';
import { Product } from './Products/Product';


import './ShoppingList.scss';


export const ShoppingList = () => {
  return (
    <section id="ContenuPrincipal">
      <section className="row m-0">
        <div id="selectProduits" className="col-5 col-lg-3"></div>
        <div id="lstProduits" className="col-7 col-lg-9">
            {prdList.map(({ idArticle, urlImg, titleArticle, ratingArticle, priceArticle }) => (
                    <div key={idArticle}>
                        <Product
                          idArticle={idArticle}
                          urlImg={urlImg}
                          titleArticle={titleArticle}
                          ratingArticle={ratingArticle}
                          priceArticle={priceArticle}
                        />
                    </div>
                ))
            }
        </div>
      </section>
    </section>
  );
};
