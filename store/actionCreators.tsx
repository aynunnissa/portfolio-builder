import { IPortfolio } from '@/types/user';
import * as actionTypes from './actionTypes';

export const loadPortolio = (portfolios: IPortfolio[]) => {
  return {
    type: actionTypes.LOAD_PORTFOLIO,
    payload: portfolios,
  };
};

export const updatePortfolio = (portfolio: IPortfolio) => {
  return {
    type: actionTypes.UPDATE_PORTFOLIO,
    payload: portfolio,
  };
};
