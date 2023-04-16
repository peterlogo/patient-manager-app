import { expect } from 'chai';
import { config } from '../src/config';

describe('Server config object', () => {
  it('should have a port property', () => {
    expect(config).to.have.property('port').that.is.a('number');
  });
  it('should have a mongoUri property', () => {
    expect(config).to.have.property('mongoUri').that.is.a('string');
  });
  it('should have a jwtSecret property', () => {
    expect(config).to.have.property('jwtSecret').that.is.a('string');
  });
  it('should have a jwtRefreshSecret property', () => {
    expect(config).to.have.property('jwtRefreshSecret').that.is.a('string');
  });
  it('should have a nodeEnv property', () => {
    expect(config).to.have.property('nodeEnv').that.is.a('string');
  });
});
