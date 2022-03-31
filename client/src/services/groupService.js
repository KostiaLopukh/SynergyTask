import {axiosService} from "./axiosService";

export const groupService = {
    getAll: () => axiosService.get('/groups'),
    update: (id, name, description) => axiosService.patch(`/groups/${id}`, {name, description}),
    deleteById: (id) => axiosService.delete(`/groups/${id}`),
    create: (name, description) => axiosService.post(`/groups`, {name, description}),
}
