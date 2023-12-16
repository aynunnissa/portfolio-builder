import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPortfolio } from '@/types/user';

interface IExistPortfolioObject extends IPortfolio {
  changed: boolean;
}

interface IExistPortfolio {
  [key: string]: IExistPortfolioObject;
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

const isPortfolioEqual = (prevPort: IPortfolio, newPort: IPortfolio) => {
  return (
    prevPort.name !== newPort.name ||
    prevPort.company !== newPort.company ||
    prevPort.position !== newPort.position ||
    prevPort.startDate !== newPort.startDate ||
    prevPort.endDate !== newPort.endDate ||
    prevPort.description !== newPort.description
  );
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
    updatePortfolio: (state, action: PayloadAction<IPortfolio>) => {
      // Update portfolio value
      const updatedPortfolios = [...state.portfolios];
      const portfolioInd = updatedPortfolios.findIndex(
        portfolio => portfolio.id === action.payload.id
      );
      updatedPortfolios[portfolioInd] = action.payload;

      // Handle changes
      const existPortObj = { ...state.existingPortfolios[action.payload.id] };

      const newPort = action.payload;
      const isChanged = isPortfolioEqual(existPortObj, newPort);

      let currentTotalChanges = state.totalChanged;
      if (isChanged && !existPortObj.changed) {
        currentTotalChanges++;
      } else if (!isChanged && existPortObj.changed) {
        currentTotalChanges--;
      }
      existPortObj.changed = isChanged;

      return {
        ...state,
        totalChanged: currentTotalChanges,
        portfolios: [...updatedPortfolios],
        existingPortfolios: {
          ...state.existingPortfolios,
          [action.payload.id]: existPortObj,
        },
      };
    },
  },
});

export const { loadPortfolio, updatePortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const portfolioSelector = (state: { portfolioStore: IProductState }) =>
  state.portfolioStore;
