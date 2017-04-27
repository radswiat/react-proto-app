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
