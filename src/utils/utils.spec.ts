import { truncateDB } from '../../spec/utils';
import Common from './common';

describe('Testing Utils!', function () {
  describe('Testing common Class', function () {
    beforeEach(async () => {
      await truncateDB();
      await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'test@test.com',
        password: 'password123',
      });
    });
    // Success Scenarios.
    it('should insert the row', async function () {
      const response = await Common.dbInsert('users', {
        firstname: 'test',
        lastname: 'test',
        email: 'dev@test.com',
        password: 'password123',
      });

      const result = response ? response[0] : {};
      delete result.created_at;
      expect(result).toEqual({
        id: result.id,
        firstname: 'test',
        lastname: 'test',
        email: 'dev@test.com',
        password: 'password123',
      });
    });

    it('should fetch the row', async function () {
      const res = await Common.dbFetch('users', { email: 'test@test.com' }, ['firstname']);
      const result = res ? res[0] : {};
      expect(result).toEqual({ firstname: 'test' });
    });

    it('should fetch with complex condition', async function () {
      await Common.dbInsert('users', {
        firstname: 'dev1',
        lastname: 'test',
        email: 'dev1@test.com',
        password: 'password123',
      });
      await Common.dbInsert('users', {
        firstname: 'dev2',
        lastname: 'test',
        email: 'dev2@test.com',
        password: 'password123',
      });
      const res = await Common.dbFetch('users', { firstname: 'dev2', lastname: 'test' }, ['firstname', 'lastname']);
      const result = res ? res[0] : {};
      expect(result).toEqual({ firstname: 'dev2', lastname: 'test' });
    });

    it('should update the row', async function () {
      const res = await Common.dbUpdate('users', { email: 'test@test.com' }, { firstname: 'dev' });
      const result = res ? res[0] : {};
      expect(result.firstname).toEqual('dev');
    });

    it('should update with complex query', async function () {
      const res = await Common.dbUpdate(
        'users',
        { firstname: 'test', lastname: 'test' },
        { firstname: 'dev', lastname: 'thinkloud' },
      );
      const result = res ? res[0] : {};
      expect(result.firstname).toEqual('dev');
      expect(result.lastname).toEqual('thinkloud');
    });

    it('should delete the row', async function () {
      const res = await Common.dbDeletion('users', { email: 'test@test.com' });
      const noUser = await Common.dbFetch('users');
      expect(res).toBeTruthy();
      expect(noUser?.length).toBe(0);
    });

    it('should insert many objects at once', async function () {
      const res = await Common.dbInsertMany('users', [
        {
          firstname: 'test',
          lastname: 'test',
          email: 'test2@test.com',
          password: 'password123',
        },
        {
          firstname: 'test',
          lastname: 'test',
          email: 'test3@test.com',
          password: 'password123',
        },
      ]);
      console.log({ res });
      expect(res?.length).toBe(2);
    });
    // Failure Scenarios.
  });
});
