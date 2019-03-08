import React, { Component } from 'react';
import { ContextData, state } from "./Context";

const DictRows = ({data, dataState, remove, dbClick, editChange, enterKey}) => {
	return <ContextData.Consumer>
		{val => (
			<table className="table table-striped">
			<thead className="thead-dark">
				<tr>
					<th>ID</th>
					<th>Domain</th>
					<th>Range</th>
				</tr>
			</thead>
			<tbody>
				{val.dicts.map(c => {
					if(c.id == data.current) {
						return c.dict.map(i => {
							if(i.id == dataState.currentRow) {
								return (<tr key={i.id}>
											<td>{i.id}</td>
											<td><input type="text" className="form-control" value={dataState.editDomain} onChange={(event) => {editChange(event.target.value, 'editDomain')}} onKeyDown={event => {enterKey(event)}}/></td>
											<td><input type="text" className="form-control" value={dataState.editRange} onChange={(event) => {editChange(event.target.value, 'editRange')}} onKeyDown={event => {enterKey(event)}}/></td>
											<td className="text-right"><button className="btn btn-danger" onClick={() => {remove(i.id);}}>Remove</button></td>
										</tr>)
							} else {
								return (<tr key={i.id} onDoubleClick={() => {dbClick(i.id, i.domain, i.range)}}>
											<td>{i.id}</td><td>{i.domain}</td><td>{i.range}</td>
											<td className="text-right"><button className="btn btn-danger" onClick={() => {remove(i.id);}}>Remove</button></td>
										</tr>)
							}
							
						});
					}
				})}
			</tbody>
			</table>
			)
		}
	</ContextData.Consumer>
}

class DictList extends Component {
	constructor(props) {
		super(props);
	}
		
	render() {
		let props = this.props;
		let data = this.context;
		return (
			<div>
				<h1 className='text-center'>
					Dicts
				</h1>
				<DictRows data={props} dataState={data} remove={data.remove.bind(this)} dbClick={data.doubleClick.bind(this)} editChange={data.editChange.bind(this)} enterKey={data.enterKey.bind(this)}/>
			</div>
		);
	}
}

DictList.contextType = ContextData;

export default DictList;