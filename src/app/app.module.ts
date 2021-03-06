import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NetworkingareaService } from './networkingarea.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { from } from 'rxjs';

import { HomeScreenComponent } from './home-screen/home-screen.component';
import { FormsModule } from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AddMultipleChoiceQuestionsComponent } from './add-multiple-choice-questions/add-multiple-choice-questions.component';
import { ShowQuestionSetComponent } from './show-question-set/show-question-set.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ManageMainSubMenuComponent } from './manage-main-sub-menu/manage-main-sub-menu.component';
import { ManageSubmenuComponent } from './manage-submenu/manage-submenu.component';
import { MockTestPanelComponent } from './mock-test-panel/mock-test-panel.component';
import { EnewsNoticebrdDlyntesComponent } from './enews-noticebrd-dlyntes/enews-noticebrd-dlyntes.component';
import { ModalEditItemComponent } from './modal-edit-item/modal-edit-item.component';
import {MatDialogModule, MatFormFieldModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeScreenComponent,
    MainMenuComponent,
    AddMultipleChoiceQuestionsComponent,
    ShowQuestionSetComponent,
    ManageMainSubMenuComponent,
    ManageSubmenuComponent,
    MockTestPanelComponent,
    EnewsNoticebrdDlyntesComponent,
    ModalEditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule,MatFormFieldModule
  ],
  exports:[
    MatFormFieldModule
  ],
  entryComponents:[ModalEditItemComponent],
  providers: [NetworkingareaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
