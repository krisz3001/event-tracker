import { Component } from '@angular/core';
import { EventsService } from '../events.service';
import { FormGroup, FormControl } from '@angular/forms';
import { EventItem } from 'src/interfaces/event.interface';
import { v4 } from 'uuid';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  formGroup!: FormGroup;
  invalid: boolean = false;
  constructor(private readonly eventsService: EventsService){
    this.setForm();
  }
  validate():void{
    this.invalid = this.formGroup.value.date == '';
  }
  setForm():void{
    this.formGroup = new FormGroup(
      {
        name: new FormControl(''),
        date: new FormControl('')
      }
    );
  }
  addEvent():void{
    const item:EventItem = {
      id: v4(),
      ...this.formGroup.value
    }
    if(item.date.toString() == ''){
      this.invalid = true;
      return;
    }
    this.invalid = false;
    if(item.name == '') item.name = "Event";
    this.eventsService.postEvent(item).subscribe(()=>{
      this.eventsService.sendUpdate();
      this.formGroup.reset();
      this.setForm();
    });
  }
}
