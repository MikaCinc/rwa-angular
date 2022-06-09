import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, filter, map } from 'rxjs';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { loadPitanja, selectPitanje } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';
import { PitanjeValidacija } from '../pitanje/pitanje.component';

@Component({
  selector: 'app-set-pitanja',
  templateUrl: './set-pitanja.component.html',
  styleUrls: ['./set-pitanja.component.css']
})
export class SetPitanjaComponent implements OnInit {

  pitanja$: Observable<Pitanje[]> = of([]);

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  title = 'Set pitanja';

  ngOnInit(): void {
    this.store.dispatch(loadPitanja());
    this.pitanja$ = this.store.select(selectPitanjesList);
  }

  submitAnswer(ePitanje: PitanjeValidacija) {
    console.log("submitAnswer", ePitanje);

    const isCorrect = ePitanje.isCorrect === ePitanje.guess;
    const message = isCorrect ? 'TAČNO!' : 'NETAČNO!';

    this._snackBar.open(message, "Zatvori", {
      duration: 3000,
      panelClass: [`snack-${isCorrect ? "success" : "error"}`]
    });

    this.pitanja$ =
      this.pitanja$.pipe(map(pitanja => pitanja.filter(p => p.id !== ePitanje.id)));
  }

  selectPitanje(pitanje: Pitanje, answer: boolean) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  }
}
