import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login a user', () => {
    const dummyUser = {
      id: '12345',
      username: 'test',
      password: 'test123',
      email: 'test@example.com',
      roles: ['user'], // assuming roles is an array of strings
      groups: [] // assuming groups is an array, adjust as per your model
    };
    const dummyResponse = {
      message: 'User logged in successfully',
      user: dummyUser
    };

    service.login(dummyUser.username, dummyUser.password).subscribe(response => {
      if (response) {  // Add this null check
        expect(response.user).toEqual(dummyUser);
        expect(response.message).toEqual('User logged in successfully');
      }
    });
    

    const req = httpMock.expectOne(`http://localhost:3000/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
});
