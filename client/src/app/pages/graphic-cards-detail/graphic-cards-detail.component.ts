import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { Store } from '@ngrx/store';
import { GraphicCardsActions } from '@store/actions/graphic-cards.actions';
import { selectCards } from '@store/selectors/graphic-cards.selectors';
import { Observable, tap, map, delay } from 'rxjs';

@Component({
  selector: 'app-graphic-cards-detail',
  templateUrl: './graphic-cards-detail.component.html',
  styleUrls: ['./graphic-cards-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicCardsDetailComponent implements OnInit {
  id!: number;
  card$!: Observable<IGraphicCardItem>;

  @ViewChild('bigpicture') bigpicture!: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(GraphicCardsActions.loadGraphicCards());
    this.card$ = this.store.select(selectCards).pipe(
      map((items) => items.filter((item) => item.id === parseInt(id))[0]),
      tap((item) => {
        if (!item) {
          this.router.navigate(['/page404']);
        }
      })
    );
    this.store.dispatch(GraphicCardsActions.loadGraphicCards());
  }

  setActiveImage($event: Event, thumb: string): boolean {
    this.bigpicture.nativeElement.src = thumb;
    return false;
  }
}
