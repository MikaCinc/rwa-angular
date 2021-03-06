import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of, Subscriber, Subscription, take } from 'rxjs';
import { QuestionTypeEnum } from 'src/app/enums';
import { Kategorija } from 'src/app/models/kategorija';
import { User } from 'src/app/models/user';
import { selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorijaId } from 'src/app/store/kategorije.selector';
import { selectUser, selectUserFavouritesIDs } from 'src/app/store/user.selector';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { deletePitanje, loadPitanja, loadPitanjaByCategory, selectPitanje, toggleFavourite, toggleFeatured } from '../../store/pitanje.action';
import { selectPitanjesList } from '../../store/pitanje.selector';

export interface PitanjeValidacija extends Pitanje {
  guess: boolean | string;
}

@Component({
  selector: 'app-pitanje',
  templateUrl: './pitanje.component.html',
  styleUrls: ['./pitanje.component.scss']
})
export class PitanjeComponent implements OnInit {
  @ViewChild('menuTrigger')
  menuTrigger!: MatMenuTrigger;
  @Input() pitanje: Pitanje | null = null;
  @Input() isFocusMode: boolean = false;
  // @Output() onClick: EventEmitter<Pitanje> = new EventEmitter<Pitanje>();
  @Output() submit: EventEmitter<PitanjeValidacija> = new EventEmitter<PitanjeValidacija>();
  // pitanje$: Observable<Pitanje> = of();

  selectedKategorijaId$: Observable<number> = of(0);
  kategorije$: Observable<Kategorija[]> = of([]);
  user$: Observable<User | null> = of(null);
  isFavouriteSubscription$: Subscription = new Subscription();

  constructor(private router: Router, private store: Store<AppState>, public dialog: MatDialog) { }

  title = 'Pitanje';
  datumKreiranja = "";
  userAnswer = "";
  showAnswer = false;
  isFavourite = false;

  ngOnInit(): void {
    this.kategorije$ = this.store.select(selectKategorijasList).pipe(
      map(all => all.filter(single => this.pitanje?.categories.includes(single.id)))
    );
    this.selectedKategorijaId$ = this.store.select(selectSelectedKategorijaId);
    this.isFavouriteSubscription$ = this.store
      .select(selectUserFavouritesIDs)
      .subscribe(ids => this.isFavourite = !!(this.pitanje?.id && ids?.includes(this.pitanje?.id)));

    this.datumKreiranja = new Date(this.pitanje?.dateCreated || "").toLocaleString();

    this.user$ = this.store.select(selectUser);
  }

  ngOnDestroy(): void {
    this.isFavouriteSubscription$.unsubscribe();
  }

  public get typeOfQuestion(): typeof QuestionTypeEnum {
    return QuestionTypeEnum;
  }

  validacija(guess: boolean | string) {
    if (!this.pitanje) return;
    const objToSend: PitanjeValidacija = {
      ...this.pitanje,
      guess
    }
    this.submit.emit(objToSend);
  }

  handleShowAnswer() {
    this.showAnswer = !this.showAnswer;
    this.userAnswer = this.showAnswer ? this.pitanje?.answer || "" : "";
  }

  promenaKategorija(kat: Kategorija) {
    console.log("promenaKategorija in pitanje component", kat);
    /* this.selectedKategorijaId$ = of(kat.id); */
    this.store.dispatch(
      selectKategorija({
        kategorijaId: kat.id,
      })
    );

    this.store.dispatch(loadPitanjaByCategory({
      categoryId: kat.id,
    }));
  }

  gotoEdit() {
    const pitanjeId = this.pitanje ? this.pitanje.id : null;
    this.router.navigate(['/pitanje-editor', { id: pitanjeId }]);
  }

  getToken(): string {
    let token;

    this.store.pipe(take(1)).subscribe(s => token = s.user.accessToken);

    return token || "";
  }

  toggleFeatured() {
    if (!this.pitanje) return;

    this.store.dispatch(
      toggleFeatured({ id: this.pitanje?.id, token: this.getToken() })
    );
  }

  toggleFavourite() {
    if (!this.pitanje) return;

    this.store.dispatch(
      toggleFavourite({ id: this.pitanje?.id, token: this.getToken() })
    );
  }

  handleDelete() {
    if (!this.pitanje) return;

    this.store.dispatch(deletePitanje({ id: this.pitanje.id, token: this.getToken() }));
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialog, {
      restoreFocus: false,
      data: {
        dateCreated: new Date(this.pitanje?.dateCreated || "").toLocaleString(),
        dateUpdated: new Date(this.pitanje?.dateUpdated || "").toLocaleString(),
        type: this.pitanje?.type,
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}

export interface InfoDialogData {
  dateCreated: string;
  dateUpdated: string;
  type: QuestionTypeEnum;
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData) { }

  public get typeOfQuestion(): string {
    switch (this.data.type) {
      case QuestionTypeEnum.TEXT: return "Tekstualno pitanje";
      case QuestionTypeEnum.BOOL: return "Ta??no/Neta??no pitanje";
      default: return "";
    }
  }
}