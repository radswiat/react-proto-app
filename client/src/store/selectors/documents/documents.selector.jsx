import {
  getRowHistoryById,
  getRowsByCategoryId
} from 'store/actions/documents/document-rows.action';
import { isArray } from 'core/utils';
import { select, fakeDispatch } from '../selector';

/**
 * Select document by url
 * @param dispatch
 * @param state
 * @param documentUrl
 * @returns {Promise.<*>}
 */
export async function selectDocumentByUrl(dispatch, state, documentUrl) {
  // return null if its not an array
  // happens when state is not yet ready
  if (!isArray(state)) {
    return null;
  }
  // select data
  return select(state, {
    filter: (item) => {
      return item.urlFriendly === documentUrl;
    },
    filterReturn: (value) => {
      return value[0];
    }
  });
}

/**
 * Select row history
 * @example
 * await selectRowHistory(this.props.dispatch, this.props.rowHistory, this.props.row._id);
 * @param dispatch
 * @param state
 * @param parentId
 * @returns {Promise}
 */
export async function selectDocumentRowHistory(dispatch, state, parentId) {
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
}

/**
 * Select rows by category id
 * @param dispatch
 * @param state
 * @param parentId
 * @returns {Promise.<void>}
 */
export async function selectRowsByCategoryId(dispatch, state, documentId, categoryId, apiParams) {
  // when no dispatch avail
  if (!dispatch) {
    dispatch = fakeDispatch;
  }

  return select(state, {
    filter: (item) => {
      // if category id equals *
      // we ignore category check
      if (categoryId === '*') {
        return item.documentId === `ObjectId(${documentId})`;
      }
      // check categoryId & documentId
      // bugfix: to lowercase before compare
      return item.categoryId.toLowerCase() === `ObjectId(${categoryId})`.toLowerCase() &&
        item.documentId.toLowerCase() === `ObjectId(${documentId})`.toLowerCase();
    },
    dispatcher: () => {
      // if category id equals *
      // we ignore category when calling for data
      if (categoryId === '*') {
        return dispatch(getRowsByCategoryId({
          documentId: `ObjectId(${documentId})`
        }, apiParams));
      }
      return dispatch(getRowsByCategoryId({
        documentId: `ObjectId(${documentId})`,
        categoryId: `ObjectId(${categoryId})`
      }, apiParams));
    }
  });
}
