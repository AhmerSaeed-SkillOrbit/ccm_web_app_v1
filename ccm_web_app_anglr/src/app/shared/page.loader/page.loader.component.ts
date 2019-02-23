import { Component, OnInit, OnDestroy } from '@angular/core';
import { UIService } from '../../core/services/ui/ui.service';

@Component({
    selector: 'page-loader',
    moduleId: module.id,
    templateUrl: 'page.loader.component.html'
})
export class PageLoaderComponent implements OnInit, OnDestroy {

    visible = false;

    constructor(private _uiService: UIService) {
    }

    ngOnInit(): void {
        console.log("loader Comp");
        this._uiService.spinnerStatus.subscribe(
            (show) => {
                console.log("loader");
                this.visible = show;
            }
        );
    }

    ngOnDestroy(): void {
        this._uiService.spinnerStatus.unsubscribe();
    }
}