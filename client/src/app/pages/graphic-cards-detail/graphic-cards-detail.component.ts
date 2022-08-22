import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { GraphicCardsService } from '@core/services/graphic-cards.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-graphic-cards-detail',
  templateUrl: './graphic-cards-detail.component.html',
  styleUrls: ['./graphic-cards-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicCardsDetailComponent implements OnInit {
  id!: number;
  card$!: Observable<IGraphicCardItem>;
  isLastPage: boolean;

  @ViewChild('bigpicture') bigpicture!: ElementRef;

  constructor(private route: ActivatedRoute, private service: GraphicCardsService) {
    this.isLastPage = false;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.loadData();
    this.card$ = this.service.graphicCards$.pipe(
      map((items) => items.filter((item) => item.id.toString() === id)[0]),
      tap((item) => item)
    );
  }

  setActiveImage($event: Event, thumb: string): boolean {
    this.bigpicture.nativeElement.src = thumb;
    $event.stopPropagation();
    return false;
  }

  removeClassZoomed(): void {
    this.bigpicture.nativeElement.classList.remove('zoomed');
  }

  toggleClassZoomed($event: Event): void {
    this.bigpicture.nativeElement.parentNode.style.minHeight =
      this.bigpicture.nativeElement.parentNode.clientHeight + 'px';
    this.bigpicture.nativeElement.classList.toggle('zoomed');
    $event.stopPropagation();
  }
}
