import { expect } from 'chai';
import mongoose, { Types } from 'mongoose';
import { DataAccessObject, MongoID, Patient } from '../src/types';
import { config } from '../src/config';
import { PatientDao } from '../src/dao';
import { patient } from './mockData';

describe('Patient Data Access Object', () => {
  const { mongoUri } = config;
  let patientDao: DataAccessObject<Patient>;
  let sample: Patient & { _id: MongoID };

  before(async () => {
    await mongoose.connect(mongoUri as string);
  });

  beforeEach(() => {
    patientDao = new PatientDao();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should have a `patient` property', () => {
    expect(patientDao).to.have.property('patient');
  });
  it('should have a `logger` property', () => {
    expect(patientDao).to.have.property('logger');
  });

  describe('create method', () => {
    it('should create a new patient', async () => {
      const data = await patientDao.create(patient);
      if (data) sample = data;
      expect(data).to.be.an('object');
      expect(data).to.have.property('_id');
    });
  });

  describe('get method', () => {
    it('should get a patient', async () => {
      const data = await patientDao.get({ _id: sample._id });
      expect(data).to.be.an('object');
    });
    it('should return null if the patient does not exist', async () => {
      const data = await patientDao.get({ _id: new Types.ObjectId() });
      expect(data).to.be.null;
    });
  });

  describe('update method', () => {
    it('should update a patient', async () => {
      const { _id } = sample;
      const data = await patientDao.update(_id as string, {
        email: 'test@test.com'
      });
      expect(data).to.be.an('object');
    });
    it('should return null if the patient does not exist', async () => {
      const id = new Types.ObjectId().toHexString();
      const data = await patientDao.update(id, patient);
      expect(data).to.be.null;
    });
  });

  describe('getPatients method', () => {
    it('should get all patients', async () => {
      const data = await patientDao.getAll(10);
      expect(data).to.be.an('array');
      expect(data?.length).to.be.greaterThanOrEqual(1);
    });
  });

  describe('delete method', () => {
    it('should delete a patient', async () => {
      const { patientId } = sample;
      const data = await patientDao.delete(patientId as string);
      expect(data).to.be.an('object');
    });
    it('should return null if the patient does not exist', async () => {
      const data = await patientDao.delete('sample-id');
      expect(data).to.be.null;
    });
  });
});
