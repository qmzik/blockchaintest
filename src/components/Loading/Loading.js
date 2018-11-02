import React, { Component } from 'react'
import './Loading.css'

class Loading extends Component {
	render() {
		return(
			<div className={`${this.props.className} loading`}>
				{this.props.title}
				<div className="loading-indicator"></div>
			</div>
		)
	}
}

export default Loading;