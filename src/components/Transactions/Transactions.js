import React, { Component } from 'react'
import './Transactions.css'
import Loading from '../Loading/Loading'

class Transactions extends Component {
	constructor(props) {
		super(props);
		this.state = { transactionsCount: 0, value: 0 }
		this.socket = new WebSocket('wss://ws.blockchain.info/inv');
		this.socket.onopen = () => {
			this.socket.send(JSON.stringify({"op":"unconfirmed_sub"}))
		}

		this.socket.onmessage = data => {
			let out = JSON.parse(data.data).x.out;
			out.forEach(item => {
				this.setState({
					value: this.state.value + item.value / 100000000,
					transactionsCount: this.state.transactionsCount + 1
				})
			})
		}
	}

	numberOutput(value) {
		const rounded = Math.round(value)
		return rounded >= 1000 ? Math.floor(rounded / 1000) + 'k' : rounded
	}

	render() {
		if(this.state.transactionsCount === 0) {
			return (
				<Loading
					className="transactions"
					title="Monitoring for new transactions"
				/>
			)
		}

		return (
			<article className="transactions">
				<span className="btc-value">{this.numberOutput(this.state.value)} BTC transacted</span>
				<span className="btc-count">
					Transactions count from now: {this.numberOutput(this.state.transactionsCount)}
					</span>
			</article>
		)
	}
}

export default Transactions;