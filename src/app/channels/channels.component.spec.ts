import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelsComponent } from './channels.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ChannelsComponent', () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsComponent ],
      imports: [ HttpClientTestingModule ] // Add HttpClientTestingModule to imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
