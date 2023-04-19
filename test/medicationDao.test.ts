import { expect } from 'chai';
import mongoose, { Types } from 'mongoose';
import { MedicalDataAccessObject, Medication, MongoID } from '../src/types';
import { config } from '../src/config';
import { MedicationDao } from '../src/dao';
import { medication } from './mockData';

describe('Medication Data Access Object', () => {
  const { mongoUri } = config;
  let medicationDao: MedicalDataAccessObject<Medication>;
  let sample: Medication & { _id: MongoID };

  before(async () => {
    await mongoose.connect(mongoUri as string);
  });

  beforeEach(() => {
    medicationDao = new MedicationDao();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should have a `medication` property', () => {
    expect(medicationDao).to.have.property('medication');
  });
  it('should have a `logger` property', () => {
    expect(medicationDao).to.have.property('logger');
  });

  describe('create method', () => {
    it('should create a new medication', async () => {
      const data = await medicationDao.create(medication);
      if (data) sample = data;
      expect(data).to.be.an('object');
      expect(data).to.have.property('_id');
    });
  });

  describe('update method', () => {
    it('should update a medication', async () => {
      const { _id } = sample;
      const data = await medicationDao.update(_id as string, { dosage: '5mg' });
      expect(data).to.be.an('object');
    });
    it('should return null if the medication does not exist', async () => {
      const id = new Types.ObjectId().toHexString();
      const data = await medicationDao.update(id, { dosage: '5mg' });
      expect(data).to.be.null;
    });
  });

  describe('getAll method', () => {
    it('should return all medications', async () => {
      const { patientId } = sample;
      const data = await medicationDao.getAll(patientId as string, 10);
      expect(data).to.be.an('array');
      expect(data?.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('delete method', () => {
    it('should delete a medication', async () => {
      const { _id } = sample;
      const data = await medicationDao.delete(_id as string);
      expect(data).to.be.an('object');
    });
    it('should return null if the medication does not exist', async () => {
      const id = new Types.ObjectId().toHexString();
      const data = await medicationDao.delete(id);
      expect(data).to.be.null;
    });
  });
});
