import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, map } from 'rxjs';
import { EventItem } from "../interfaces/event.interface";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly url = environment.url;
  private updater = new Subject<any>();
  private total!: number ;
  constructor(private readonly httpClient: HttpClient) { }

  sendUpdate(){
    this.updater.next({});
  }
  getUpdate():Observable<any>{
    return this.updater.asObservable();
  }
  postEvent(e: EventItem):Observable<EventItem>{
    return this.httpClient.post<EventItem>(`${this.url}/events`, e)
  }

  getEvents(page: number, limit: number): Observable<EventItem[]>{
    return this.httpClient
      .get<EventItem[]>(`${this.url}/events?_page=${page}&_limit=${limit}`, {observe: 'response'})
      .pipe(map((res)=>{
        this.total = parseInt(res.headers.get('X-Total-Count')!);
        return res.body!.map((x)=>({
          id: x.id,
          name: x.name,
          date: new Date(x.date)
        }))
      }))
  }
  getTotal():number{
    return this.total;
  }
}
