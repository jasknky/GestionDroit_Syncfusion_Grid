import { Component, OnInit } from '@angular/core';
import { BeforeBatchSaveArgs, CommandClickEventArgs, CommandModel, EditSettingsModel, PageEventArgs, PageSettingsModel, ToolbarItems, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { ApplicationModel } from '../models/application.model';
import { ApplicationService } from '../services/application.service';
import { applications } from './applications';
import {  GridComponent, Column, IRow } from '@syncfusion/ej2-angular-grids';
import { closest } from '@syncfusion/ej2-base';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  public data: ApplicationModel[] = [];

  public commands: CommandModel[] = [ { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
                                      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }
                                    ];
  

  public pageSettings!: PageSettingsModel;

  public editSettings: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true }; 
  public toolbar: ToolbarItems[]  = ['Add','Cancel'];


  // public updateGrid(res:ApplicationModel[]) {
  //   this.data = res;
  // }

  //application: ApplicationModel;

  constructor(
    //private route: ActivatedRoute,
    private applicationService: ApplicationService,
    //private router: Router
  ) {}

  

    ngOnInit(): void {
        this.applicationService.getAllApplications().subscribe(
          list => 
          this.data = list
          );
          //const applicationId = +this.route.snapshot.paramMap.get("id");
        //this.data = applications;
        this.pageSettings = { pageSize: 6 };
        this.editSettings = { showDeleteConfirmDialog: true, allowEditing: true, allowAdding: true, allowDeleting: true };
        this.toolbar = ['Add','Cancel'];
        this.commands = [ { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
                          { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } }
                        ];
    }

    // batchSave(e: BeforeBatchSaveArgs) { 
    //  const update$ = this.applicationService.updateApplication(e.batchChanges['changedRecords'][0]);
    // }


    public actionBegin(args: SaveEventArgs) {
      console.log(args);
      // if(args.requestType ==='save'){
      //   alert('SAVE');
      //   const application :any = args.data;
      //   const update$= this.applicationService.update(application.APPLI_ID,application);
      // }
      if(args.requestType ==='save'){
          if(args.action ==='add')
          {
            const application :any = args.data;
            this.applicationService.addApplication(application).subscribe((p) => {
              console.log('Create application OK', p);
            })
            //const add$ = this.applicationService.addApplication(application );
          }
          if(args.action ==='edit')
          {
            const application :any = args.data;
            this.applicationService.update(application.APPLI_ID,application).subscribe((p) => {
              console.log('UPDATE application OK', p);
            })
            //const update$= this.applicationService.update(application.APPLI_ID,application);
          }
        // const application :any = args.data;
        // const update$= this.applicationService.update(application.APPLI_ID,application);
      }
    }

    commandClick(args: CommandClickEventArgs): void {
      // const test =  args.rowData['APPLI_ID'];
      // alert(test);
      //alert(JSON.stringify(args.rowData));
      console.log(args);
     console.log(args.commandColumn.type);
     if(args.commandColumn.type=='Delete')
     {
      this.applicationService.deleteApplication(args.rowData['APPLI_ID']).subscribe(() => {
        console.log("delete ok");
      });
     }
    //  else if(args.commandColumn.type=='Edit')
    //  {
    //    console.log('UPDATE !!');
    //   const update$ = this.applicationService.updateApplication(args.rowData);
    //  }
      
  }

}
