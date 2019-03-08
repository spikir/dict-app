import React, { Component } from 'react';
import { ContextData, state } from "./Context";

function Dataset (props) {
	return <ContextData.Consumer>
		{val => (
			<table className="table table-striped">
			<thead>
				<tr>
					<th>ID</th>
					<th>Product</th>
					<th>Color</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>
				{val.dataset.map(c => {
					return (<tr key={c.id}><td>{c.id}</td><td>{c.product}</td><td>{c.color}</td><td>{c.price}</td></tr>)
				})}
			</tbody>
			</table>
			)
		}
	</ContextData.Consumer>
}

class Datas extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dicts: state.dicts
		};
	}
		
	render() {
		let props = this.props;
		let data = this.context;
		return (
			<div>
				<h1 className='text-center'>
					Original dataset
				</h1>
				<Dataset data={props} />
			</div>
		);
	}
}

Datas.contextType = ContextData;

export default Datas;
