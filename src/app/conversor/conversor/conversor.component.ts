import { Component, OnInit, ViewChild } from '@angular/core';
import { Conversao, ConversaoResponse, Moeda } from '../models';
import { ConversorService, MoedaService } from '../services';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-conversor',
    templateUrl: './conversor.component.html',
    styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

    private _moedas: Moeda[];
    private _conversao: Conversao;
    private _possuiErro: boolean;
    private _conversaoResponse: ConversaoResponse;

    get possuiErro(): boolean {
        return this._possuiErro;
    }

    get moedas(): Moeda[] {
        return this._moedas;
    }

    get conversao(): Conversao {
        return this._conversao;
    }

    get conversaoResponse(): ConversaoResponse {
        return this._conversaoResponse;
    }

    @ViewChild('conversaoForm', {static: true})
    conversaoForm: NgForm;

    constructor(
        private moedaService: MoedaService,
        private conversorService: ConversorService
    ) {
    }

    ngOnInit(): void {
        this._moedas = this.moedaService.listarTodas();
        this.init();
    }

    init(): void {
        this._conversao = new Conversao('EUR', 'BRL', null);
        this._possuiErro = false;
    }

    converter(): void {
        if (this.conversaoForm.form.valid) {
            this.conversorService.converter(this.conversao)
                .subscribe(
                    response => this._conversaoResponse = response,
                    error => this._possuiErro = true
                );
        }
    }
}
