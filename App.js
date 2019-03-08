import React, { Component } from 'react';
import { HashRouter, Route, Link } from "react-router-dom";
import Add from './Add';

class App extends Component {
	render() {
		return (
		<div className="container pb-5">
			<div className="row">
				<div className="col-sm">
					<HashRouter>
						<div>
							<Link to="/maintain">
								<div className="navbar navbar-light bg-info text-center">
									<div className="navbar-brand">
										Maintain Dict
									</div>
								</div>
							</Link>
							<Route path="/maintain" component={Add} />
						</div>
				  </HashRouter>
				</div>
			</div>
		</div>
		);
	}
}

export default App;