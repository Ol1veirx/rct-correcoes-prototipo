import { Component } from '@angular/core';
import { ViewPdfComponent } from '../../components/view-pdf/view-pdf.component';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [ViewPdfComponent],
  templateUrl: './visualization.component.html',
  styleUrl: './visualization.component.css'
})
export class VisualizationComponent {

}
