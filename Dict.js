import React, { Component } from 'react';
import { ContextData, state } from "./Context";

const DictRows = ({data, remove}) => {
	return <ContextData.Consumer>
		{val => (
			<table className="table table-striped">
			<thead className="thead-dark">
				<tr>
					<th>ID</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
				{val.dicts.map(c => {
					return (<tr key={c.id} ><td>{c.id}</td><td>{c.name}</td><td className="text-right"><button className="btn btn-danger" onClick={() => {remove(c.id);}}>Remove</button></td></tr>)
				})}
			</tbody>
			</table>
			)
		}
	</ContextData.Consumer>
}

class Dict extends Component {
	constructor(props) {
		super(props);
	}
		
	render() {
		let props = this.props;
		let data = this.context;
		return (
			<div>
				<DictRows data={props} remove={data.remove_dict.bind(this)} />
			</div>
		);
	}
}

Dict.contextType = ContextData;

export default Dict;