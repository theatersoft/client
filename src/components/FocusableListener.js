export const mixinFocusableListener = Base => class Mixin extends Base {
    onGesture = e => {
        const
            pathDataset = path => {
                for (let node of path) {
                    if (!node.dataset) return
                    if (Object.keys(node.dataset).length) return node.dataset
                    if (node === this.base) return
                }
            },
            dataset = pathDataset(e.srcEvent.path)
        if (dataset) super.onGesture(dataset, e)
    }

    componentDidMount () {
        if (this.onGesture) this.context.focus.on('gesture', this.onGesture)
    }

    componentWillUnmount () {
        if (this.onGesture) this.context.focus.off('gesture', this.onGesture)
    }
}