import Api from '@/services/api';

export default {
  async postFavorite(params) {
    const data = await Api().post('/v1/favorite/', params);
    return data;
  },
  async getFavorites(id) {
    const data = await Api().get(`/v1/favorite/?customuser_id=${id}`);
    return data;
  },
  async deleteFavorite(param) {
    const data = await Api().delete(`/v1/favorite/${param.id}/?customuser_id=${param.customuser}`);
    return data;
  },
};
