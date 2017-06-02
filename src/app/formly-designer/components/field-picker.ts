import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from 'ng-formly';
import { FormlyDesignerConfig } from '../formly-designer-config';


declare var $: any;

@Component({
    selector: 'field-picker',
    template: `
        <form novalidate [formGroup]="designer">
            <div class="form-group">
                <div class="input-group">
                    <type-select formControlName="type">
                    </type-select>
                    <button type="button" class="btn btn-secondary" [disabled]="designer.invalid" (click)="add()">
                        Add
                    </button>
                </div>
            </div>
            <div #modal class="modal fade" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add {{ type }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Cancel">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <field-editor #editor [formControl]="fieldEdit" [field]="fieldSource">
                            </field-editor>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" (click)="onApply()"
                                [disabled]="editor.invalid">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    `,
    styles: [`
        .btn:not(:disabled), .dropdown-item:not(:disabled) {
            cursor: pointer;
        }
        .input-group > .btn {
            border-radius: 0 .25rem .25rem 0;
        }
        .input-group, .modal-header {
            display: flex;
        }
        .modal-header {
            justify-content: space-between;
        }
        type-select {
            flex-grow: 2;
        }
        :host /deep/ type-select > select {
            border-radius: .25rem 0 0 .25rem;
            border-right: 0;
        }
        ::after {
            display: none !important;
        }
    `]
})
export class FieldPickerComponent implements OnInit {
    @ViewChild('modal') modalRef: ElementRef;
    @Output() selected = new EventEmitter<FormlyFieldConfig>();

    constructor(
        private formBuilder: FormBuilder,
        private formlyDesignerConfig: FormlyDesignerConfig
    ) { }

    designer: FormGroup;
    fieldSource: FormlyFieldConfig;
    fieldEdit = new FormControl({});

    get type(): string {
        return this.designer.get('type').value;
    }

    private get modal(): any {
        return $(this.modalRef.nativeElement);
    }

    ngOnInit(): void {
        this.designer = this.formBuilder.group({
            type: ['', Validators.compose([Validators.required, Validators.pattern(/^\s*\S.*$/)])]
        });
    }

    add(): void {
        this.fieldEdit.setValue({});
        const type = this.type;
        if (type === 'fieldGroup') {
            this.fieldSource = {
                fieldGroup: []
            };
            this.selected.emit(this.fieldSource);
        }
        else {
            this.modal.modal('show');
            this.fieldSource = {
                type: type
            };
        }
    }

    onApply(): void {
        this.selected.emit(this.fieldEdit.value);
        this.modal.modal('hide');
    }
}