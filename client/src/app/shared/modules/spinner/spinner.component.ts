import { Component, HostBinding } from '@angular/core';
import { SpinnerService } from '../../modules/spinner/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  showSpinner: boolean;

  @HostBinding('class.spinner__hidden') isHidden;

  constructor(private service: SpinnerService) {
    this.isHidden = true;
    this.showSpinner = true;
    this.service.isLoading$.subscribe((data) => {
      this.showSpinner = data;
      this.isHidden = !data;
    });
  }
}
