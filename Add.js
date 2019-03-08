import React, { Component } from 'react';
import update from 'react-addons-update';
import { ContextData, state } from './Context';
import Datas from './Datas';
import DictList from './DictList';
import Dict from './Dict';

class Add extends Component {
	constructor(props) {
		let newCollection;
		super(props);
		this.state = {
			dataset: state.dataset,
			dicts: state.dicts,
			domain: '',
			range: '',
			id: '',
			remove: (e) => {
				const s =  this.state.dicts.map(f=>{
					if(f.id == this.state.currentDict) {
						return f.dict.filter(m=> m.id !== e);
					}
					return f.dict;
				});
				let i = 0;
				let states = this.state;
				s.map(c=> {
					newCollection = update(states, {dicts: {[i]: { dict: { $set: c }}}});
					states = newCollection;
					i++;
				});
				this.setState(states);
			},
			remove_dict: (e) => {
				const s = this.state.dicts.filter(m=> m.id !== e);
				this.setState({
					dicts: s
				});
			},
			doubleClick: (e, domain, range) => {
				this.setState({
					currentRow: e,
					editDomain: domain,
					editRange: range
				});
			},
			editChange: (e, name) => {
				let change = {};
				change[name] = e;
				this.setState(change);
			},
			enterKey: (e) => {
				if (e.keyCode === 13) {
					const s =  this.state.dicts.map(f=>{
						if(f.id == this.state.currentDict) {
							let dicts = f;
							let foundIndex = f.dict.findIndex(x => x.id == this.state.currentRow);
							dicts.dict[foundIndex]['domain'] = this.state.editDomain;
							dicts.dict[foundIndex]['range'] = this.state.editRange;
							return dicts.dict;
						}
						return f.dict;
					});
					let i = 0;
					let states = this.state;
					s.map(c=> {
						newCollection = update(states, {dicts: {[i]: { dict: { $set: c }}}});
						states = newCollection;
						i++;
					});
					const verif = this.state.dicts.filter(m=> m.id == this.state.currentDict);
					let verif_msg_dupl = false;
					let verif_msg_cycle = false;
					verif.map(c=> {
						c.dict.map(i=> {
							if(i.id != this.state.currentRow) {
								if(i.domain == this.state.editDomain || i.range == this.state.editRange) {
									verif_msg_dupl = true;
								} else if(i.domain == this.state.editRange || i.range == this.state.editDomain) {
									verif_msg_cycle = true;
								}
							}
						});
					});
					if(verif_msg_dupl === false && verif_msg_cycle === false) {
						this.setState(states);
						this.setState({
							currentRow: 0
						});	
					} else if(verif_msg_dupl === true) {
						alert('Domain or Range already exists');
					} else if(verif_msg_cycle === true) {
						alert('Never ending cycle');
					}
				}
			},
			currentDict: 0,
			showAdd: false,
			dict_id: '',
			name: '',
			currentRow: 0,
			editDomain: '',
			editRange: ''
		};
	}
	
	handleChange(name, e) {
		let change = {};
		change[name] = e.target.value;
		this.setState(change);
	}
	
	saveDict() {
		if(this.state.dict_id != '' && this.state.name != '') {
			const array = {id: this.state.dict_id, name: this.state.name, dict: []};
			const states = this.state;
			const newCollection = update(states, {dicts: {$push: [array]}});
			this.setState(newCollection);	
		} else {
			alert('Enter values');
		}
	}
	
	saveDictRow() {
		let newCollection;
		const states = this.state;
		let i = 0;
		let j = 0;
		const array = {id: this.state.id, domain: this.state.domain, range: this.state.range};
		states.dicts.map(c=> {
			if(c.id != this.state.currentDict) {
				i++;
			} else {
				j = i;
			}
		});
		const verif = this.state.dicts.filter(m=> m.id == this.state.currentDict);
		let verif_msg_dupl = false;
		let verif_msg_cycle = false;
		verif.map(c=> {
			c.dict.map(i=> {
				if(i.domain == this.state.domain || i.range == this.state.range) {
					verif_msg_dupl = true;
				} else if(i.domain == this.state.range || i.range == this.state.domain) {
					verif_msg_cycle = true;
				}
			});
		});
		if(verif_msg_dupl === false && verif_msg_cycle === false && this.state.domain != '' && this.state.range != '') {
			newCollection = update(states, {dicts: {[j]: { dict: { $push: [array] }}}});
			this.setState(newCollection);	
			this.setState({
				id: '',
				domain: '',
				range: ''
			});
		} else if(this.state.domain == '' || this.state.range == '') {
			alert('Enter values');
		} else if(verif_msg_dupl === true) {
			alert('Domain or Range already exists');
		} else if(verif_msg_cycle === true) {
			alert('Never ending cycle');
		}
	}
	
	onSelect(e) {
		let show;
		if(e.target.value == '-- select an option --') {
			show = false;
		} else {
			show = true;
		}
		this.setState({
			currentDict: e.target.value,
			showAdd: show
		});
	}
	
	render() {
		return (
			<div className="container-fluid">
				<ContextData.Provider value={this.state}>
					<Datas />
					<h3 className='text-center'>All Dicts</h3>
					<Dict />
					<div className="text-center">
						<h3 className='text-center'>
							Add Dict
						</h3>
						<div className="form-group">
							<label>ID</label>
							<input type="text" className="form-control" value={ this.state.dict_id } onChange={ this.handleChange.bind(this, 'dict_id') } />
						</div>
						<div className="form-group">
							<label>Dict Name</label>
							<input type="text" className="form-control" value={ this.state.name } onChange={ this.handleChange.bind(this, 'name') } />
						</div>
						<div className="form-group">
							<button className="btn btn-success" onClick={() => {
								this.saveDict()
							}}>Save</button>
						</div>
					</div>
					<h3 className='text-center'>Choose Dict</h3>
					<select className="form-control" onChange={ this.onSelect.bind(this) }>
						<option defaultValue="-- select an option --"> -- select an option -- </option>
						{this.state.dicts.map((item) => <option key={item.id} value={item.id} >{item.name}</option>)}
					</select>
					<div style={{display: this.state.showAdd ? 'block' : 'none'}}>
						<DictList current={this.state.currentDict} currentRow={this.state.currentRow}/>
					</div>
				</ContextData.Provider>
				<div className="text-center" style={{display: this.state.showAdd ? 'block' : 'none'}}>
					<h3 className='text-center'>
						Add Dict Row
					</h3>
					<div className="form-group">
						<label>ID</label>
						<input type="text" className="form-control" value={ this.state.id } onChange={ this.handleChange.bind(this, 'id') } />
					</div>
					<div className="form-group">
						<label>Domain</label>
						<input type="text" className="form-control" value={ this.state.domain } onChange={ this.handleChange.bind(this, 'domain') } />
					</div>
					<div className="form-group">
						<label>Range</label>
						<input type="text" className="form-control" value={ this.state.range } onChange={ this.handleChange.bind(this, 'range') } />
					</div>
					<div className="form-group">
						<button className="btn btn-success" onClick={() => {
							this.saveDictRow()
						}}>Save</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Add;