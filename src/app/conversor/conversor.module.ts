import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConversorComponent } from './conversor';
import { FormsModule } from '@angular/forms';
import { SomenteNumerosDirective } from './directives';
import { ModalCotacaoComponent } from './utils';
import { DataBrPipe } from './pipes';

@NgModule({
    declarations: [
        ConversorComponent,
        SomenteNumerosDirective,
        ModalCotacaoComponent,
        DataBrPipe
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    exports: [
        ConversorComponent
    ]
})
export class ConversorModule {
}
