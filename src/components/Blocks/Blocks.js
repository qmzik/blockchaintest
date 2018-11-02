import React, { Component } from 'react'
import Loading from '../Loading/Loading'
import './Blocks.css'

class Blocks extends Component {
	constructor(props) {
		super(props);
		this.state = { foundBy: '', totalBTCSent: 0, blockIndex: 0 }
		this.socket = new WebSocket('wss://ws.blockchain.info/inv')
		this.socket.onopen = () => {
			this.socket.send(JSON.stringify({"op":"blocks_sub"}))
			console.log('openned')
		}

		this.socket.onmessage = data => {
			const out = JSON.parse(data.data).x
			const foundBy = out.foundBy.description
			const { blockIndex, totalBTCSent } = out
			this.setState({ foundBy, totalBTCSent, blockIndex })
			console.log(foundBy, blockIndex, totalBTCSent)
		}
	}

	render() {
		if (!this.state.foundBy) {
			return (
				<Loading className="blocks" title="Waiting for new blocks found"/>
			)
		}

		return (
			<article className="blocks">
				<span>Last block found index: {this.state.blockIndex}</span>
				<span>Found by: {this.state.foundBy}</span>
				<span>Total BTC sent: {this.state.totalBTCSent / 100000000}</span>
			</article>
		)
	}
}
export default Blocks;