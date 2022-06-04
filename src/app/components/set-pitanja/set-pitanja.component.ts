import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { loadPitanja, selectPitanje } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';

@Component({
  selector: 'app-set-pitanja',
  templateUrl: './set-pitanja.component.html',
  styleUrls: ['./set-pitanja.component.css']
})
export class SetPitanjaComponent implements OnInit {

  pitanja$: Observable<Pitanje[]> = of([]);

  constructor(private store: Store<AppState>) { }

  title = 'Set pitanja';

  ngOnInit(): void {
    this.store.dispatch(loadPitanja());
    this.pitanja$ = this.store.select(selectPitanjesList);
  }

  selectPitanje(pitanje: Pitanje) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  }
}
