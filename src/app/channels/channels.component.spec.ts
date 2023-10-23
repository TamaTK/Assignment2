import { TestBed, async } from '@angular/core/testing';
import { ChannelsComponent } from './channels.component';
import { ChannelService } from '../services/channel.service';


describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let channelService: ChannelService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelsComponent],
      providers: [ChannelService, /* other services */],
      // ... other configurations ...
    }).compileComponents();

    component = TestBed.createComponent(ChannelsComponent).componentInstance;
    channelService = TestBed.inject(ChannelService);
  }));

  it('should create a channel', () => {
    const channelName = 'Test Channel';
    component.channelName = channelName;
    spyOn(channelService, 'createChannel').and.callThrough();

    component.createChannel();

    expect(channelService.createChannel).toHaveBeenCalled();
  });
});
