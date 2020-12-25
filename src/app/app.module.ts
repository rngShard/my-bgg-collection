import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Http202Dialog, TableBoardgameListComponent } from './table-boardgame-list/table-boardgame-list.component';
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
import { BoardgameDetailsCardComponent } from './table-boardgame-list/boardgame-details-card/boardgame-details-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ArchiveTableComponent } from './table-boardgame-list/archive-table/archive-table.component';
import { PreorderedTableComponent } from './table-boardgame-list/preordered-table/preordered-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { BoardgameSimpleCardComponent } from './table-boardgame-list/boardgame-simple-card/boardgame-simple-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PrevownedListComponent } from './table-boardgame-list/prevowned-list/prevowned-list.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    TableBoardgameListComponent,
    Http202Dialog,
    HeaderToolbarComponent,
    FooterComponent,
    BoardgameDetailsCardComponent,
    ArchiveTableComponent,
    PreorderedTableComponent,
    BoardgameSimpleCardComponent,
    PrevownedListComponent,
    WishlistComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
