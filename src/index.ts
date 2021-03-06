export interface IBaseComponentOptions {
    target: HTMLElement;
    data?: any;
}

export class BaseComponent {

    public options: IBaseComponentOptions;
    public el: HTMLElement;
    private _e: any;

    constructor(options: IBaseComponentOptions) {
        this.options = options;
        this.options.data = Object.assign({}, this.data(), options.data);
    }

    protected _init(): boolean {
        this.el = this.options.target;

        if (!this.el) {
            console.warn('element not found');
            return false;
        }

        this.el.innerHTML = '';

        return true;
    }

    public data(): Object {
        return {};
    }

    public on(name: string, callback: Function, ctx: any): void {
        var e = this._e || (this._e = {});

        (e[name] || (e[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
    }

    public fire(name: string, ...args: any[]): void {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this._e || (this._e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;

        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
    }

    protected _resize(): void {

    }

    public set(_data: Object): void {

    }
}
