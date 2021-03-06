import { AfterContentInit, Component, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { FieldWrapper } from 'ng-formly';

import { isString } from 'lodash';


declare var $: any;

@Component({
    selector: 'formly-wrapper-tabset',
    template: `
        <tabset>
            <ng-container #fieldComponent></ng-container>
        </tabset>
    `
})
export class FormlyWrapperTabsetComponent extends FieldWrapper implements AfterContentInit {
    @ViewChild('fieldComponent', {read: ViewContainerRef}) fieldComponent: ViewContainerRef;

    constructor(
        private elementRef: ElementRef
    ) {
        super();
    }

    get tabsetClassName() {
        return this.to.tabsetClassName;
    }

    ngAfterContentInit(): void {
        if (isString(this.tabsetClassName)) {
            $(this.elementRef.nativeElement as HTMLElement).addClass(this.tabsetClassName);
        }
    }
}
