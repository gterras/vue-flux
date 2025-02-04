export default class DomHelper {

	constructor(node) {
		this.node = node;
	}

	get size() {
		return {
			width: this.getWidth(),
			height: this.getHeight(),
		};
	}

	static sizeFrom(node) {
		return (new DomHelper(node)).size;
	}

	hasWidth() {
		return !!this.node.clientWidth;
	}

	getWidth() {
		let width;

		if (/^[0-9]+px$/.test(this.node.style.width))
			width = this.node.style.width;

		else
			width = window.getComputedStyle(this.node).width;

		return parseFloat(width);
	}

	hasHeight() {
		return !!this.node.clientHeight;
	}

	getHeight() {
		let height;

		if (/^[0-9]+px$/.test(this.node.style.height))
			height = this.node.style.height;

		else
			height = window.getComputedStyle(this.node).height;

		return parseFloat(height);
	}

}
