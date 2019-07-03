import Api from './api';

export default {
  async postFavorite(params) {
    const response = await Api().post('/v1/favorite/', params);
    return response;
  },
  async getFavorites(id) {
    const response = await Api().get(`/v1/favorite/?customuser_id=${id}`);
    return response;
  },
  async deleteFavorite(param) {
    const response = await Api().delete(
      `/v1/favorite/${param.id}/?customuser_id=${param.customuser}`,
    );
    return response;
  },
  async editFavorite(data) {
    const response = await Api().put(`/v1/favorite/${data.id}/?customuser_id=${data.customuser}`, data);
    return response;
  },
};
