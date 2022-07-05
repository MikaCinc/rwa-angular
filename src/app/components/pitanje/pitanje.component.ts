import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, of, take } from 'rxjs';
import { Kategorija } from 'src/app/models/kategorija';
import { User } from 'src/app/models/user';
import { selectKategorija } from 'src/app/store/kategorije.action';
import { selectKategorijasList, selectSelectedKategorijaId } from 'src/app/store/kategorije.selector';
import { selectUser } from 'src/app/store/user.selector';
import { AppState } from '../../app.state';
import { Pitanje } from '../../models/pitanje';
import { deletePitanje, loadPitanja, loadPitanjaByCategory, selectPitanje } from '../../store/pitanje.action';
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

  constructor(private router: Router, private store: Store<AppState>, public dialog: MatDialog) { }

  title = 'Pitanje';
  datumKreiranja = "";

  ngOnInit(): void {
    /* this.store.dispatch(loadPitanja());
    this.pitanja$ = this.store.select(selectPitanjesList); */
    this.kategorije$ = this.store.select(selectKategorijasList).pipe(
      map(all => all.filter(single => this.pitanje?.categories.includes(single.id)))
    );
    this.selectedKategorijaId$ = this.store.select(selectSelectedKategorijaId);

    this.datumKreiranja = new Date(this.pitanje?.dateCreated || "").toLocaleString();

    this.user$ = this.store.select(selectUser);
  }

  validacija(guess: boolean) {
    if (!this.pitanje) return;
    const objToSend = {
      ...this.pitanje,
      guess
    }
    this.submit.emit(objToSend);
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

  /* selectPitanje(pitanje: Pitanje) {
    console.log("selectPitanje", pitanje);

    this.store.dispatch(
      selectPitanje({
        pitanjeId: pitanje.id,
      })
    );
  } */

  gotoEdit() {
    const pitanjeId = this.pitanje ? this.pitanje.id : null;
    this.router.navigate(['/pitanje-editor', { id: pitanjeId }]);
  }

  getToken(): string {
    let token;

    this.store.pipe(take(1)).subscribe(s => token = s.user.accessToken);

    return token || "";
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
}

@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'info-dialog.html',
})
export class InfoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InfoDialogData) { }
}