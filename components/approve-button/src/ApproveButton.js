class ApproveButton extends HTMLElement{

    constructor(){
        super(); //Ejecutar el constructor del padre
        this._shadow = this.attachShadow({mode: 'open'});
        this._selector = "approve-button";
    }

    get selector(){
        return this._selector;
    }

    get shadow(){
        return this._shadow;
    }

    set shadow(value){
        this._shadow = value;
    }

    connectedCallback() {
        let template = this.render();
        this.shadow.innerHTML = template;
    }

    render(){
        let styles = `<style>
                            .approveBtn{
                                display: flex;
                            }
                            .approveBtn div{
                                padding: 10px;
                            }
                     </style>`;
        let body = `<div class="approveBtn">
                        <div class="greenBorder">√</div>
                        <div class="redBorder">x</div>
                    </div>`;
                    
        return `${styles} ${body}`;
    }

}