import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventItem } from 'src/interfaces/event.interface';
import { EventsService } from '../events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnDestroy{
  limit: number = 5;
  eventsList!: EventItem[];
  selectPage!:number;
  pageCount!: number[];
  private updater: Subscription;
  constructor(
    private readonly eventsService: EventsService
  ){
    this.updater = eventsService.getUpdate().subscribe(()=>{
      this.setPage(this.selectPage);
    });
  }

  setPage(n:number):void{
    this.eventsService.getEvents(n, this.limit).subscribe((value) =>{
      this.selectPage = n;
      this.eventsList = value;
      this.pageCount = Array(Math.round(Math.ceil(this.eventsService.getTotal() / this.limit))).fill(0).map((_,i)=> i+1);
    })
  }

  ngOnInit(): void {
      this.setPage(1);
  }
  ngOnDestroy(): void {
    this.updater.unsubscribe();
  }
}
