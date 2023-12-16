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

export const deletePortfolio = (idPortfolio: string) => {
  return {
    type: actionTypes.DELETE_PORTFOLIO,
    payload: idPortfolio,
  };
};

export const addNewPortfolio = (portfolio: IPortfolio) => {
  return {
    type: actionTypes.ADD_NEW_PORTFOLIO,
    payload: portfolio,
  };
};

export const updateNewPortfolio = (portfolio: IPortfolio, ind: number) => {
  return {
    type: actionTypes.UPDATE_NEW_PORTFOLIO,
    payload: {
      portfolio,
      index: ind,
    },
  };
};

export const deleteNewPortfolio = (indexPortfolio: number) => {
  return {
    type: actionTypes.DELETE_NEW_PORTFOLIO,
    payload: indexPortfolio,
  };
};
