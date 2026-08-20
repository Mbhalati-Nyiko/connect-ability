import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MetricsPage } from './metrics.page';

describe('MetricsPage', () => {
  let component: MetricsPage;
  let fixture: ComponentFixture<MetricsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
