import { 
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import { 
  faStar as faHeartEmpty,
} from '@fortawesome/free-regular-svg-icons';
import { 
  faStar as faHeartFilled,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faStarHalfStroke as faHeartFilledHalf,
} from '@fortawesome/free-solid-svg-icons';
import HalfHeart from '../../../Assets/Images/HalfHeart.svg';

import { prdList } from '../../../Datas/PrdList';

import { useState, useEffect, FunctionComponent } from "react";
import { clsx } from 'clsx';

import "../../../App.scss";
import "./Rating.scss";

interface Toto {
  foo: number;
  bar: number;
}

interface TotoOmit extends Omit<Toto, "foo"> {
  othodor: boolean;
}

const test: TotoOmit = {
  
}

type RatingIconProps = Omit<FontAwesomeIconProps, "bounce">;

const RatingIcon: FunctionComponent<RatingIconProps> = (props) => (
  <FontAwesomeIcon 
    className="score" 
    bounce
    {...props}
  />
)

function Show({ value, activeLow, activeHigh }) {
  if (value > (activeLow) && value < (activeHigh)) {
    return <RatingIcon icon={faHeartEmpty} />;
  }
  if (value >= (activeHigh)) {
    return <RatingIcon icon={faHeartFilled} />;
  }
  if (value == activeLow) {
    return <RatingIcon icon={faHeartFilledHalf} />;
  }
}
    
export type RatingProps = {
  score: number;
}

export const Rating: FunctionComponent<RatingProps> = ({
  score,
}) => {
  {
    return (
      <div>
        <span className="rating_hearts rating_0">
            <Show
              value = {score}
              activeLow = {0}
              activeHigh = {1}
            />
            <Show
              value = {score}
              activeLow = {1}
              activeHigh = {2}
            />
            <Show
              value = {score}
              activeLow = {2}
              activeHigh = {3}
            />
            <Show
              value = {score}
              activeLow = {3}
              activeHigh = {4}
            />
            <Show
              value = {score}
              activeLow = {4}
              activeHigh = {5}
            />
        </span>
      </div>
    );
  }
};
