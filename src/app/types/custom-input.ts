import { Component } from '@angular/core';
import { FieldType } from 'ng-formly';


@Component({
    selector: 'custom-formly-field-input',
    template: `
        <input [type]="type" [formControl]="formControl" class="form-control"
            [formlyAttributes]="field" [ngClass]="{'form-control-danger': valid}">
    `,
})
export class FormlyFieldCustomInputComponent extends FieldType {
    get type() {
        return this.to.type || 'text';
    }
}
