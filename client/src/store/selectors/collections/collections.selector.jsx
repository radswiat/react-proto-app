import {
  getRowHistoryById,
  getRowsByCategoryId
} from 'store/actions/collections/collection-rows.action';
import { isArray } from 'core/utils';
import { select, fakeDispatch } from '../selector';

/**
 * Select collection by url
 * @param dispatch
 * @param state
 * @param collectionUrl
 * @returns {Promise.<*>}
 */
export const selectCollectionByUrl = async (dispatch, state, collectionUrl) => {
  // return null if its not an array
  // happens when state is not yet ready
  if (!isArray(state)) {
    return null;
  }
  // select data
  return select(state, {
    filter: (item) => {
      return item.urlFriendly === collectionUrl;
    },
    filterReturn: (value) => {
      return value[0];
    }
  });
};

/**
 * Select row history
 * @example
 * await selectRowHistory(this.props.dispatch, this.props.rowHistory, this.props.row._id);
 * @param dispatch
 * @param state
 * @param parentId
 * @returns {Promise}
 */
export const selectCollectionRowHistory = async (dispatch, state, parentId) => {
  return select(state, {
    filter: (item) => {
      return item._id === parentId;
    },
    filterReturn: (value) => {
      return value[0].history;
    },
    dispatcher: () => {
      return dispatch(getRowHistoryById({
        _id: parentId
      }, {
        includeHistory: true
      }));
    }
  });
};

/**
 * Select rows by category id
 * @param dispatch
 * @param state
 * @param parentId
 * @returns {Promise.<void>}
 */
export async function selectRowsByCategoryId(dispatch, state, collectionId, categoryId, apiParams) {
  console.error('select rows by');
  console.log(collectionId);
  // when no dispatch avail
  if (!dispatch) {
    dispatch = fakeDispatch;
  }

  let limit = 0;

  return select(state, {
    filter: (item) => {
      // if category id equals *
      // we ignore category check
      if (categoryId === '*') {
        return item.collectionId === `ObjectId(${collectionId})`;
      }
      // check categoryId & collectionId
      // bugfix: to lowercase before compare
      return item.categoryId.toLowerCase() === `ObjectId(${categoryId})`.toLowerCase() &&
        item.collectionId.toLowerCase() === `ObjectId(${collectionId})`.toLowerCase();
    },
    dispatcher: () => {
      limit++;
      console.warn(limit);
      // if category id equals *
      // we ignore category when calling for data
      if (categoryId === '*') {
        return dispatch(getRowsByCategoryId({
          collectionId: `ObjectId(${collectionId})`
        }, apiParams));
      }
      return dispatch(getRowsByCategoryId({
        collectionId: `ObjectId(${collectionId})`,
        categoryId: `ObjectId(${categoryId})`
      }, apiParams));
    }
  });
}
