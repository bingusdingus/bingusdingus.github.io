export default {
    props: {
        r: String,
        g: String,
        b: String,
        a: String,
    },
    data() {
        return {
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a,
        }
    },
    methods: {
        formatColor() {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        },
    },
    template: `
    <div class="card">
        <div id="header" class="card-header"></div>
        <slot name="body"></slot>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="d-flex flex-row align-items-center">
                    <label class="pe-3" for="bRNum">R</label>
                    <input 
                        type="number" 
                        id="rNum" 
                        class="form-control w-25" 
                        min="0" 
                        max="255"
                        v-model="r" />
                    <input 
                        type="range" 
                        id="rRange" 
                        class="form-range ps-3" 
                        min="0" 
                        max="255"
                        v-model="r" />
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex flex-row align-items-center">
                    <label class="pe-3" for="bGNum">G</label>
                    <input 
                        type="number" 
                        id="gNum" 
                        class="form-control w-25" 
                        min="0" 
                        max="255"
                        v-model="g" />
                    <input 
                        type="range" 
                        id="gRange" 
                        class="form-range ps-3" 
                        min="0" 
                        max="255"
                        v-model="g" />
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex flex-row align-items-center">
                    <label class="pe-3" for="bBNum">B</label>
                    <input 
                        type="number" 
                        id="bNum" 
                        class="form-control w-25" 
                        min="0" 
                        max="255"
                        v-model="b" />
                    <input 
                        type="range" 
                        id="bRange" 
                        class="form-range ps-3" 
                        min="0" 
                        max="255"
                        v-model="b" />
                </div>
            </li>
            <li class="list-group-item">
                <div class="d-flex flex-row align-items-center">
                    <label class="pe-3" for="bANum">A</label>
                    <input 
                        type="number" 
                        id="aNum" 
                        class="form-control w-25" 
                        min="0" 
                        max="1"
                        step="0.01"
                        v-model="a" />
                    <input 
                        type="range" 
                        id="aRange" 
                        class="form-range ps-3" 
                        min="0" 
                        max="1"
                        step="0.01"
                        v-model="a" />
                </div>
            </li>
        </ul>
    </div>
    `
}