import { Action, AsyncAction } from './';
import { DocumentNode } from 'graphql';
import graphQLClient from '../api/client';
import ISLAND_QUERY from '../card/island/queries/islandQuery';
import HARBOR_QUERY from '../card/harbor/queries/harborQuery';
import FERRY_QUERY from '../card/ferry/queries/ferryQuery';

const fetchCardData = async (query: DocumentNode, ahtiId: string) => {
  try {
    const { data } = await graphQLClient.query({
      query: query,
      variables: { ahtiId: ahtiId },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const clearCard: Action = ({ state }) => {
  state.cardData = null;
};

export const displayHarborCard: AsyncAction<string, void> = async (
  { state },
  ahtiId: string
) => {
  state.cardData = (await fetchCardData(HARBOR_QUERY, ahtiId)).harbor;
};

export const displayFerryCard: AsyncAction<string, void> = async (
  { state },
  ahtiId: string
) => {
  state.cardData = (await fetchCardData(FERRY_QUERY, ahtiId)).ferry;
};

export const displayIslandCard: AsyncAction<string, void> = async (
  { state },
  ahtiId: string
) => {
  state.cardData = (await fetchCardData(ISLAND_QUERY, ahtiId)).island;
};
