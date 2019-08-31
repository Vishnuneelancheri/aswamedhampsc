import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { Route } from '@angular/compiler/src/core';
import { LoginComponent } from '../login/login.component';
import { HomeScreenComponent} from '../home-screen/home-screen.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { ManageSubmenuComponent } from '../manage-submenu/manage-submenu.component'
import { ShowQuestionSetComponent } from '../show-question-set/show-question-set.component';
import { MockTestPanelComponent } from '../mock-test-panel/mock-test-panel.component'
import { AddMultipleChoiceQuestionsComponent } from '../add-multiple-choice-questions/add-multiple-choice-questions.component'
import { EnewsNoticebrdDlyntesComponent } from '../enews-noticebrd-dlyntes/enews-noticebrd-dlyntes.component'
import { from } from 'rxjs';
import { ManageMainSubMenuComponent } from '../manage-main-sub-menu/manage-main-sub-menu.component';
const routes:Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeScreenComponent,data:{"somedata":"some-value"},
    children:[ {path:'', component:MainMenuComponent},
                {path:'show_question_set', component:ShowQuestionSetComponent},
                { path:'addmlplechceqtncompnt', component:AddMultipleChoiceQuestionsComponent, data:
                  {relationId:'', question:''} },
                {path:'manage_main_sub_menu', component:ManageMainSubMenuComponent},
                {path:'add_menu_1', component:ManageSubmenuComponent},
                {path:'mock_test_panel', component:MockTestPanelComponent},
                {path:'enews_ntce_dlynt', component:EnewsNoticebrdDlyntesComponent}
                ] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
