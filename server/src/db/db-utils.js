/**
 * Execute mongoose model query
 * todo: handle catch error
 */
export async function execQuery(query, single) {
  try {
    let res = await query.exec();
    if (single) {
      return res[0];
    }
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Execute mongoose model query
 * todo: handle catch error
 */
export async function execSave(model) {
  try {
    let res = await model.save();
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}

