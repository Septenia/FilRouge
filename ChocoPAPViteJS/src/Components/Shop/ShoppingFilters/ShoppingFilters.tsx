import { DOMAttributes, FC, useMemo, useState } from 'react';
import './ShoppingFilters.css';

import type { Categories } from '../../../Datas/categoriesList.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftRotate as ResetIco } from '@fortawesome/free-solid-svg-icons';
 
export const Reset = () => {
  return (
    <FontAwesomeIcon id="resetIco" icon={ResetIco} />
  );
};

type ShoppingFiltersCategories = Categories & {
  isChecked?: boolean;
}

export type ShoppingFiltersProps = {
  categoriesList: Array<ShoppingFiltersCategories>;
  onCategoriesChange: (selectedCategories: Array<string>) => void;
  onCheckboxAvailableChange: (availableSelection: Array<boolean>) => void;
  onMinChange: (minPrice: number) => void;
  onMaxChange: (maxPrice: number) => void;
  onScoreMinChange: (minNote:number) => void ;
  onScoreMaxChange: (maxNote:number) => void ;
}

export const ShoppingFilters: FC<ShoppingFiltersProps> = ({
  categoriesList,
  onCategoriesChange,
  onCheckboxAvailableChange,
  onMinChange,
  onMaxChange,
  onScoreMinChange,
  onScoreMaxChange,
}) => {

  // Catégories
  const [categories, setCategories] = useState<Array<ShoppingFiltersCategories>>(
    categoriesList.map(c => ({ ...c, isChecked: true }))
  );

  useMemo(() => {
    onCategoriesChange(
      categories.filter((category) => category.isChecked).map((category) => category.idCategory)
    );
  }, [categories])

  const onCheckboxCategoryChange: DOMAttributes<HTMLInputElement>['onChange'] = (event) => {
    setCategories(
      categories.map((category) => {
        if (category.idCategory === event.currentTarget.name) {
          return { ...category, isChecked: event.currentTarget.checked };
        }
        return category;
      }),
    );
  };

  // Toutes les Catégories
  const onAllCategoriesSelected = () => {
    setCategories(
      categories.map((category) => {
        return { ...category, isChecked: true }
      })
    );
  }

  // Aucune les Catégories
  const onNoCategorySelected = () => {
    setCategories(
      categories.map((category) => {
        return { ...category, isChecked: false }
      }),
    );
  }

  // Disponible / Indisponible
  const [selectedIsAvailable, setSelectedIsAvailable] = useState<boolean>(true);
  const [selectedIsNotAvailable, setSelectedIsNotAvailable] = useState<boolean>(true);

  useMemo(() => {
    const availableSelection = [];

    if (selectedIsAvailable) {
      availableSelection.push(true);
    }

    if (selectedIsNotAvailable) {
      availableSelection.push(false);
    }

  onCheckboxAvailableChange(availableSelection)
  }, [selectedIsAvailable, selectedIsNotAvailable]);

  const onCheckboxIsAvailableChange: DOMAttributes<HTMLInputElement>['onChange'] = () => {
    setSelectedIsAvailable(!selectedIsAvailable);
  };

  const onCheckboxIsNotAvailableChange: DOMAttributes<HTMLInputElement>['onChange'] = () => {
    setSelectedIsNotAvailable(!selectedIsNotAvailable);
  };

  // Prix
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const onPriceMinChange: DOMAttributes<HTMLInputElement>['onChange'] = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = event.currentTarget.valueAsNumber;
    setMinPrice(newMinPrice);
    onMinChange(newMinPrice);
  };

  const onPriceMaxChange: DOMAttributes<HTMLInputElement>['onChange'] = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = event.currentTarget.valueAsNumber;
    setMaxPrice(newMaxPrice);
    onMaxChange(newMaxPrice);
  };

  const onPricesReset = () => {
    setMinPrice(0);
    onMinChange(0);
    setMaxPrice(100);
    onMaxChange(100);
  };

  // Notes
  const [noteMin, setNoteMin] = useState(0);
  const [noteMax, setNoteMax] = useState(5);

  const onNotesReset = () => {
      setNoteMin(0);
      setNoteMax(5);
      onScoreMinChange(0);
      onScoreMaxChange(5)
  };

  const onNoteMinChange: DOMAttributes<HTMLSelectElement>['onChange'] = (event) => {
      const newMinNote = parseInt(event.currentTarget.value);
      setNoteMin(newMinNote);
      onScoreMinChange(newMinNote);
  };

  const onNoteMaxChange: DOMAttributes<HTMLSelectElement>['onChange'] = (event) => {
      const newMaxNote = parseInt(event.currentTarget.value);
      setNoteMax(newMaxNote);
      onScoreMaxChange(newMaxNote);
  };


  return (

    <form className="selectionform">
      <div className="form-check" id="category">
        <label className="form-check-label text-style1">
          Catégories :
        </label>
        {categories.map((category) => (
          <div className="category" key={category.idCategory}>
            <label htmlFor={category.idCategory}>
              <input
                type="checkbox"
                id={category.idCategory}
                title={category.categoryTitle}
                name={category.idCategory}
                checked={category.isChecked}
                onChange={onCheckboxCategoryChange}
              />
              <span>{category.categoryTitle}</span>
            </label>
          </div>
        ))}
      </div>
      <div className='BtnCat'>
        <button type="button" title="Sélectionner" className="btnAllCat" onClick={onAllCategoriesSelected}>Toutes</button>
        <button type="button" title="Déselectionner" className="btnNoneCat" onClick={onNoCategorySelected}>Aucune</button>
      </div>
      <div className="form-check" id="available">
        <label className="form-check-label text-style1">
          Disponibilité :
        </label>
        <div className="category">
          <label htmlFor="isAvailable">
            <input
              type="checkbox"
              id="isAvailable"
              title="Est disponible"
              name="isAvailable"
              defaultValue="true"
              checked={selectedIsAvailable}
              onChange={onCheckboxIsAvailableChange}
            />
            <span>Disponible</span>
          </label>
        </div>
        <div className="category">
          <label htmlFor="isNotAvailable">
            <input
              type="checkbox"
              id="isNotAvailable"
              title="Est disponible"
              name="isNotAvailable"
              defaultValue="true"
              checked={selectedIsNotAvailable}
              onChange={onCheckboxIsNotAvailableChange}
            />
            <span>Indisponible</span>
          </label>
        </div>
      </div>
      <div className="form-check price">
        <label className="form-check-label text-style1" htmlFor="price">
          Prix :
          <button type="reset" title="Réinitialiser les prix" className="btnReset" onClick={onPricesReset}><Reset /></button>
        </label>
        <div className="pricesSelector">
          <label htmlFor="PriceMin" className="form-label">Prix Min&nbsp;</label>
          <input className="PiceInput" type="number" name="PriceMin" id="PriceMin" min="0" max="100" title="Prix Minimum" placeholder="0 €" value={minPrice} onChange={onPriceMinChange} />
        </div>
        <div className="pricesSelector">
          <label htmlFor="PriceMax" className="form-label">Prix Max&nbsp;</label>
          <input className="PiceInput" type="number" name="PriceMax" min="0" max="100" id="PriceMax" title="Prix Maximum" placeholder="100 €" value={maxPrice} onChange={onPriceMaxChange} />
        </div>
      </div>
      <div className="form-check notes">
        <div className="notesSelector">
          <label className="form-check-label text-style1" htmlFor="notes">
            Notes : <button type="reset" title="Réinitialiser les notes" className="btnReset" onClick={onNotesReset}><Reset /></button>
          </label>
          <div className="input-group noteMin">
            <label htmlFor="noteMin" className="form-label">Note Min&nbsp;</label>
            <select className="box" name="noteMin" id="noteMin" defaultValue={noteMin} onChange={onNoteMinChange}>
              <option value='1'>0</option>
              <option value='2'>1</option>
              <option value='3'>2</option>
              <option value='4'>3</option>
              <option value='5'>4</option>
              <option value='6'>5</option>
            </select>
          </div>
        </div>
        <div className="input-group noteMax">
          <label htmlFor="noteMax" className="form-label">Note Max&nbsp;</label>
          <select className="box" name="noteMax" id="noteMax" defaultValue={noteMax} onChange={onNoteMaxChange}>
            <option value='1'>0</option>
            <option value='2'>1</option>
            <option value='3'>2</option>
            <option value='4'>3</option>
            <option value='5'>4</option>
            <option value='6'>5</option>
          </select>
        </div>
      </div>
    </form>
  );
};



