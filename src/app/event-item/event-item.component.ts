import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit{
  countdown!: string;
  interval: any;
  @Input()
  name!: string;

  @Input()
  date!: Date;

  setCountdown():void{
    let diff = this.date.getTime() - (new Date().getTime())
    if(diff<0){
      clearInterval(this.interval);
      this.countdown = "EXPIRED"
    }
    else{
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.countdown = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
    }
  }
  ngOnInit(): void {
    this.setCountdown();
      this.interval = setInterval(()=>{
        this.setCountdown();
      }, 1000)
  }
}
