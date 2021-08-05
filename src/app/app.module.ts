import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Http202Dialog, BoardgameCollectionComponent } from './boardgame-collection/boardgame-collection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BoardgameDetailsDialogComponent } from './boardgame-collection/boardgame-details-dialog/boardgame-details-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ArchiveComponent } from './boardgame-collection/archive/archive.component';
import { GameListSimple } from './boardgame-collection/game-list-simple/game-list-simple.component';
import { MatDividerModule } from '@angular/material/divider';
import { BoardgameSimpleCardComponent } from './boardgame-collection/boardgame-simple-card/boardgame-simple-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CollectionComponent } from './boardgame-collection/collection/collection.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    BoardgameCollectionComponent,
    Http202Dialog,
    HeaderToolbarComponent,
    FooterComponent,
    BoardgameDetailsDialogComponent,
    ArchiveComponent,
    GameListSimple,
    BoardgameSimpleCardComponent,
    WishlistComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatChipsModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
