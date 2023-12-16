import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPortfolio } from '@/types/user';

interface IExistPortfolio {
  [key: string]: Object;
}

interface IProductState {
  existingPortfolios: IExistPortfolio;
  portfolios: IPortfolio[];
  totalChanged: number;
}

const initialState: IProductState = {
  existingPortfolios: {},
  portfolios: [],
  totalChanged: 0,
};

const portfolioSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadPortfolio: (state, action: PayloadAction<IPortfolio[]>) => {
      /**
       * Create map object from existing portfolio for changes checking purpose
       */
      const objectPortfolios: IExistPortfolio = {};
      action.payload.forEach((portfolio: IPortfolio) => {
        const portID = portfolio.id;
        const portObj = {
          ...portfolio,
          changed: false,
        };

        objectPortfolios[portID] = portObj;
      });
      return {
        ...state,
        portfolios: action.payload,
        existingPortfolios: { ...objectPortfolios },
      };
    },
  },
});

export const { loadPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const portfolioSelector = (state: { portfolioStore: IProductState }) =>
  state.portfolioStore;
