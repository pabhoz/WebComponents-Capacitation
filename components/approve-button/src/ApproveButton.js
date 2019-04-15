class ApproveButton extends HTMLElement{

    constructor(){
        super(); //Ejecutar el constructor del padre
        this._shadow = this.attachShadow({mode: 'closed'});
        this._value = null;
    }

    get shadow(){
        return this._shadow;
    }

    set shadow(value){
        this._shadow = value;
    }

    get value(){
        return this._value;
    }

    set value(value){
        this._value = value;
    }

    static get observedAttributes() {
        return ['value'];
    }

    /**
     * attributeChangedCallback
     * 
     * Se ejecuta cuando el valor de cualquier atributo declarado dentro del arreglo de los 
     * observedAttributes cambia.
     * 
     * @param {string} name nombre del atributo que cambia
     * @param {mixed} oldVal valor anterior del atributo
     * @param {mixed} newValue nuevo valor del atributo
     */
    attributeChangedCallback(name, oldVal, newValue) {
        this[`update${name.charAt(0).toUpperCase() + name.slice(1)}`](oldVal,newValue);
    }

    updateValue(oldVal, newValue){
        this.value = newValue;
        console.log(`Mi valor era ${oldVal} y ahora es ${newValue}`);
    }

    connectedCallback() {
        let template = this.render();
        this.shadow.innerHTML = template;
        this.addListeners();
    }

    render(){
        let styles = `<style>
        .approveBtn {
            display: flex;
        }

        .approveBtn div {
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.5s ease;
        }

        .approveBtn div.approved{
            border: 2px solid #27ae60;
        }

        .approveBtn div.approved:hover, .approveBtn div.approved.selected{
            background: #2ecc71;
            color: white;
            font-weight: bold;
        }

        .approveBtn div.rejected{
            border: 2px solid #c0392b;
        }

        .approveBtn div.rejected:hover, .approveBtn div.rejected.selected{
            background: #e74c3c;
            color: white;
            font-weight: bold;
        }

        .approveBtn div.left {
            border-right: none;
            border-radius: 5px 0px 0px 5px;
        }

        .approveBtn div.rigth {
            border-radius: 0px 5px 5px 0px;
            border-left: 2px solid gray;
        }

        .approveBtn div.selected{
            padding: 5px 15px;
        }
    </style>`;
        let body = `<div class="approveBtn">
        <div class="approved left" data-value="true">&#x2713</div>
        <div class="rejected rigth" data-value="false">×</div>
    </div>`;
                    
        return `${styles} ${body}`;
    }

    addListeners(){
        let btns = this.shadow.querySelectorAll(".approveBtn div");
        btns.forEach(btn => {
            btn.onclick = (e) => {
                let selected = this.shadow.querySelector(".selected");
                if( selected != null) {
                    selected.classList.remove("selected");
                }
                e.target.classList.add("selected");
                
                this.value = e.target.dataset.value;
                console.log(this.value);
            }
        });
    }

}