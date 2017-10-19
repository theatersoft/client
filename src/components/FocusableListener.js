export const mixinFocusableListener = Base => class Mixin extends Base {
    onGesture = e => {
        const
            pathDataset = e => {
                for (let node of e.path) {
                    if (!node.dataset) return
                    if (Object.keys(node.dataset).length) {
                        return node.dataset
                    }
                    if (node === this.base) return
                }
            },
            dataset = pathDataset(e.srcEvent)
        if (dataset) super.onGesture(dataset, e)
    }

    componentDidMount () {
        if (this.onGesture) this.context.focus.on('gesture', this.onGesture)
    }

    componentWillUnmount () {
        if (this.onGesture) this.context.focus.off('gesture', this.onGesture)
    }
}