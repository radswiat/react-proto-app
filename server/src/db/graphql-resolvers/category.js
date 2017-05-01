import mongoose from 'mongoose';
import { execQuery, execSave } from '../db-utils';
import chalk from 'chalk';

const CategoriesModel = mongoose.model('categories', new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  parent: {
    type: Number
  }
}));

export default class Category {

  static SchemaInputType = `
    input CategoryInput {
      title: String!,
      description: String,
      parent: ID
    }
  `;

  static SchemaType = `
    type Category {
      title: String,
      description: String,
      parent: ID
    }
  `;

  static SchemaMutation = `
    type Mutation {
      insertCategory(input: CategoryInput): Category
    }
  `;

  static SchemaQuery = `
    getCategoryById(categoryId: Int!) : Category
  `;

  insertCategory({ input }) {
    let model = new CategoriesModel(input);
    return execSave(model);
  }

  getCategoryById({ categoryId }) {
    return execQuery(CategoriesModel.find(categoryId), true);
  }

}
