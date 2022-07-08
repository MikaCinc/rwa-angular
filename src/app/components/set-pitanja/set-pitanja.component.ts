import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, filter, map, switchMap, concatMap, take, delay, mergeMap, delayWhen, timer, Subscription } from 'rxjs';
import { QuestionTypeEnum, SpecialCategoryValuesEnum } from 'src/app/enums';
import { selectKategorija } from 'src/app/store/kategorije.action';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { loadFeaturedPitanja, loadPitanja, selectPitanje } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';
import { PitanjeValidacija } from '../pitanje/pitanje.component';

@Component({
  selector: 'app-set-pitanja',
  templateUrl: './set-pitanja.component.html',
  styleUrls: ['./set-pitanja.component.css']
})
export class SetPitanjaComponent implements OnInit {

  pitanja$: Observable<Pitanje[]> = of([]);
  pitanjaCurrent: Pitanje[] = [];
  pitanjaSubscription$: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) { }

  isCyclingQuestions: boolean = true;
  isFocusMode: boolean = false;
  currentQuestionsType: QuestionTypeEnum | "ALL" = "ALL";

  ngOnInit(): void {
    this.store.dispatch(loadFeaturedPitanja());
    this.store.dispatch(selectKategorija({ kategorijaId: SpecialCategoryValuesEnum.FEATURED }));
    this.pitanja$ = this.store.select(selectPitanjesList)
      .pipe(delay(200));
    this.pitanjaSubscription$ = this.pitanja$.subscribe(pitanja => {
      this.pitanjaCurrent = pitanja;
      this.currentQuestionsType = "ALL";
    });
  }

  ngOnDestroy() {
    this.pitanjaSubscription$.unsubscribe();
  }

  get typeOfQuestions(): typeof QuestionTypeEnum {
    return QuestionTypeEnum;
  }

  getCurrentGlobalQuestions(): Pitanje[] {
    let questions: Pitanje[] = [];
    this.store.select(selectPitanjesList)
      .pipe(take(1))
      .subscribe(globalQuestions => questions = globalQuestions);
    return questions;
  }

  submitAnswer(ePitanje: PitanjeValidacija) {
    console.log("submitAnswer", ePitanje);

    let isCorrect = false;
    switch (ePitanje.type) {
      case QuestionTypeEnum.BOOL: isCorrect = ePitanje.guess === ePitanje.isCorrect; break;
      case QuestionTypeEnum.TEXT: isCorrect = ePitanje.guess === ePitanje.answer; break;
      default: isCorrect = false;
    }
    const message = isCorrect ? 'TAČNO!' : 'NETAČNO!';

    this._snackBar.open(message, "Zatvori", {
      duration: 3000,
      panelClass: [`snack-${isCorrect ? "success" : "error"}`]
    });

    if (this.isCyclingQuestions) {
      this.pitanjaCurrent = [...this.pitanjaCurrent.filter(p => p.id !== ePitanje.id), ePitanje];
    } else {
      this.pitanjaCurrent = this.pitanjaCurrent.filter(p => p.id !== ePitanje.id);
    }
    /* this.pitanja$ =
      this.pitanja$.pipe(map(pitanja => {
        if (this.isCyclingQuestions) {
          return [...pitanja.filter(p => p.id !== ePitanje.id), ePitanje]
        } else {
          return [...pitanja.filter(p => p.id !== ePitanje.id)]
        }
      })); */
    /* this.pitanja$ =
      this.pitanja$.pipe(switchMap(pitanja => {
        console.log("switchMap", pitanja);

        if (!pitanja.length) return this.store.select(selectPitanjesList);
        if (this.isCyclingQuestions) {
          return of([...pitanja.filter(p => p.id !== ePitanje.id), ePitanje]);
        } else {
          return of([...pitanja.filter(p => p.id !== ePitanje.id)]);
        }
      })); */
  }

  selectPitanje(pitanje: Pitanje, answer: boolean) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  }

  handleFilterByType(type: QuestionTypeEnum | "ALL") {
    this.currentQuestionsType = type;

    switch (type) {
      case "ALL": this.pitanjaCurrent = this.getCurrentGlobalQuestions(); break;
      case QuestionTypeEnum.BOOL: this.pitanjaCurrent = this.getCurrentGlobalQuestions().filter(p => p.type === QuestionTypeEnum.BOOL); break;
      case QuestionTypeEnum.TEXT: this.pitanjaCurrent = this.getCurrentGlobalQuestions().filter(p => p.type === QuestionTypeEnum.TEXT); break;
    }
  }
}
