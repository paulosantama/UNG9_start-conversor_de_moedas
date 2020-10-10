import {Directive, ElementRef, HostListener} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[somenteNumeros]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SomenteNumerosDirective,
        multi: true
    }]
})
export class SomenteNumerosDirective implements ControlValueAccessor {

    onTouched: any;
    onChange: any;

    constructor(private el: ElementRef) {
    }

    /**
     * Obtém o valor contido na model.
     *
     * @param obj
     */
    writeValue(obj: any): void {
        this.el.nativeElement.value = obj
    }

    /**
     * Registra função a ser chamada para atualizar valor na model.
     *
     * @param fn
     */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * Registra função a ser chamada para atualizar valor na model para evento touched.
     *
     * @param fn
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Implementa evento de keyup para o elemento da diretiva.
     *
     * @param $event
     */
    @HostListener('keyup', ['$event'])
    onKeyUp($event: any) {
        let valor = $event.target.value;
        let posDecimais = valor.indexOf('.');

        valor = valor.replace(/[\D]/g, '');

        if (posDecimais > 0) {
            valor = valor.substr(0, posDecimais) + '.' + valor.substr(posDecimais);
        }

        $event.target.value = valor;
        this.onChange(valor);
    }

}
