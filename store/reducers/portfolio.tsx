import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INewPortfolio, IPortfolio } from '@/types/user';

interface IExistPortfolioObject extends IPortfolio {
  changed: boolean;
}

interface IExistPortfolio {
  [key: string]: IExistPortfolioObject;
}

interface IProductState {
  existingPortfolios: IExistPortfolio;
  portfolios: IPortfolio[];
  newPortfolios: INewPortfolio[];
  totalChanged: number;
}

const initialState: IProductState = {
  existingPortfolios: {},
  portfolios: [],
  newPortfolios: [],
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
    addNewPortfolio: (state, action: PayloadAction<INewPortfolio>) => {
      const newPortos = [...state.newPortfolios];
      const newInd: number = newPortos.length;
      const newPortData = action.payload;
      let currentTotalChanges = state.totalChanged;
      currentTotalChanges++;
      newPortData.index = newInd;
      newPortos.push(newPortData);
      console.log(newPortos);

      return {
        ...state,
        newPortfolios: newPortos,
        totalChanged: currentTotalChanges,
      };
    },
    updateNewPortfolio: (state, action: PayloadAction<INewPortfolio>) => {
      console.log('manggil');
      const newPortos = [...state.newPortfolios];
      if (action.payload.index !== undefined) {
        const updatedInd: number = action.payload.index;
        const newPortData = action.payload;
        newPortos[updatedInd] = newPortData;
      }

      return {
        ...state,
        newPortfolios: newPortos,
      };
    },
  },
});

export const {
  loadPortfolio,
  updatePortfolio,
  addNewPortfolio,
  updateNewPortfolio,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const portfolioSelector = (state: { portfolioStore: IProductState }) =>
  state.portfolioStore;
