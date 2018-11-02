import React, { Component } from 'react'
import Transactions from '../Transactions/Transactions'
import Blocks from '../Blocks/Blocks'
import './Blockchain.css'

class Blockchain extends Component{

	render() {
		return (
			<div className="blockchain">
				<Transactions/>
				<Blocks/>
			</div>
		)
	}
}

export default Blockchain;