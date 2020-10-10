import { Injectable } from '@angular/core';

import {
    Conversao,
    ConversaoResponse
} from '../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConversorService {

    private readonly BASE_URL = 'http://data.fixer.io/api/latest?access_key=3afbac738605675c99889620528ce7b3';

    constructor(private http: HttpClient) {
    }

    /**
     * Realiza a chamada para a API de conversão de moedas.
     *
     * @param conversao Conversao
     * @return Observable<ConversaoResponse>
     */
    converter(conversao: Conversao): Observable<any> {
        const params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;

        return this.http
            .get(this.BASE_URL + params);
    }

    /**
     * Retorna a cotação para dado uma response.
     *
     * @param conversaoResponse ConversaoResponse
     * @param conversao Conversao
     * @return number
     */
    cotacaoPara(conversaoResponse: ConversaoResponse, conversao: Conversao): number {
        if (conversaoResponse === undefined) {
            return 0;
        }

        return conversaoResponse.rates[conversao.moedaPara];
    }

    /**
     * Retorna a cotação de dado uma response.
     *
     * @param conversaoResponse ConversaoResponse
     * @param conversao Conversao
     * @return string
     */
    cotacaoDe(conversaoResponse: ConversaoResponse, conversao: Conversao): string {
        if (conversaoResponse === undefined) {
            return '0';
        }

        return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
    }

    /**
     * Retorna a data da cotação dado uma response.
     *
     * @param conversaoResponse ConversaoResponse
     * @return string
     */
    dataCotacao(conversaoResponse: ConversaoResponse): string {
        if (conversaoResponse === undefined) {
            return '';
        }

        return conversaoResponse.date;
    }
}
