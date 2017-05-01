# Features

### Disabling buttons
```javascript
  <RaisedButton
    label="SAVE"
    onClick={this.handleSave}
    disabledFunc={[this.state.form, 'title', 'description']}
    primary
  />
```


# Graohql queries

### getCategoryById
{
  getCategoryById(categoryId: 5) {
    title,
    description,
    parent
  }
}

### insertCategory
mutation {
  insertCategory(input: {
    title: "test",
    description: "asdasda"
  }) {
    title,
    description,
    parent
  }
}

