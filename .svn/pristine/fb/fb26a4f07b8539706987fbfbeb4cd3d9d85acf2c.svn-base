import {
    Component,
    Vue
} from 'vue-property-decorator'
@Component({
    name: 'KeyEnter'
})
export default class KeyEnter extends Vue {
    public keyEnter(el: string, cb: Function, $el?: HTMLElement) {
        let inputs = null
        if ($el) {
            inputs = $el.querySelectorAll(el)
        } else {
            inputs = this.$el.querySelectorAll(el)
        }
        // @ts-ignore
        for (const input: HTMLInputElement of inputs) {
            // @ts-ignore
            input.onkeydown = (e) => {
                if (e.keyCode === 13) {
                    cb()
                    return false
                }
                e.stopPropagation()
            }
        }
    }
}
