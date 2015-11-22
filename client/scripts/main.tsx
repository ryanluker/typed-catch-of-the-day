import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Store Picker example
 */
class StorePicker extends React.Component<any, any> {
  render() {
	return (
	  <form className="store-selector">
	  	<h2>Please Enter a Store</h2>
		<input type="text" ref="storeId" required />
		<input type="submit" />
	  </form>
	)
  }
}

ReactDOM.render(<StorePicker/>, document.getElementById('main'));