import Api from './api';

export default {
  async postUser(params) {
    const data = await Api().post('/v1/user/', params);
    return data;
  },
};
