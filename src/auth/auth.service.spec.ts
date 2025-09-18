import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const mockUser = {
  id: '1',
  email: 'test@gmail.com',
  name: 'test',
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('fake-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user', () => {
    const result = service.validateUser('1');
    expect(result).toEqual(mockUser);
  });

  it('should return jwt token on login', () => {
    const token = service.login();
    expect(token).toEqual({ access_token: 'fake-jwt-token' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      email: mockUser.email,
      sub: mockUser.id,
    });
  });
});
