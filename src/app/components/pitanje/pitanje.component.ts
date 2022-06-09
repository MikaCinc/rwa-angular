import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { loadPitanja, selectPitanje } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';

export interface PitanjeValidacija extends Pitanje {
  guess: boolean;
}

@Component({
  selector: 'app-pitanje',
  templateUrl: './pitanje.component.html',
  styleUrls: ['./pitanje.component.css']
})
export class PitanjeComponent implements OnInit {
  @Input() pitanje: Pitanje | null = null;
  // @Output() onClick: EventEmitter<Pitanje> = new EventEmitter<Pitanje>();
  @Output() submit: EventEmitter<PitanjeValidacija> = new EventEmitter<PitanjeValidacija>();
  // pitanje$: Observable<Pitanje> = of();

  constructor(private store: Store<AppState>) { }

  title = 'Pitanje';

  ngOnInit(): void {
    /* this.store.dispatch(loadPitanja());
    this.pitanja$ = this.store.select(selectPitanjesList); */
  }

  validacija(guess: boolean) {
    if (!this.pitanje) return;
    const objToSend = {
      ...this.pitanje,
      guess
    }
    this.submit.emit(objToSend);
  }

  /* selectPitanje(pitanje: Pitanje) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  } */
}
