import { expect } from 'chai';
import mongoose, { Types } from 'mongoose';
import { MedicalDataAccessObject, MedicalHistory, MongoID } from '../src/types';
import { config } from '../src/config';
import { MedicalHistoryDao } from '../src/dao';
import { medicalHistory } from './mockData';

describe('Medical History Data Access Object', () => {
  const { mongoUri } = config;
  let medicalHistoryDao: MedicalDataAccessObject<MedicalHistory>;
  let sample: MedicalHistory & { _id: MongoID };

  before(async () => {
    await mongoose.connect(mongoUri as string);
  });

  beforeEach(() => {
    medicalHistoryDao = new MedicalHistoryDao();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should have a `medicalHistory` property', () => {
    expect(medicalHistoryDao).to.have.property('medicalHistory');
  });
  it('should have a `logger` property', () => {
    expect(medicalHistoryDao).to.have.property('logger');
  });

  describe('create method', () => {
    it('should create a new medicalHistory', async () => {
      const data = await medicalHistoryDao.create(medicalHistory);
      if (data) sample = data;
      expect(data).to.be.an('object');
      expect(data).to.have.property('_id');
    });
  });

  describe('update method', () => {
    it('should update a medicalHistory', async () => {
      const { _id } = sample;
      const data = await medicalHistoryDao.update(_id as string, {
        condition: 'Flu'
      });
      expect(data).to.be.an('object');
    });
    it('should return null if the medicalHistory does not exist', async () => {
      const id = new Types.ObjectId().toHexString();
      const data = await medicalHistoryDao.update(id, { condition: 'Flu' });
      expect(data).to.be.null;
    });
  });

  describe('getAll method', () => {
    it('should return all medicalHistory', async () => {
      const { patientId } = sample;
      const data = await medicalHistoryDao.getAll(patientId as string, 10);
      expect(data).to.be.an('array');
      expect(data?.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('delete method', () => {
    it('should delete a medicalHistory', async () => {
      const { _id } = sample;
      const data = await medicalHistoryDao.delete(_id as string);
      expect(data).to.be.an('object');
    });
    it('should return null if the medicalHistory does not exist', async () => {
      const id = new Types.ObjectId().toHexString();
      const data = await medicalHistoryDao.delete(id);
      expect(data).to.be.null;
    });
  });
});
